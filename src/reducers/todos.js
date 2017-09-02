import { findIndex } from 'lodash';

const defaultState = { todos: [] };

let index = 0;

export default function results (state = defaultState, action) {
	switch (action.type) {
	case 'ADD_TODO':
		return {
			...state,
			todos: [
				...state.todos,
				{
					completed: false,
					created: Date.now(),
					id: Date.now(),
					listID: action.value.listID,
					text: action.value.text,
					updated: Date.now()
				}
			]
		};
	case 'UPDATE_TODO':
		const updatedTodos = state.todos.map((todo) => {
			if(todo.id === action.value.id){
				return Object.assign({}, todo, {...action.value});
			} else {
				return todo;
			}
		});

		return {
			...state,
			todos: updatedTodos
		};
	case 'DELETE_TODO':
		index = findIndex(state.todos, (list) => list.id === action.value.id);
		console.log(index);
		console.log(state.todos);
		return {
			...state,
			todos: [
				...state.todos.slice(0, index),
				...state.todos.slice(index + 1)
			]
		};
	case 'COMPLETE_TODO':
		const newTodos = state.todos.map((todo) => {
			if(todo.id === action.value.id){
				return Object.assign({}, todo, { completed: action.value.completed });
			} else {
				return todo;
			}
		});
		return {
			...state,
			todos: newTodos
		};

	default:
		return state;
	}
}