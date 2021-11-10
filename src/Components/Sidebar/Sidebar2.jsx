import { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Drawer, Space, Tabs } from 'antd';
import ContactsFilled from '@ant-design/icons/ContactsFilled';
import ChatsList from './ChatsList';
import ContactsList from './ContactsList';
import { AuthContext } from '../../Context/AuthContext';
import { fetchChats, setActiveChat } from '../../redux/actions/chats';
import { fetchContacts } from '../../redux/actions/contacts';
import Avatar from 'antd/lib/avatar/avatar';

const SidebarContainer = styled.div`
	position: relative;
	height: 100%;
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
	const [visible, setVisible] = useState(false);
	const { user: { mobile: userId, image } = {} } = useContext(AuthContext);

	// check for tab change
	// check for contacts/chats from reducer & make api calls to fetch

	const toggleDrawer = bool => setVisible(bool);

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
		if (!chatsState.loading && !chatsState.error && !chats) {
			getChats(userId);
		}
	}, []);

	return (
		<SidebarContainer>
			{/* <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
				<Tabs.TabPane key='1' tab='Contacts'>
					<ContactsList setActiveTab={setActiveTab} />
				</Tabs.TabPane>
				<Tabs.TabPane key='2' tab='Chats'>
					<ChatsList />
				</Tabs.TabPane>
			</Tabs> */}
			<Space
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '10px 20px',
				}}
			>
				<Avatar src={image} size='large' />
				<Avatar
					icon={<ContactsFilled style={{ color: '#333', fontSize: '36px' }} />}
					size='large'
					style={{ background: 'transparent', cursor: 'pointer' }}
					onClick={() => toggleDrawer(true)}
				/>
			</Space>
			<ChatsList />
			{visible && <Drawer
				title='Basic Drawer'
				placement='left'
				closable={false}
				onClose={() => toggleDrawer(false)}
				visible={visible}
				getContainer={false}
				style={{ position: 'absolute', width: '100%' }}
			>
				<ContactsList />
			</Drawer>}
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
		storeActiveChat: (id) => dispatch(setActiveChat(id)),
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
