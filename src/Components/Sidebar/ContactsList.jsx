import { connect } from 'react-redux';
import styled from 'styled-components';
import { Menu } from 'antd';
import AvatarName from '../AvatarName';
import { setActiveChat } from '../../redux/actions/chats';
import { setActiveContact } from '../../redux/actions/contacts';

const MenuItem = styled(Menu.Item)`
	height: 70px !important;
	& > span {
		// padding: 5px;
	}
`;

const ContactsList = ({
	contactsState,
	allChats,
	storeActiveChat,
	storeActiveContact,
	setActiveTab,
}) => {
	const { data: allContacts } = contactsState;

	if (contactsState.loading) {
		return <div>Loading...</div>;
	}

	const handleMenuClick = ({ key }) => {
		// console.log(key);
		if (key) {
			/*
            
                check if this contact has any existing conversation =>
                    Y => clear active contact, set active chat & switch to chats & open this conversation
                    N => make contact active & open empty convo in convo-view
            
            */
			if (key && allChats) {
				const chatIds = Object.keys(allChats);
				const isConvoExist = chatIds.length && chatIds.includes(key);
				if (isConvoExist) {
					storeActiveChat(key);
					setActiveTab('2');
				} else {
					storeActiveContact(key);
					storeActiveChat(key);
				}
			}
		}
	};

	return (
		<>
			{!contactsState.loading && allContacts?.length && (
				<Menu
					mode='inline'
					selectedKeys={[contactsState.activeContact]}
					onClick={handleMenuClick}
				>
					<MenuItem disabled key='disabled-key'>
						Search bar
					</MenuItem>
					{allContacts.map((contact) => (
						<MenuItem key={contact.mobile}>
							<AvatarName name={contact.name} avatar={contact.image} />
						</MenuItem>
					))}
				</Menu>
			)}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		contactsState: state.contacts,
		allChats: state.chats.data,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		storeActiveContact: (id) => dispatch(setActiveContact(id)),
		storeActiveChat: (id) => dispatch(setActiveChat(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);