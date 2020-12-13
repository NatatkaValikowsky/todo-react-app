import React from 'react';
import './task-filter.css';
import PropTypes from 'prop-types';

import { filterClasses } from '../../classNames';

const TasksFilter = ({ filterItems, filterType }) => {
	return (
		<ul className="filters">
			<li>
				<button type="button" className={filterType === 'all' ? `${filterClasses.active}` : null} onClick={() => filterItems('all')}>
					All
				</button>
			</li>
			<li>
				<button
					type="button"
					className={filterType === 'active' ? `${filterClasses.active}` : null}
					onClick={() => filterItems('active')}
				>
					Active
				</button>
			</li>
			<li>
				<button
					type="button"
					className={filterType === 'completed' ? `${filterClasses.active}` : null}
					onClick={() => filterItems('completed')}
				>
					Completed
				</button>
			</li>
		</ul>
	);
};

export default TasksFilter;

TasksFilter.defaultProps = {
	filterItems: () => {},
	filterType: 'all',
};

TasksFilter.propTypes = {
	filterItems: PropTypes.func,
	filterType: PropTypes.string,
};
