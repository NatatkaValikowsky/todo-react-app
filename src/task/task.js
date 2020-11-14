import React, {Component} from 'react';
import {formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component{

    constructor(props) {
        super(props);

        this.onCheckedItem = () => {
            this.setState(({isCompleted}) => ({
                isCompleted: !isCompleted
            }));
        }
    }

    render() {
        const props = this.props;

        return (
            <li key={props.id} className={props.isCompleted ? 'completed' : props.isEditing ? 'editing' : ''}>
                <div className="view">
                    <input
                        id={'list-element-' + props.id}
                        className="toggle"
                        type="checkbox"
                        onChange={this.props.onSetCompleted}
                        checked={props.isCompleted}/>
                    <label htmlFor={'list-element-' + props.id}>
                        <span className="description">{props.title}</span>
                        <span className="created">created {formatDistanceToNow(props.date, { addSuffix: true })}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button
                        className="icon icon-destroy"
                        onClick={this.props.onDeleted}></button>
                </div>

                {props.isEditing ? <input type="text" className="edit" value="Editing task" /> : null}
            </li>
        );
    }
}
