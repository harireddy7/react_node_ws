import { Menu } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AvatarName from '../Components/AvatarName';
import ConversationView from '../Components/ConversationUI/ConversationView';
import { fetchContacts, setActiveContact } from '../redux/actions/contacts';

// const StyledText = styled(Text)`
// 	color: ${({ color }) => color || '#fff'};
// `;

// const StyledHeader = styled(Header)`
// 	@media (max-width: 425px) {
// 		padding: 0 20px;
// 	}
// `

const MainContent = styled(Content)`
	padding: 0 50px;
	height: calc(100vh - 64px);
	@media (max-width: 767px) {
		padding: 0 10px;
	}
	@media (max-width: 425px) {
		padding: 0;
	}
`;

const StyledContentLayout = styled(Layout)`
	background: #fff;
	padding: 24px 0;
	margin: 20px 0;
	height: calc(100% - 54px);
	border-radius: 8px;
	display: flex;
	@media (max-width: 425px) {
		margin: 0;
		height: 100%;
	}
`;

const StyledSider = styled(Sider)`
	background: #fff;
	z-index: 9999;
	height: 100%;
	max-height: 84vh;
	& > .ant-layout-sider-children {
		overflow-y: auto;
	}
	& > .ant-layout-sider-zero-width-trigger {
		top: 0;
	}
	& > .ant-layout-sider-children::-webkit-scrollbar {
		width: 1px;
	}
	& > .ant-layout-sider-children::-webkit-scrollbar-track {
		background: transparent; 
	}
	& > .ant-layout-sider-children::-webkit-scrollbar-thumb {
		background: transparent; 
	}
	& > .ant-layout-sider-children::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
	@media (max-width: 650px) {
		position: fixed;
	}
	@media (min-width: 1200px) {
		flex: 0 0 350px !important;
		max-width: 350px !important;
        width: 350px !important;
    }
`;

const StyledContent = styled(Content)`
	padding: 0 24px;
	width: 80%;
	@media (max-width: 425px) {
		padding: 0 10px;
	}
`;

const MenuItem = styled(Menu.Item)`
	height: 70px !important;
	& > span {
		// padding: 5px;
	}
`;

const Home = ({ contactsState, setContact, getContacts, history }) => {

	const { loading, data: contacts } = contactsState;
	const [activeContact, setActiveContact] = useState();

	useEffect(() => {
		const userObj = JSON.parse(localStorage.getItem('user'));
		if (userObj) {
			getContacts(userObj.id);
		} else {
			localStorage.removeItem('user');
			history.push('/login');
		}
	  }, [getContacts])

	const handleMenuClick = ({ key }) => {
		const activeContact = contacts.find((c) => c.id === key);
		if (key && activeContact) {
			setContact(activeContact);
			setActiveContact(key)
		}
	};

	return (
		<MainContent>
			<StyledContentLayout>
				<StyledSider
					width={250}
					breakpoint='md'
					collapsedWidth='0'
				>
					{!loading && contacts.length && (
						<Menu mode='inline' selectedKeys={[activeContact]} onClick={handleMenuClick}>
							<MenuItem disabled key='disabled-key'>Search bar</MenuItem>
							{contacts.map(contact => (
								<MenuItem key={contact.id}>
									<AvatarName name={contact.name} avatar={contact.image} />
								</MenuItem>
							))}
						</Menu>
					)}
				</StyledSider>
				<StyledContent>
					<ConversationView />
				</StyledContent>
			</StyledContentLayout>
		</MainContent>
	);
};

const mapStateToProps = (state) => {
	return {
		contactsState: state.contacts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setContact: (contact) => dispatch(setActiveContact(contact)),
		getContacts: (id) => dispatch(fetchContacts(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
