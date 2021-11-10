import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Space } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Input from 'antd/lib/input/Input';
import AvatarName from '../AvatarName';
import { setActiveChat } from '../../redux/actions/chats';
import { setActiveContact } from '../../redux/actions/contacts';
import { checkIfMobile } from '../../utils';

const MenuItem = styled(Menu.Item)`
	height: 70px !important;
	& > span {
		// padding: 5px;
	}
	// & .ant-menu-item:hover:hover {
	// 	background: #e6f7ff !important;
	// }
`;

const ChatsList = ({
	chatsState,
	contactsState,
	storeActiveChat,
	storeActiveContact,
}) => {
	const { data: allChats } = chatsState;
	const { data: allContacts } = contactsState;
	const screens = useBreakpoint();
	const isMobile = checkIfMobile(screens);
	const history = useHistory()

	if (chatsState.loading) {
		return <div>Loading...</div>;
	}

	const handleMenuClick = ({ key }) => {
		// console.log(key);
		if (key && chatsState.activeChat !== key) {
			storeActiveContact(null);
			storeActiveChat(key);
		}
		if (key) {
			if (isMobile) {
				history.push(`/chat/${key}`);
			}
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
					{!isMobile && (
						<Space style={{ padding: '5px' }}>
							<Input placeholder='Search bar' />
						</Space>
					)}
					{Object.keys(allChats).map((receiver) => {
						const { name, image } =
							allContacts?.find((c) => c.mobile === receiver) || {};
						const { text } = allChats[receiver][allChats[receiver].length - 1];
						return (
							<MenuItem key={receiver}>
								<AvatarName
									name={name || receiver}
									avatar={image}
									description={text}
								/>
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
