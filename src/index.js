import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Header from "./header";
import TaskList from "./task-list";
import Footer from "./footer";

class App extends Component{
    constructor() {
        super();

        this.currId = 4;

        this.state = {
            items: [
                {id: 1, isEditing: false, isCompleted: true, title: 'Completed task', date: new Date(2020, 10, 2)},
                {id: 2, isEditing: false, isCompleted: false, title: 'Editing task', date: new Date(2020, 11, 12)},
                {id: 3, isEditing: false, isCompleted: false, title: 'Active task', date: new Date(2020, 4, 2)}
            ],
            show: 'all'
        };

        this.getItems = () => {
            if(this.state.show === 'active'){
                return this.state.items.filter(el => !el.isCompleted);
            }

            if(this.state.show === 'completed'){
                return this.state.items.filter(el => el.isCompleted);
            }

            return this.state.items;
        };

        this.setFiltered = (type) => {
            this.setState({
                show: type
            });
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

        this.clearCompleted = () => {
            this.setState(({items}) => {
               return {
                   items: [
                       ...items.filter(el => !el.isCompleted)
                   ]
               };
            });
        };

        this.setEdited = (id) => {
            this.setState(({items}) => {
                return {
                    items: [
                        ...items.map(el => el.id === id ? {...el, isEditing: !el.isEditing} : {...el, isEditing: false})
                    ]
                };
            });
        };

        this.saveTitle = (id, title) => {
            this.setState(({items}) => {
                return {
                    items: [
                        ...items.map(el => el.id === id ? {...el, title} : el)
                    ]
                };
            });
        };
    }

    render() {

        const countToDo = this.state.items.filter(el => !el.isCompleted).length;

        return (
            <section className="todoapp">
                <Header
                    onAddItem={this.addNewItem}
                />

                <section className="main">
                    <TaskList
                        items={this.getItems()}
                        onDeleted = {this.deleteItem}
                        onSetCompleted = {this.setCompleted}
                        onEdited = {this.setEdited}
                        saveNewTitle = {this.saveTitle}
                        closeEditField = {this.setEdited}
                    />

                    <Footer
                        filterItems = {this.setFiltered}
                        filterType = {this.state.show}
                        onClearAllCompleted = {this.clearCompleted}
                        countToDo = {countToDo}
                    />
                </section>
            </section>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
