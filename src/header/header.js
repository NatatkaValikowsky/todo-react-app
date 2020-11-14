import React from 'react';
import NewTaskForm from "../new-task-form";
import './header.css';

const Header = ({onAddItem}) => {

    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm
                onAddItem={onAddItem}
            />
        </header>
    );
};

export default Header;
