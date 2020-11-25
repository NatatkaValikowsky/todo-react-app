import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../task-filter';
import './footer.css';

const Footer = ({ filterItems, filterType, onClearAllCompleted, countToDo }) => {
	return (
		<footer className="footer">
			<span className="todo-count">{countToDo} items left</span>
			<TasksFilter filterItems={filterItems} filterType={filterType} />
			<button
				type="button"
				className="clear-completed"
				onClick={() => {
					onClearAllCompleted();
				}}
			>
				Clear completed
			</button>
		</footer>
	);
};

export default Footer;

Footer.defaultProps = {
	filterItems: () => {},
	filterType: 'all',
	onClearAllCompleted: () => {},
};

Footer.propTypes = {
	filterItems: PropTypes.func,
	filterType: PropTypes.string,
	onClearAllCompleted: PropTypes.func,
	countToDo: PropTypes.number.isRequired,
};
