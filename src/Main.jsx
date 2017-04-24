import React, { Component } from "react";
import Title from "./components/Title";
import UserForm from "./components/Userform";
import DownloadsPage from "./components/DownloadsPage";
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
		this.newSearch = this.newSearch.bind(this);
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
				data : results
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
				<DownloadsPage data={this.state.data}/>
			);
		}else{
			return null;
		}
	}

	newSearch(){
		this.setState({
			errorOccured : false
		});
	}

	render() {
		return (
			<div className="holder">
				<div className="landing">
					<Title title="Github Downloads" />
					<UserForm resListener={this.resultListener} newSearch={this.newSearch}/>
					{this.showErrorMessage()}
				</div>
				{this.getTable()}
			</div>
		);
	}
}

export default Main;