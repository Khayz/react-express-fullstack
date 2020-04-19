import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestTaskCreation } from '../store/mutations';

const TaskList = ({ tasks, name, createNewTask, id }) => {
	return (
		<div className='card p-2 m-2'>
			<h3>{name}</h3>
			<div>
				{tasks.map((task) => (
					<Link key={task.id} to={'/task/' + task.id}>
						<div className='card p-2 mt-2'>{task.name}</div>
					</Link>
				))}
			</div>
			<button
				className='btn btn-primary btn-block mt-2'
				onClick={() => createNewTask(id)}>
				Add new
			</button>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	let groupID = ownProps.id;
	return {
		name: ownProps.name,
		id: groupID,
		tasks: state.tasks.filter((task) => task.group === groupID),
	};
};

const mapDispatchToProps = {
	createNewTask: requestTaskCreation,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
