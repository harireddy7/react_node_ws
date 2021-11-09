import { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Tabs } from 'antd';
import ChatsList from './ChatsList';
import ContactsList from './ContactsList';
import { AuthContext } from '../../Context/AuthContext';
import { fetchChats, setActiveChat } from '../../redux/actions/chats';
import { fetchContacts } from '../../redux/actions/contacts';

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
	const { user: { mobile: userId } = {} } = useContext(AuthContext);

	// check for tab change
	// check for contacts/chats from reducer & make api calls to fetch

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
			getChats(userId);
		}

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
