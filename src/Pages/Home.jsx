import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import ConversationView from '../Components/ConversationUI/ConversationView';
import Sidebar from '../Components/Sidebar/Sidebar';
import { setLoggedUser } from '../redux/actions/user';
import ImpulseSocket from '../Components/ImpulseSocket';

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

const Home = ({ contactsState, userId, setUser, history }) => {

	useEffect(() => {
		const userObj = JSON.parse(localStorage.getItem('user'));
		if (!userObj) {
			localStorage.removeItem('user');
			history.push('/login');
		} else {
			setUser(userObj);
		}
	}, []);

	const receiveMsgFromServer = (data) => {}

	return (
		<ImpulseSocket id={userId}>
			<MainContent>
				<StyledContentLayout>
					<StyledSider width={250} breakpoint='md' collapsedWidth='0'>
						<Sidebar />
					</StyledSider>
					<StyledContent>
						<ConversationView />
					</StyledContent>
				</StyledContentLayout>
			</MainContent>
		</ImpulseSocket>
	);
};

const mapStateToProps = (state) => {
	return {
		userId: state.user?.data?.mobile,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setUser: (user) => dispatch(setLoggedUser(user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
