import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';

export default class Task extends Component {
	constructor(props) {
		super(props);
		this.state = { ...props };

		this.onChangeTitle = (event) => {
			this.setState({
				title: event.target.value,
			});
			props.saveNewTitle(props.id, event.target.value);
		};
	}

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
		} = this.props;
		const { title } = this.state;

		const classes = (isCompleted ? ' completed' : '') + (isEditing ? ' editing' : '');

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
						<span className="created">created {formatDistanceToNow(date, { addSuffix: true })}</span>
					</label>
					{!isCompleted ? <button type="button" className="icon icon-edit" onClick={onEdited} aria-label="Edit button" /> : null}
					<button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Delete button" />
				</div>

				{isEditing ? (
					<form
						onSubmit={(event) => {
							event.preventDefault();
							saveNewTitle(id, title);
							closeEditField(id);
						}}
					>
						<input type="text" className="edit" value={title} onChange={this.onChangeTitle} />
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
};
