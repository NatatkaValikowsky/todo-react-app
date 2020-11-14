import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Header from "./header";
import TaskList from "./task-list";
import Footer from "./footer";

class App extends Component{
    constructor() {
        super();

        this.currId = 5;

        this.state = {
            items: [
                {id: 1, isEditing: false, isCompleted: true, title: 'Completed task', date: new Date(2020, 10, 2)},
                {id: 2, isEditing: false, isCompleted: false, title: 'Editing task', date: new Date(2020, 11, 12)},
                {id: 3, isEditing: false, isCompleted: false, title: 'Active task', date: new Date(2020, 4, 2)}
            ]
        };

        this.deleteItem = (id) => {
            this.setState(({items}) => {
                return {
                    items: [
                        ...items.filter(el => el.id !== id)
                    ]
                }
            })
        };

        this.addNewItem = (label) => {
            this.setState(({items}) => {
                return {
                    items: [
                        ...items,
                        {
                            id: this.currId,
                            isEditing: false,
                            isCompleted: false,
                            title: label,
                            date: new Date()
                        }
                    ]
                }
            });

            this.currId += 1;
        };

        this.setCompleted = (id) => {
            this.setState(({items}) => {
                return {
                    items: [
                        ...items.map(el => el.id === id ? {...el, isCompleted: !el.isCompleted} : el)
                    ]
                };
            });

        };
    }

    render() {
        return (
            <section className="todoapp">
                <Header
                    onAddItem={this.addNewItem}
                />

                <section className="main">
                    <TaskList
                        items={this.state.items}
                        onDeleted = {this.deleteItem}
                        onSetCompleted = {this.setCompleted}
                    />
                    <Footer />
                </section>
            </section>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
