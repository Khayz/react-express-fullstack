import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';

import * as sagas from './sagas';
import * as mutations from './mutations';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const commentsReducer = (comments = []) => {
	return comments;
};

const groupsReducer = (groups = [], action) => {
	switch (action.type) {
		case mutations.SET_STATE:
			return action.state.groups;

		default:
			return groups;
	}
};

const usersReducer = (users = []) => {
	return users;
};

const tasksReducer = (tasks = [], action) => {
	switch (action.type) {
		case mutations.SET_STATE:
			return action.state.tasks;

		case mutations.CREATE_TASK:
			return [
				...tasks,
				{
					id: action.taskID,
					name: `New Task ${action.taskID}`,
					group: action.groupID,
					owner: action.ownerID,
					isComplete: false,
				},
			];

		case mutations.SET_TASK_COMPLETE:
			return tasks.map((task) => {
				return task.id === action.taskID
					? { ...task, isComplete: action.isComplete }
					: task;
			});

		case mutations.SET_TASK_NAME:
			return tasks.map((task) => {
				return task.id === action.taskID
					? { ...task, name: action.name }
					: task;
			});

		case mutations.SET_TASK_GROUP:
			return tasks.map((task) => {
				return task.id === action.taskID
					? { ...task, group: action.groupID }
					: task;
			});

		default:
			return tasks;
	}
};

const sessionReducer = (userSession = defaultState.session || {}, action) => {
	let { type, authenticated, session } = action;
	switch (type) {
		case mutations.SET_STATE:
			return { ...userSession, id: action.state.session.id };
		case mutations.REQUEST_AUTHENTICATE_USER:
			return { ...userSession, authenticated: mutations.AUTHENTICATING };
		case mutations.PROCESSING_AUTHENTICATE_USER:
			return { ...userSession, authenticated };
		default:
			return userSession;
	}
};

export const store = createStore(
	combineReducers({
		session: sessionReducer,
		tasks: tasksReducer,
		comments: commentsReducer,
		groups: groupsReducer,
		users: usersReducer,
	}),
	applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
	sagaMiddleware.run(sagas[saga]);
}
