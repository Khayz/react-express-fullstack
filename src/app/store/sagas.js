import { take, put, select } from 'redux-saga/effects';
import { v4 } from 'uuid';
import axios from 'axios';
import { history } from './history';
import * as mutations from './mutations';

const url = 'http://localhost:7777';

export function* taskCreationSaga() {
	while (true) {
		const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
		const ownerID = 'U1';
		const taskID = v4();
		yield put(mutations.createTask(taskID, groupID, ownerID));
		yield axios.post(url + '/task/new', {
			task: {
				id: taskID,
				group: groupID,
				owner: ownerID,
				isComplete: false,
				name: 'New Task',
			},
		});
	}
}

export function* taskModificationSaga() {
	while (true) {
		const task = yield take([
			mutations.SET_TASK_GROUP,
			mutations.SET_TASK_NAME,
			mutations.SET_TASK_COMPLETE,
		]);
		axios.post(url + '/task/update', {
			task: {
				id: task.taskID,
				group: task.groupID,
				name: task.name,
				isComplete: task.isComplete,
			},
		});
	}
}

export function* userAuthenticationSaga() {
	while (true) {
		const { username, password } = yield take(
			mutations.REQUEST_AUTHENTICATE_USER
		);

		try {
			const { data } = yield axios.post(`${url}/authenticate`, {
				username,
				password,
			});
			if (!data) {
				throw new Error();
			}
			yield put(mutations.setState(data.state));
			yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
			history.push('/dashboard');
		} catch (error) {
			console.log(error);
			yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
		}
	}
}
