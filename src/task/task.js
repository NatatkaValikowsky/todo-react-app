import React, {Component} from 'react';
import {formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component{

    constructor(props) {
        super(props);

        this.state = {...props};

        this.onChangeTitle = (e) => {
            this.setState({
                title: e.target.value
            });
            props.saveNewTitle(props.id, e.target.value);
        };
    }

    render() {
        const props = this.props;

        let classes = (props.isCompleted ? ' completed' : '') + (props.isEditing ? ' editing' : '');

        return (
            <li key={props.id} className={classes}>
                <div className="view">
                    <input
                        id={'list-element-' + props.id}
                        className="toggle"
                        type="checkbox"
                        onChange={this.props.onSetCompleted}
                        checked={props.isCompleted}
                    />
                    <label htmlFor={'list-element-' + props.id}>
                        <span className="description">{props.title}</span>
                        <span className="created">created {formatDistanceToNow(props.date, { addSuffix: true })}</span>
                    </label>
                    <button
                        className="icon icon-edit"
                        onClick={props.onEdited}></button>
                    <button
                        className="icon icon-destroy"
                        onClick={this.props.onDeleted}></button>
                </div>

                {props.isEditing ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        props.saveNewTitle(props.id, this.state.title);
                        props.closeEditField(props.id);
                    }}>
                        <input type="text" className="edit" value={this.state.title} onChange={this.onChangeTitle} />
                    </form>
                ) : null}
            </li>
        );
    }
}

