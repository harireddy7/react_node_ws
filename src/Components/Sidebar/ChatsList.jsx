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

const ChatsList = ({ chatsState, contactsState, storeActiveChat, storeActiveContact }) => {
	const { data: allChats } = chatsState;
	const { data: allContacts } = contactsState;

	if (chatsState.loading) {
		return <div>Loading...</div>;
    }

    const handleMenuClick = ({ key }) => {
        // console.log(key);
		if (key && chatsState.activeChat !== key) {
            storeActiveContact(null);
			storeActiveChat(key);
		}
	};

	return (
		<>
			{!chatsState.loading && allChats && allContacts && (
				<Menu
					mode='inline'
					selectedKeys={[chatsState.activeChat]}
					onClick={handleMenuClick}
				>
					<MenuItem disabled key='disabled-key'>
						Search bar
					</MenuItem>
					{Object.keys(allChats).map((receiver) => {
						const { name, image } =
							allContacts?.find((c) => c.mobile === receiver) || {};
						return (
							<MenuItem key={receiver}>
								<AvatarName name={name || receiver} avatar={image} />
							</MenuItem>
						);
					})}
				</Menu>
			)}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		contactsState: state.contacts,
		chatsState: state.chats,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
        storeActiveChat: (id) => dispatch(setActiveChat(id)),
        storeActiveContact: (id) => dispatch(setActiveContact(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);
