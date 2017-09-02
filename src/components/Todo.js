import { addTodo, deleteTodo, updateTodo, completeTodo, setUpdating } from './../actions';


import React from 'react';
import { connect } from 'react-redux';

class Todo extends React.Component {
	
	saveAttributes (event) {
		event.preventDefault();
		this.props.saveAttributes();
	}
	deleteTodo = (event) => {
		event.preventDefault();
		this.props.deleteTodo({id: this.props.id});
	}
	updateTodo = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			this.props.updateTodo({
				id: this.props.id,
				listID: this.props.listID,
				text: event.target.value,
				updating: false
			});
		}

	}
	editTodo = (event) => {
		event.preventDefault();
		this.props.updateTodo({ id:this.props.id, listID: this.props.listID, updating: true });
	}
	completeTodo = (event) => {
		const props = this.props;
		this.props.completeTodo({ listID: props.listID, id: props.id, completed: !props.completed });
	}
	render () {
		console.log(this.props);
		const classes = this.props.completed && !this.props.updating ? 'form-check-label strikethrough': 'form-check-label'
		return (
			<li className="list-group-item px-sm-2 py-sm-1">
				<div className="row justify-content-center">
					<div className="col-12">
						<div className="form-check">
						  <label className={classes}>
						    <input className="form-check-input" onChange={this.completeTodo} type="checkbox" value={this.props.completed} />
								{this.props.updating ? 
									<input type="text"  className="form-control" defaultValue={this.props.text} onKeyUp={this.updateTodo} title="Type new text and press Enter" />
									: this.props.text}    
						  </label>
						</div>
					</div>
					<div className="col-12">
						<i className="fa fa-trash-o pull-right" onClick={this.deleteTodo} />
						{
							this.props.updating || this.props.completed ? 
							<i className="fa fa-pencil-square-o pull-right" disabled style={{ cursor:'not-allowed' }} />
							:
							<i className="fa fa-pencil-square-o pull-right" onClick={this.editTodo} />
						}
					</div>
				</div>
			</li>
		);
	}
}

const mapStateToProps = (state) => state.todos;

const mapDispatchToProps = {
	addTodo,
	deleteTodo,
	completeTodo,
	updateTodo,
	setUpdating

};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);