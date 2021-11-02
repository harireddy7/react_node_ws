import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Layout, { Header } from 'antd/lib/layout/layout';
import Text from 'antd/lib/typography/Text';
import Home from './Pages/Home';
import Login from './Pages/Login';


const StyledText = styled(Text)`
	color: ${({ color }) => color || '#fff'};
`;

const StyledHeader = styled(Header)`
	@media (max-width: 425px) {
		padding: 0 20px;
	}
`;

const App = ({ contactsState, setUser }) => {
	// const { loading, data: contacts } = contactsState;
	// const [activeContact, setActiveContact] = useState();

	useEffect(() => {
		setUser();
	}, [setUser]);

	return (
		<Layout>
			<StyledHeader>
				<Row>
					<Col span={8}>
						<StyledText strong>ImpulseChat</StyledText>
					</Col>
				</Row>
			</StyledHeader>
			<Router>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/' component={Home} />
				</Switch>
			</Router>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
