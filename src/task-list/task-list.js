import React from 'react';
import Task from "../task";
import './task-list.css';

const TaskList = ({items, onDeleted, onSetCompleted, onEdited, saveNewTitle, closeEditField}) => {

    const elements = items.map((item) => {
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
