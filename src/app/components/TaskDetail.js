import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const TaskDetail = ({
	id,
	comments,
	task,
	isComplete,
	groups,
	setTaskCompletion,
	setTaskGroup,
	setTaskName,
}) => (
	<div className='card p-3 col-6'>
		<div>
			<input
				className='form-control form-control-lg'
				onChange={setTaskName}
				value={task.name}
			/>
		</div>
		<div>
			<button
				className='btn btn-primary mt-2'
				onClick={() => setTaskCompletion(id, !isComplete)}>
				{isComplete ? 'Reopen' : 'Complete'}
			</button>
		</div>
		<div className='mt-3'>
			<select
				className='form-control'
				onChange={setTaskGroup}
				value={task.group}>
				{groups.map((group) => (
					<option key={group.id} value={group.id}>
						{group.name}
					</option>
				))}
			</select>
		</div>
		<div>
			<Link to='/dashboard'>
				<button className='btn btn-primary mt-2'>Done</button>
			</Link>
		</div>
	</div>
);

const mapStateToProps = (state, ownProps) => {
	let id = ownProps.match.params.id;
	let task = state.tasks.find((task) => task.id === id);
	let groups = state.groups;

	return {
		id,
		task,
		groups,
		isComplete: task.isComplete,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const id = ownProps.match.params.id;
	return {
		setTaskCompletion(id, isComplete) {
			dispatch(mutations.setTaskCompletion(id, isComplete));
		},
		setTaskGroup(event) {
			dispatch(mutations.setTaskGroup(id, event.target.value));
		},
		setTaskName(event) {
			dispatch(mutations.setTaskName(id, event.target.value));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
