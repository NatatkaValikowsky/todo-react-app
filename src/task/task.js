import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';
import Timer from '../timer';

export default class Task extends Component {
	constructor(props) {
		super(props);
		this.state = { ...props };
	}

	onChangeTitle = (event) => {
		this.setState({
			editedTitle: event.target.value,
		});
	};

	onClickEditButton = (func) => {
		const { title } = this.state;
		this.setState({
			editedTitle: title,
		});

		func();
		document.addEventListener('keydown', this.escKeyHandler);
	};

	escKeyHandler = (event) => {
		if (event.keyCode === 27) {
			const { closeEditField, id } = this.state;
			closeEditField(id);
		}
	};

	render() {
		const {
			id,
			date,
			isCompleted,
			isEditing,
			onSetCompleted,
			onEdited,
			onDeleted,
			saveNewTitle,
			closeEditField,
			onStartTimer,
			isCurrentTimer,
		} = this.props;
		const { title, editedTitle } = this.state;

		const classes = (isCompleted ? ' completed' : '') + (isEditing ? ' editing' : '');

		if (!isEditing) {
			document.removeEventListener('keydown', this.escKeyHandler);
		}

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
						<span className="description">{title}</span>
						<Timer onStartTimer={onStartTimer} elId={id} isCurrentTimer={isCurrentTimer} couldStart={!isCompleted} />
						<span className="created">created {formatDistanceToNow(date, { addSuffix: true })}</span>
					</label>
					{!isCompleted ? (
						<button
							type="button"
							className="icon icon-edit"
							onClick={() => {
								this.onClickEditButton(onEdited);
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
							this.setState({
								title: editedTitle,
							});
							saveNewTitle(id, title);
							closeEditField(id);
						}}
					>
						<input type="text" className="edit" value={editedTitle || title} onChange={this.onChangeTitle} />
					</form>
				) : null}
			</li>
		);
	}
}

Task.defaultProps = {
	isCompleted: false,
	isEditing: false,
	onSetCompleted: () => {},
	onEdited: () => {},
	onDeleted: () => {},
	saveNewTitle: () => {},
	closeEditField: () => {},
	onStartTimer: () => {},
	isCurrentTimer: false,
};

Task.propTypes = {
	id: PropTypes.number.isRequired,
	date: PropTypes.instanceOf(Date).isRequired,
	isCompleted: PropTypes.bool,
	isEditing: PropTypes.bool,
	onSetCompleted: PropTypes.func,
	onEdited: PropTypes.func,
	onDeleted: PropTypes.func,
	saveNewTitle: PropTypes.func,
	closeEditField: PropTypes.func,
	onStartTimer: PropTypes.func,
	isCurrentTimer: PropTypes.bool,
};
