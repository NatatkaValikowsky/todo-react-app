import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../task';
import './task-list.css';

export default class TaskList extends Component {
	state = {
		startedTimerId: null,
	};

	setCurrentTimerId = (id) => {
		this.setState({
			startedTimerId: id,
		});
	};

	render() {
		const { startedTimerId } = this.state;

		const { items, filterType, onDeleted, onSetCompleted, onEdited, saveNewTitle, closeEditField } = this.props;

		const elements = items
			.filter((el) => {
				return (
					filterType === 'all' ||
					(filterType === 'active' && !el.isCompleted) ||
					(filterType === 'completed' && el.isCompleted)
				);
			})
			.map((item) => {
				return (
					<Task
						key={item.id}
						{...item}
						onDeleted={() => onDeleted(item.id)}
						onSetCompleted={() => onSetCompleted(item.id)}
						onEdited={() => onEdited(item.id)}
						saveNewTitle={saveNewTitle}
						closeEditField={closeEditField}
						isCurrentTimer={startedTimerId === item.id}
						onStartTimer={this.setCurrentTimerId}
					/>
				);
			});

		return <ul className="todo-list">{elements}</ul>;
	}
}

TaskList.defaultProps = {
	onDeleted: () => {},
	onSetCompleted: () => {},
	onEdited: () => {},
	saveNewTitle: () => {},
	closeEditField: () => {},
	filterType: 'all',
};

TaskList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	onDeleted: PropTypes.func,
	onSetCompleted: PropTypes.func,
	onEdited: PropTypes.func,
	saveNewTitle: PropTypes.func,
	closeEditField: PropTypes.func,
	filterType: PropTypes.string,
};
