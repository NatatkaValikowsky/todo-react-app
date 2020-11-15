import React from 'react';
import './task-filter.css';
import PropTypes from 'prop-types';

const TasksFilter = ({filterItems, filterType}) => {
    return (
        <ul className="filters">
            <li>
                <button
                    type="button"
                    className={filterType === 'all' ? 'selected' : null}
                    onClick={() => filterItems('all')}>All</button>
            </li>
            <li>
                <button
                    type="button"
                    className={filterType === 'active' ? 'selected' : null}
                    onClick={() => filterItems('active')}>Active</button>
            </li>
            <li>
                <button
                    type="button"
                    className={filterType === 'completed' ? 'selected' : null}
                    onClick={() => filterItems('completed')}>Completed</button>
            </li>
        </ul>
    );
};

export default TasksFilter;

TasksFilter.defaultProps = {
    filterItems: () => {},
    filterType: 'all'
};

TasksFilter.propTypes = {
    filterItems: PropTypes.func,
    filterType: PropTypes.string
};
