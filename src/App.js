import { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Layout, { Header } from 'antd/lib/layout/layout';
import Text from 'antd/lib/typography/Text';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Conversation from './Pages/Conversation';
import { AuthContext } from './Context/AuthContext';
import { SET_LOGGED_USER } from './Context/AuthActions';
import { resetChats } from './redux/actions/chats';
import { resetContacts } from './redux/actions/contacts';
import { checkIfMobile, getActiveBreakpoint, isProfilePicPresent } from './utils';

const StyledText = styled(Text)`
	color: ${({ color }) => color || '#fff'};
`;

const StyledHeader = styled(Header)`
	@media (max-width: 425px) {
		padding: 0 20px;
	}
`;

const App = ({ resetStore }) => {
	const screens = useBreakpoint();
	const isMobile = checkIfMobile(screens);
	const pathname = window.location.pathname;
	const activeBp = getActiveBreakpoint(screens);

	const { user, setUserContext } = useContext(AuthContext);

	const handleLogout = () => {
		// reset context
		// reset store
		resetStore();
		setUserContext({
			type: SET_LOGGED_USER,
			payload: null,
		});
	}

	return (
		<Layout id='main-app-layout'>
			{(!isMobile || (isMobile && pathname === '/')) && (
				<StyledHeader>
					<Row>
						<Col xs={8} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<StyledText strong>ImpulseChat</StyledText>
						</Col>
						<Col xs={12} md={14} />
						<Col xs={4} md={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
							{user && (
								<Avatar
									size={isMobile ? 'default' : 'large'}
									{...isProfilePicPresent(user.image) ? { src: user.image } : { icon: <UserOutlined /> }}
									onClick={handleLogout}
									style={{ cursor: 'pointer', background: '#2c3e50' }}
								/>
							)}
						</Col>
					</Row>
				</StyledHeader>
			)}
			<Router>
				<Switch>
					<Route path='/' exact>
						{user ? <Home /> : <Redirect to='/login' />}
					</Route>
					<Route path='/login'>
						{user ? <Redirect to='/' /> : <Login />}
					</Route>
					<Route path='/chat/:mobile'>
						{user ? <Conversation /> : <Redirect to='/login' />}
					</Route>
				</Switch>
			</Router>
		</Layout>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		resetStore: () => {
			dispatch(resetChats());
			dispatch(resetContacts());
		}
	}
}

export default connect(null, mapDispatchToProps)(App);
