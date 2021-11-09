import React, { useContext } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Layout, { Content } from 'antd/lib/layout/layout';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Sider from 'antd/lib/layout/Sider';
import ConversationView from '../Components/ConversationUI/ConversationView';
import Sidebar from '../Components/Sidebar/Sidebar';
import ImpulseSocket from '../Components/ImpulseSocket';
import { AuthContext } from '../Context/AuthContext';
import { checkIfMobile } from '../utils';

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
	padding: ${({ isMobile }) => (isMobile ? '0' : '24px 0')};
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
	width: ${({ isMobile }) => (isMobile ? '100%' : '80%')};
	padding: ${({ isMobile }) => (isMobile ? '0' : '0 24px')};
`;

const Home = () => {
	const screens = useBreakpoint();
	const isMobile = checkIfMobile(screens);
	const { user: { mobile: userId } = {} } = useContext(AuthContext);

	return (
		<ImpulseSocket id={userId}>
			<MainContent>
				<StyledContentLayout isMobile={isMobile}>
					{isMobile ? (
						<Sidebar />
					) : (
						<>
							<StyledSider width={250}>
								<Sidebar />
							</StyledSider>
							<StyledContent isMobile={isMobile}>
								<ConversationView />
							</StyledContent>
						</>
					)}
				</StyledContentLayout>
			</MainContent>
		</ImpulseSocket>
	);
};

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
