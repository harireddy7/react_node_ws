import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Menu, Space } from 'antd';
import Input from 'antd/lib/input/Input';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import UserAddOutlined from '@ant-design/icons/UserAddOutlined';
import AvatarName from '../AvatarName';
import { setActiveChat } from '../../redux/actions/chats';
import { setActiveContact } from '../../redux/actions/contacts';
import { checkIfMobile } from '../../utils';
import ContactModal from './ContactModal';

const MenuItem = styled(Menu.Item)`
	height: 70px !important;
	& > span {
		// padding: 5px;
	}
`;

const SearchContainer = styled(Space)`
	width: 100%;
	padding: 5px 10px;
	& .ant-space-item:first-child {
		width: 100%;
	}
`

const ContactsList = ({
	contactsState,
	allChats,
	storeActiveChat,
	storeActiveContact,
	setActiveTab,
}) => {
	const [visible, setVisible] = useState(false);
	const { data: allContacts } = contactsState;

	const history = useHistory();
	const screens = useBreakpoint();
	const isMobile = checkIfMobile(screens);

	useEffect(() => {
		const sideEl = document.querySelector('.ant-layout-sider')
		if (sideEl) sideEl.style.pointerEvents = visible ? 'none' : 'all';
	}, [visible])

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
					storeActiveContact(null);
					storeActiveChat(key);
					if (isMobile) {
						history.push(`/chat/${key}`);
					} else {
						setActiveTab('2');
					}
				} else {
					storeActiveContact(key);
					storeActiveChat(key);
					if (isMobile) {
						history.push(`/chat/${key}`);
					}
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
					{/* {!isMobile && ( */}
						<SearchContainer>
							<Input placeholder='Search bar' />
							<Button shape="circle" icon={<UserAddOutlined />} onClick={() => setVisible(true)} />
						</SearchContainer>
					{/* )} */}
					{allContacts.map((contact) => (
						<MenuItem key={contact.mobile}>
							<AvatarName name={contact.name} avatar={contact.image} />
						</MenuItem>
					))}
				</Menu>
			)}
			{visible && <ContactModal visible={visible} setVisible={setVisible} />}
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
