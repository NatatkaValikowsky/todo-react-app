import React from 'react';
import Task from "../task";
import './task-list.css';

const TaskList = ({items}) => {

    const elements = items.map((item) => {
        const {id, isCompleted, isEditing, ...itemProps} = item;

        return (
            <li key={id} className={isCompleted ? 'completed' : isEditing ? 'editing' : ''}>
                <Task  {...itemProps} />

                {isEditing ? <input type="text" className="edit" value="Editing task" /> : null}
            </li>
        );
    });

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    );
};

export default TaskList;
