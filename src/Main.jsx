import React, { Component } from "react";
import Title from "./components/Title";
import UserForm from "./components/Userform";
import Overlay from "./components/Overlay";

class Main extends Component {


	constructor() {
		super();
		this.state = {
			hasResults: false,
			errorOccured: false
		};
		this.showErrorMessage = this.showErrorMessage.bind(this);
		this.resultListener = this.resultListener.bind(this);
		this.showOverlay = this.showOverlay.bind(this);
		this.newSearch = this.newSearch.bind(this);
		this.closeOverlay = this.closeOverlay.bind(this);
	}

	resultListener(err, results) {
		console.log(results);
		if (err) {
			this.setState({
				errorOccured: true
			});
		} else {
			this.setState({
				hasResults: true,
				data: results
			});
		}
	}

	showErrorMessage() {
		if (this.state.errorOccured) {
			return <p className="errormsg">No such user or repository.</p>;
		}
		return null;
	}

	closeOverlay(){
		this.setState({
			hasResults : false
		});
	}

	showOverlay() {
		if (this.state.hasResults) {
			return (
				<Overlay data={this.state.data} closeOverlay={this.closeOverlay}/>
			);
		} else {
			return null;
		}
	}

	newSearch() {
		this.setState({
			errorOccured: false
		});
	}

	render() {
		return (
			<div className="holder">
				<div className="landing">
					<Title title="Github Downloads" />
					<UserForm resListener={this.resultListener} newSearch={this.newSearch} />
					{this.showErrorMessage()}
				</div>
				{this.showOverlay()}
			</div>
		);
	}
}

export default Main;