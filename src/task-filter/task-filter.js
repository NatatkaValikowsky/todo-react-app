import React, {Component} from 'react';
import './task-filter.css';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component{
    render() {

        const {filterItems, filterType} = this.props;

        return (
            <ul className="filters">
                <li>
                    <button
                        className={filterType === 'all' ? 'selected' : null}
                        onClick={() => filterItems('all')}>All</button>
                </li>
                <li>
                    <button
                        className={filterType === 'active' ? 'selected' : null}
                        onClick={() => filterItems('active')}>Active</button>
                </li>
                <li>
                    <button
                        className={filterType === 'completed' ? 'selected' : null}
                        onClick={() => filterItems('completed')}>Completed</button>
                </li>
            </ul>
        );
    }
}

TasksFilter.defaultProps = {
    filterItems: () => {},
    filterType: 'all'
};

TasksFilter.propTypes = {
    filterItems: PropTypes.func,
    filterType: PropTypes.string
};
