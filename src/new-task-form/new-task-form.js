import React, { Component } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
	state = {
		newTaskText: '',
	};

	onNewItemFieldChangeHandler = (event) => {
		this.setState({ newTaskText: event.target.value });
	};

	render() {
		const { onAddItem } = this.props;
		const { newTaskText } = this.state;

		return (
			<form
				onSubmit={(event) => {
					event.preventDefault();
					onAddItem(newTaskText);
					this.setState({
						newTaskText: '',
					});
				}}
			>
				<input
					className="new-todo"
					placeholder="What needs to be done?"
					onChange={this.onNewItemFieldChangeHandler}
					value={newTaskText}
				/>
			</form>
		);
	}
}

NewTaskForm.defaultProps = {
	onAddItem: () => {},
};

NewTaskForm.propTypes = {
	onAddItem: PropTypes.func,
};
