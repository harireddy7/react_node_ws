import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Tabs } from 'antd';
import { Menu } from 'antd';
import AvatarName from '../AvatarName';
import { fetchChats, setActiveChat } from '../../redux/actions/chats';
import { fetchContacts } from '../../redux/actions/contacts';
import ChatsList from './ChatsList';
import ContactsList from './ContactsList';

const SidebarContainer = styled.div`
	& .ant-tabs-nav-list {
		width: 100%;
	}
	& .ant-tabs-tab {
		flex: 1;
		justify-content: center;
	}
	& .ant-tabs-tab + .ant-tabs-tab {
		margin: 0;
	}
`;

const Sidebar = ({ contactsState, chatsState, getContacts, getChats }) => {
	const [activeTab, setActiveTab] = useState('2');

	// check for tab change
	// check for contacts/chats from reducer & make api calls to fetch

	useEffect(() => {
		const userObj = localStorage.getItem('user');
		if (!userObj) return;
		const { id } = JSON.parse(userObj);
		const { data: contacts } = contactsState;
		const { data: chats } = chatsState;

		// if (activeTab === '1') {
			if (
				!contactsState.loading &&
				!contactsState.error &&
				!Array.isArray(contacts)
			) {
				getContacts(id);
			}
		// } else if (activeTab === '2') {
			if (
				!chatsState.loading &&
				!chatsState.error &&
				!chats
			) {
				getChats(id);
			}
		// }
	}, []);

	return (
		<SidebarContainer>
			<Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
				<Tabs.TabPane key='1' tab='Contacts'>
					<ContactsList setActiveTab={setActiveTab} />
				</Tabs.TabPane>
				<Tabs.TabPane key='2' tab='Chats'>
					<ChatsList />
				</Tabs.TabPane>
			</Tabs>
		</SidebarContainer>
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
		getContacts: (id) => dispatch(fetchContacts(id)),
		getChats: (id) => dispatch(fetchChats(id)),
		storeActiveChat: (id) => dispatch(setActiveChat(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

// {!loading && contacts.length && (
//     <Menu mode='inline' selectedKeys={[activeContact]} onClick={handleMenuClick}>
//         <MenuItem disabled key='disabled-key'>Search bar</MenuItem>
//         {contacts.map(contact => (
//             <MenuItem key={contact.id}>
//                 <AvatarName name={contact.name} avatar={contact.image} />
//             </MenuItem>
//         ))}
//     </Menu>
// )}
