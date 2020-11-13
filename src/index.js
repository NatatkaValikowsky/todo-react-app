import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Header from "./header";
import TaskList from "./task-list";
import Footer from "./footer";

const App = () => {

    const tasks = [
        {id: 1, isEditing: false, isCompleted: true, title: 'Completed task', date: new Date(2020, 10, 2)},
        {id: 2, isEditing: true, isCompleted: false, title: 'Editing task', date: new Date(2020, 11, 12)},
        {id: 3, isEditing: false, isCompleted: false, title: 'Active task', date: new Date(2020, 4, 2)}
    ];

    return (
        <section className="todoapp">
            <Header />
            <section className="main">
                <TaskList items={tasks} />
                <Footer />
            </section>
        </section>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
