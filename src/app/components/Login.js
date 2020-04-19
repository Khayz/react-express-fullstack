import React from 'react';
import * as mutations from '../store/mutations';
import { connect } from 'react-redux';

const Login = ({ authenticateUser, authenticated, ...props }) => {
	return (
		<div className='card p-3 col-6'>
			<h2>Please Login</h2>
			<form onSubmit={authenticateUser}>
				<input
					className='form-control'
					type='text'
					placeholder='Username'
					name='username'
					defaultValue='Dev'
				/>
				<input
					className='form-control mt-2'
					type='password'
					placeholder='Password'
					name='password'
					defaultValue='tuples'
				/>
				{authenticated === mutations.NOT_AUTHENTICATED ? (
					<p>Login incorrect</p>
				) : null}
				<button className='form-control mt-2 btn btn-primary' type='submit'>
					Login
				</button>
			</form>
		</div>
	);
};

const mapStateToProps = ({ session }) => ({
	authenticated: session.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
	authenticateUser(event) {
		event.preventDefault();
		let username = event.target['username'].value;
		let password = event.target['password'].value;
		dispatch(mutations.requestAuthenticateUser(username, password));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
