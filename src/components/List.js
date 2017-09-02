import { addTodo, deleteList, updateList } from './../actions';
import React from 'react';
import Todo from './Todo';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';

class List extends React.Component {
	constructor (props) {
		super(props);
		this.state = { edit: false };
	}
	editList () {
		this.setState({ edit: !this.state.edit });
	}
	updateName (event) {
		this.props.updateList({
			id: this.props.id,
			name: event.target.value
		});
	}
	keyUp (event) {
		if (event.key === "Enter") {
			this.setState({ edit: !this.state.edit });
		}
	}
	deleteList (event) {
		event.preventDefault();
		this.props.deleteList(this.props.id);
	}
	addTodo (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			this.props.addTodo({
				listID: this.props.id,
				text: event.target.value
			});
			event.target.value = '';
		}
	}
	render () {
		const todos = this.props.todos.filter((todo) => todo.listID === this.props.id).map((todo) => <Todo key={todo.id} {...todo} />);

		return (
			<div className="list">
				<div className="card mb-md-4">
					<h5 className="card-header">
						{this.state.edit ? (
							<input
								className="form-control"
								onChange={this.updateName.bind(this)}
								onKeyUp={this.keyUp.bind(this)}
								placeholder="List Name"
								type="text"
								value={this.props.name}
							/>
						) : (
							<span onClick={this.editList.bind(this)}>{this.props.name}</span>
						)}
					</h5>
					<div className="card-block p-sm-0">
						<ul className="list-group list-group-flush">
							<CSSTransitionGroup
			          transitionName="fade"
			          transitionEnterTimeout={1000}
			          transitionLeaveTimeout={1000}
			          transitionAppear={true}
      					transitionAppearTimeout={1000}>
								{todos}
							</CSSTransitionGroup>
							<li className="list-group-item px-sm-2 py-sm-1">
								<input
									className="form-control"
									onKeyUp={this.addTodo.bind(this)}
									placeholder="New Todo"
									type="text"
								/>
							</li>
						</ul>
					</div>
					<div className="card-footer text-muted text-right px-sm-2 py-sm-1">
						<a className="card-link" href="#" onClick={this.deleteList.bind(this)}>Delete List</a>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state.todos;

const mapDispatchToProps = {
	addTodo,
	deleteList,
	updateList
};

export default connect(mapStateToProps, mapDispatchToProps)(List);