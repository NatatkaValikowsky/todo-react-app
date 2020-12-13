import React, { useState } from 'react';

import './app.css';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';

const App = () => {
	const [items, setItems] = useState([
		{ isEditing: false, isCompleted: true, title: 'Completed task', date: new Date(2020, 10, 2) },
		{ isEditing: false, isCompleted: false, title: 'Editing task', date: new Date(2020, 11, 12) },
		{ isEditing: false, isCompleted: false, title: 'Active task', date: new Date(2020, 4, 2) },
	]);
	const [show, setShow] = useState('all');

	const countToDo = items.filter((el) => !el.isCompleted).length;

	const setFiltered = (type) => {
		setShow(type);
	};

	const deleteItem = (id) => {
		setItems((itemsList) => [...itemsList.filter((el) => (el.title + el.date.getTime()) !== id)]);
	};

	const addNewItem = (label) => {
		const date = new Date();
		setItems((itemsList) => [
			...itemsList,
			{
				id: label + date.getTime(),
				isEditing: false,
				isCompleted: false,
				title: label,
				date,
			},
		]);
	};

	const setCompleted = (id) => {
		setItems((itemsList) => [...itemsList.map((el) => ((el.title + el.date.getTime()) === id ? { ...el, isCompleted: !el.isCompleted } : el))]);
	};

	const clearCompleted = () => {
		setItems((itemsList) => [...itemsList.filter((el) => !el.isCompleted)]);
	};

	const setEdited = (id) => {
		setItems((itemsList) => [
			...itemsList.map((el) =>
				(el.title + el.date.getTime()) === id && !el.isCompleted ? { ...el, isEditing: !el.isEditing } : { ...el, isEditing: false }
			),
		]);
	};

	const saveTitle = (id, title) => {
		setItems((itemsList) => [...itemsList.map((el) => ((el.title + el.date.getTime()) === id ? { ...el, title } : el))]);
	};

	return (
		<section className="todoapp">
			<Header onAddItem={addNewItem} />

			<section className="main">
				<TaskList
					items={items}
					filterType={show}
					onDeleted={deleteItem}
					onSetCompleted={setCompleted}
					onEdited={setEdited}
					saveNewTitle={saveTitle}
					closeEditField={setEdited}
				/>

				<Footer
					filterItems={setFiltered}
					filterType={show}
					onClearAllCompleted={clearCompleted}
					countToDo={countToDo}
				/>
			</section>
		</section>
	);
};


export default App;
