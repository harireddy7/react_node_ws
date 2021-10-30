import { Col, Menu, Row } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AvatarName from '../Components/AvatarName';
import MessageView from '../Components/MessageUI/MessageView';
import { setActiveContact } from '../redux/actions/contacts';

const StyledText = styled(Text)`
	color: ${({ color }) => color || '#fff'};
`;

const MainContent = styled(Content)`
	padding: 0 50px;
	height: calc(100vh - 64px);
	@media (max-width: 767px) {
		padding: 0 10px;
	}
`;

const StyledContentLayout = styled(Layout)`
	background: #fff;
	padding: 24px 0;
	margin: 20px 0;
	height: calc(100% - 54px);
	border-radius: 8px;
	display: flex;
`;

const StyledSider = styled(Sider)`
	background: #fff;
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
`;

const StyledContent = styled(Content)`
	padding: 0 24px;
	width: 80%;
`;

const MenuItem = styled(Menu.Item)`
	height: 70px !important;
	& > span {
		// padding: 5px;
	}
`;

const getInitials = (name) => {
	const _name = name.toUpperCase().split(' ');
	return `${_name[0].substr(0, 1)}${
		_name.length > 1 ? _name[1].substr(0, 1) : ''
	}`;
};

const Home = ({ contactsState, setUser, setContact }) => {
	const { loading, data: contacts } = contactsState;
	const [activeContact, setActiveContact] = useState();

	useEffect(() => {
		setUser();
	}, []);

	const handleMenuClick = ({ key }) => {
		const activeContact = contacts.find((c) => c.id === +key);
		if (key && activeContact) {
			setContact(activeContact);
			setActiveContact(key)
		}
	};

	return (
		<Layout>
			<Header>
				<Row>
					<Col span={8}>
						<StyledText strong>PingHere</StyledText>
					</Col>
				</Row>
			</Header>
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
										<AvatarName name={contact.name} avatar={contact.avatar} />
									</MenuItem>
								))}
							</Menu>
						)}
					</StyledSider>
					<StyledContent>
						<MessageView />
					</StyledContent>
				</StyledContentLayout>
			</MainContent>
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		contactsState: state.contacts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setUser: () =>
			dispatch({
				type: 'SET_USER',
				payload: { name: 'barry allen', mobile: '9874510233' },
			}),
		setContact: (contact) => dispatch(setActiveContact(contact)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
