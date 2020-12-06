import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';
import Timer from '../timer';

const Task = (props) => {
	const {
		id,
		title,
		date,
		isCompleted,
		isEditing,
		onSetCompleted,
		onDeleted,
		saveNewTitle,
		closeEditField,
		onStartTimer,
		isCurrentTimer,
		onEdited,
	} = props;

	const [_title, setTitle] = useState(title);
	const [_editedTitle, setEditedTitle] = useState(title);

	const classes = (isCompleted ? ' completed' : '') + (isEditing ? ' editing' : '');

	const escKeyHandler = (event) => {
		if (event.keyCode === 27) {
			closeEditField(id);
		}
	};

	if (!isEditing) {
		document.removeEventListener('keydown', escKeyHandler);
	}

	const onClickEditButton = (func) => {
		setEditedTitle(_title);

		func();
		document.addEventListener('keydown', escKeyHandler);
	};

	const onChangeTitle = (event) => {
		setEditedTitle(event.target.value);
	};

	return (
		<li key={id} className={classes}>
			<div className="view">
				<input
					id={`list-element-${id}`}
					className="toggle"
					type="checkbox"
					onChange={onSetCompleted}
					checked={isCompleted}
				/>
				<label htmlFor={`list-element-${id}`}>
					<span className="description">{_title}</span>
					<Timer
						onStartTimer={onStartTimer}
						elId={id}
						isCurrentTimer={isCurrentTimer && !isCompleted && !isEditing}
						couldStart={!isCompleted}
					/>
					<span className="created">created {formatDistanceToNow(date, { addSuffix: true })}</span>
				</label>
				{!isCompleted ? (
					<button
						type="button"
						className="icon icon-edit"
						onClick={() => {
							setTitle(_title);
							onClickEditButton(onEdited);
						}}
						aria-label="Edit button"
					/>
				) : null}
				<button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Delete button" />
			</div>

			{isEditing ? (
				<form
					onSubmit={(event) => {
						event.preventDefault();
						setTitle(_editedTitle);
						saveNewTitle(id, _title);
						closeEditField(id);
					}}
				>
					<input type="text" className="edit" value={_editedTitle || _title} onChange={onChangeTitle} />
				</form>
			) : null}
		</li>
	);
};

export default Task;

Task.defaultProps = {
	isCompleted: false,
	isEditing: false,
	onSetCompleted: () => {},
	onDeleted: () => {},
	saveNewTitle: () => {},
	closeEditField: () => {},
	onStartTimer: () => {},
	isCurrentTimer: false,
	onEdited: () => {},
};

Task.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(Date).isRequired,
	isCompleted: PropTypes.bool,
	isEditing: PropTypes.bool,
	onSetCompleted: PropTypes.func,
	onDeleted: PropTypes.func,
	saveNewTitle: PropTypes.func,
	closeEditField: PropTypes.func,
	onStartTimer: PropTypes.func,
	isCurrentTimer: PropTypes.bool,
	onEdited: PropTypes.func,
};
