import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {
    currId = 4;

    state = {
        items: [
            { id: 1, isEditing: false, isCompleted: true, title: 'Completed task', date: new Date(2020, 10, 2) },
            { id: 2, isEditing: false, isCompleted: false, title: 'Editing task', date: new Date(2020, 11, 12) },
            { id: 3, isEditing: false, isCompleted: false, title: 'Active task', date: new Date(2020, 4, 2) },
        ],
        show: 'all',
    };

    setFiltered = (type) => {
        this.setState({
            show: type,
        });
    };

    deleteItem = (id) => {
        this.setState(({ items }) => {
            return {
                items: [...items.filter((el) => el.id !== id)],
            };
        });
    };

    addNewItem = (label) => {
        this.setState(({ items }) => {
            return {
                items: [
                    ...items,
                    {
                        id: this.currId,
                        isEditing: false,
                        isCompleted: false,
                        title: label,
                        date: new Date(),
                    },
                ],
            };
        });

        this.currId += 1;
    };

    setCompleted = (id) => {
        this.setState(({ items }) => {
            return {
                items: [...items.map((el) => (el.id === id ? { ...el, isCompleted: !el.isCompleted } : el))],
            };
        });
    };

    clearCompleted = () => {
        this.setState(({ items }) => {
            return {
                items: [...items.filter((el) => !el.isCompleted)],
            };
        });
    };

    setEdited = (id) => {
        this.setState(({ items }) => {
            return {
                items: [
                    ...items.map((el) => (el.id === id && !el.isCompleted ? { ...el, isEditing: !el.isEditing } : { ...el, isEditing: false })),
                ],
            };
        });
    };

    saveTitle = (id, title) => {
        this.setState(({ items }) => {
            return {
                items: [...items.map((el) => (el.id === id ? { ...el, title } : el))],
            };
        });
    };

    render() {
        const { items, show } = this.state;
        const countToDo = items.filter((el) => !el.isCompleted).length;

        return (
            <section className="todoapp">
                <Header onAddItem={this.addNewItem} />

                <section className="main">
                    <TaskList
                        items={items}
                        filterType={show}
                        onDeleted={this.deleteItem}
                        onSetCompleted={this.setCompleted}
                        onEdited={this.setEdited}
                        saveNewTitle={this.saveTitle}
                        closeEditField={this.setEdited}
                    />

                    <Footer
                        filterItems={this.setFiltered}
                        filterType={show}
                        onClearAllCompleted={this.clearCompleted}
                        countToDo={countToDo}
                    />
                </section>
            </section>
        );
    }
}
