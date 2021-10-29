import { Col, Menu, Row, Skeleton, Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
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
`

const StyledContentLayout = styled(Layout)`
    background: #fff;
    padding: 24px 0;
    margin: 20px 0;
    height: calc(100% - 54px);
    border-radius: 8px;
    display: flex;
`

const StyledSider = styled(Sider)`
    background: #fff;
    overflow: auto;
    height: 100%;
    max-height: 85vh;
    // position: fixed;
`

const StyledContent = styled(Content)`
    padding: 0 24px;
    // overflow: auto;
    // height: 100%;
    // max-height: 85vh;
    // position: fixed;
    // right: 0;
    width: 80%;
`

const MenuItem = styled(Menu.Item)`
	height: 70px !important;
	& > span {
		// padding: 5px;
	}
`

const getInitials = name => {
	const _name = name.toUpperCase().split(' ')
	return `${_name[0].substr(0,1)}${_name.length > 1 ? _name[1].substr(0,1) : ''}`;
}

const Home = ({ contactsState, setUser, setContact }) => {
	const { loading, data: contacts } = contactsState;
	const [activeContact, setActiveContact] = useState();

	useEffect(() => {
		setUser();
	}, []);

	const handleMenuClick = ({ key }) => {
		const activeContact = contacts.find(c => c.id === +key)
		if (key && activeContact) {
			setContact(activeContact);
		}
	}

	return (
		<Layout>
			<Header>
				<Row>
					<Col span={8}>
						<StyledText strong>PingHere</StyledText>
					</Col>
					{/* <Col span={6} offset={12}>
                        <StyledText>Icon</StyledText>
                    </Col> */}
				</Row>
			</Header>
			<MainContent>
				<StyledContentLayout>
					<StyledSider width={200} breakpoint='md' collapsedWidth='0'>
						{!loading && contacts.length && (
							<Menu mode='inline' selectedKeys={[activeContact]} onClick={handleMenuClick}>
								<MenuItem disabled>Search bar</MenuItem>
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
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setUser: () =>
			dispatch({
				type: 'SET_USER',
				payload: { name: 'barry allen', mobile: '9874510233' },
			}),
		setContact: contact => dispatch(setActiveContact(contact)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
