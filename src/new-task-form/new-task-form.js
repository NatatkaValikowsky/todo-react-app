import React, {Component} from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            newTaskText: ''
        };

        this.onNewItemFieldChangeHandler = (e) => {
            this.setState({
                label: e.target.value
            });
        };
    }

    render() {
        const {onAddItem} = this.props;

        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onAddItem(this.state.label);
                }}>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    onChange={this.onNewItemFieldChangeHandler}
                    autoFocus />
            </form>
        );
    }
}
