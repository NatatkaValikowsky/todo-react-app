import React from 'react';
import {formatDistanceToNow } from 'date-fns';
import './task.css';

const Task = ({title, date}) => {
    return (
        <div className="view">
            <input className="toggle" type="checkbox" />
            <label>
                <span className="description">{title}</span>
                <span className="created">created {formatDistanceToNow(date, { addSuffix: true })}</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
        </div>
    );
};

export default Task;
