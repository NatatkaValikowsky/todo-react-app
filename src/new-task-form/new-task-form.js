import React, { useState } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {

	const [newTaskText, setNewTaskText] = useState('');
	const { onAddItem } = props;

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				onAddItem(newTaskText);
				setNewTaskText('');
			}}
		>
			<input
				className="new-todo"
				placeholder="What needs to be done?"
				onChange={(event) => {setNewTaskText(event.target.value)}}
				value={newTaskText}
			/>
		</form>
	)
};

export default NewTaskForm;

NewTaskForm.defaultProps = {
	onAddItem: () => {},
};

NewTaskForm.propTypes = {
	onAddItem: PropTypes.func,
};
