import React from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';

import List from './List';

class Content extends React.Component {
	saveAttributes (event) {
		event.preventDefault();
		this.props.saveAttributes();
	}
	render () {
		return (
			<div className="container-fluid">
				<div className="row mt-2">
					{
						this.props.lists.map((list, index) =>
						<CSSTransitionGroup
							key={list.id}
		          transitionName="fade"
		          transitionEnterTimeout={1000}
		          transitionLeaveTimeout={1000}
		          transitionAppear={true}
    					transitionAppearTimeout={1000}>
		          {<List key={list.id} {...list} index={index} />}
					 	</CSSTransitionGroup>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state.lists;

export default connect(mapStateToProps, null)(Content);