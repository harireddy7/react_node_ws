import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import ConversationView from '../Components/ConversationUI/ConversationView';
import ImpulseSocket from '../Components/ImpulseSocket';
import { AuthContext } from '../Context/AuthContext';
import { fetchChats, setActiveChat } from '../redux/actions/chats';
import { fetchContacts } from '../redux/actions/contacts';
import { checkIfMobile } from '../utils';

const Conversation = ({ contactsState, chatsState, location, storeActiveChat, getChats, getContacts }) => {
    const screens = useBreakpoint();
    const isMobile = checkIfMobile(screens);
    const { activeChat } = chatsState;
    const { user: { _id: userId, mobile } = {} } = useContext(AuthContext);

    useEffect(() => {

		const { data: contacts } = contactsState;
		const { data: chats } = chatsState;

		if (
			!contactsState.loading &&
			!contactsState.error &&
			!Array.isArray(contacts)
		) {
			getContacts(userId);
		}
		if (
			!chatsState.loading &&
			!chatsState.error &&
			!chats
		) {
			getChats(mobile);
		}
    }, [])

    useEffect(() => {
        if (!activeChat && location.pathname.startsWith('/chat/')) {
            storeActiveChat(location.pathname.substring(6))
        }
    }, [])

    if (!isMobile) return null;

    return (
        <ImpulseSocket id={userId}>
            <ConversationView data-name="conversation" />
        </ImpulseSocket>
    )
}

const mapStateToProps = (state) => {
    // activeChat

    return {
        contactsState: state.contacts,
        chatsState: state.chats,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getContacts: (id) => dispatch(fetchContacts(id)),
		getChats: (id) => dispatch(fetchChats(id)),
        storeActiveChat: (id) => dispatch(setActiveChat(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
