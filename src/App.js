import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Layout, { Header } from 'antd/lib/layout/layout';
import Text from 'antd/lib/typography/Text';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { checkIfMobile, getFirstName } from './utils';
import Conversation from './Pages/Conversation';
import ImpulseSocket from './Components/ImpulseSocket';

const StyledText = styled(Text)`
	color: ${({ color }) => color || '#fff'};
`;

const StyledHeader = styled(Header)`
	@media (max-width: 425px) {
		padding: 0 20px;
	}
`;

const App = ({ contactsState, userState }) => {
	const screens = useBreakpoint();
	const isMobile = checkIfMobile(screens);
	const pathname = window.location.pathname

	return (
		<Layout id='main-app-layout'>
			{(!isMobile || (isMobile && pathname === '/')) && (
				<StyledHeader>
					<Row>
						<Col span={8}>
							<StyledText strong>ImpulseChat</StyledText>
						</Col>
						<Col span={8} />
						<Col span={8}>
							<StyledText strong>
								{userState?.data?.name && getFirstName(userState?.data?.name)}
							</StyledText>
						</Col>
					</Row>
				</StyledHeader>
			)}
			<Router>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/chat/:mobile' component={Conversation} />
					<Route path='/' component={Home} />
				</Switch>
			</Router>
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		userState: state.user,
	};
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
