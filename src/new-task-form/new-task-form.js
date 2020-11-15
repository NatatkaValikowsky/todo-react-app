import React, {Component} from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            newTaskText: ''
        };

        this.onNewItemFieldChangeHandler = (e) => {
            this.setState({newTaskText: e.target.value});
        };
    }

    render() {
        const {onAddItem} = this.props;

        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onAddItem(this.state.newTaskText);
                    this.setState({
                        newTaskText: ''
                    });
                }}>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    onChange={this.onNewItemFieldChangeHandler}
                    value={this.state.newTaskText}
                    autoFocus />
            </form>
        );
    }
}

NewTaskForm.defaultProps = {
    onAddItem: () => {}
};

NewTaskForm.propTypes = {
    onAddItem: PropTypes.func
};
