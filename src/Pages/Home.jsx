import { Col, Menu, Row } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import Text from 'antd/lib/typography/Text';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

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


const Home = ({ setUser }) => {
	useEffect(() => {
		setUser();
	}, []);

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
						<Menu mode='inline' defaultSelectedKeys={['5']}>
							<Menu.Item key="1">User 1</Menu.Item>
                            <Menu.Item key="2">User 2</Menu.Item>
                            <Menu.Item key="3">User 3</Menu.Item>
                            <Menu.Item key="4">User 4</Menu.Item>
                            <Menu.Item key="5">User 5</Menu.Item>
                            <Menu.Item key="6">User 6</Menu.Item>
						</Menu>
					</StyledSider>
					<StyledContent>Content</StyledContent>
				</StyledContentLayout>
			</MainContent>
		</Layout>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setUser: () =>
			dispatch({
				type: 'SET_USER',
				payload: { name: 'barry allen', mobile: '9874510233' },
			}),
	};
};

export default connect(null, mapDispatchToProps)(Home);
