import React, { Component } from "react";
import Title from "./components/Title";
import UserForm from "./components/Userform";

class Main extends Component {


	constructor() {
		super();
		this.state = {
			hasResults: false,
			errorOccured: false
		};
		this.showErrorMessage = this.showErrorMessage.bind(this);
		this.resultListener = this.resultListener.bind(this);
		this.getTable = this.getTable.bind(this);
	}

	resultListener(err, results) {
		if (err) {
			this.setState({
				errorOccured: true
			});
		} else {
			this.setState({
				hasResults: true
			});
		}
	}

	showErrorMessage() {
		if (this.state.errorOccured) {
			return <Title title="No such User or Repository" />;
		}
		return null;
	}

	getTable() {
		if (this.state.hasResults) {
			return (
				<div>
					<h1>Poop</h1>
				</div>
			);
		}else{
			return null;
		}
	}

	render() {
		return (
			<div className="holder">
				<div className="landing">
					<Title title="Github Downloads" />
					<UserForm resListener={this.resultListener} />
					{this.showErrorMessage()}
				</div>
				{this.getTable()}
			</div>
		);
	}
}

export default Main;