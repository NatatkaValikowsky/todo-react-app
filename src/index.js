import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Header from "./header";
import TaskList from "./task-list";
import Footer from "./footer";

class App extends Component{
    constructor() {
        super();

        this.state = {
            items: [
                {id: 1, isEditing: false, isCompleted: true, title: 'Completed task', date: new Date(2020, 10, 2)},
                {id: 2, isEditing: true, isCompleted: false, title: 'Editing task', date: new Date(2020, 11, 12)},
                {id: 3, isEditing: false, isCompleted: false, title: 'Active task', date: new Date(2020, 4, 2)}
            ]
        };

        this.deleteItem = (id) => {
            this.setState(({items}) => {
                const newArr = items.filter(el => el.id !== id);
                return {
                    items: newArr
                }
            })
        }
    }

    render() {
        return (
            <section className="todoapp">
                <Header />
                <section className="main">
                    <TaskList
                        items={this.state.items}
                        onDeleted = {this.deleteItem}
                    />
                    <Footer />
                </section>
            </section>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
