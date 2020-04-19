import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/';
import { history } from '../store/history';

import TaskDetail from './TaskDetail';
import Dashboard from './Dashboard';
import Navigation from './Navigation';
import Login from './Login';

const RouteGuard = (Component) => ({ match }) => {
	console.info('Route guard', match);
	if (!store.getState().session.authenticated) {
		return <Redirect to='/' />;
	} else {
		return <Component match={match} />;
	}
};

const Main = () => {
	return (
		<Router history={history}>
			<Provider store={store}>
				<Navigation />
				<Route exact path='/' component={Login} />
				<Route exact path='/dashboard' render={RouteGuard(Dashboard)} />
				<Route exact path='/task/:id' render={RouteGuard(TaskDetail)} />
			</Provider>
		</Router>
	);
};

export default Main;
