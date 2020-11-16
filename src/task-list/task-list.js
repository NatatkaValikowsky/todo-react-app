import React from 'react';
import PropTypes from 'prop-types';
import Task from "../task";
import './task-list.css';

const TaskList = ({items, filterType, onDeleted, onSetCompleted, onEdited, saveNewTitle, closeEditField}) => {
    const elements = items.filter(el => {
        return filterType === 'all' || (filterType === 'active' && !el.isCompleted) || (filterType === 'completed' && el.isCompleted);
        }).map((item) => {
            return (
                <Task
                    key={item.id}
                    {...item}
                    onDeleted = {() => onDeleted(item.id)}
                    onSetCompleted = {() => onSetCompleted(item.id)}
                    onEdited = {() => onEdited(item.id)}
                    saveNewTitle = {saveNewTitle}
                    closeEditField = {closeEditField}

                />
            );
    });

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    );
};

export default TaskList;

TaskList.defaultProps = {
    onDeleted: () => {},
    onSetCompleted: () => {},
    onEdited: () => {},
    saveNewTitle: () => {},
    closeEditField: () => {},
    filterType: 'all'
};

TaskList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func,
    onSetCompleted: PropTypes.func,
    onEdited: PropTypes.func,
    saveNewTitle: PropTypes.func,
    closeEditField: PropTypes.func,
    filterType: PropTypes.string
};
