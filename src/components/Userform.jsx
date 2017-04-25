import React, { Component } from "react";
import getDownloads from "../utils/getDownloads";
// import Loading from "react-loading";

class Userform extends Component {

	constructor(props) {
		super(props);
		this.startSearch = this.startSearch.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
		this.handleProject = this.handleProject.bind(this);
		this.resListener = this.resListener.bind(this);
		this.getButtonText = this.getButtonText.bind(this);
		this.state = { username: "", project: "" , isLoading: false };
	}

	resListener(err,details){
		this.setState({
			isLoading: false
		});
		this.props.resListener(err,details);
	}

	startSearch(event) {
		event.preventDefault();
		if(this.state.isLoading){
			return;
		}
		this.setState({
			isLoading: true
		});
		this.props.newSearch();
		var details = { username: this.state.username, project: this.state.project };
		getDownloads(details, this.resListener);
	}

	handleUsername(event) {
		var input = event.target.value.replace(/[^a-zA-Z0-9]+/g, "");
		this.setState({
			username: input
		});
	}

	handleProject(event) {
		var input = event.target.value.replace(/[^a-zA-Z0-9-]+/g, "");
		this.setState({
			project: input
		});
	}

	getButtonText(){
		if(!this.state.isLoading){
			return "Search";
		}
		return (
			<div className="loader"></div>
		);
	}

	render() {
		return (
			<div className="form">
				<form className="userform" onSubmit={this.startSearch}>
					<input className="userinput username" placeholder="Username" required
						value={this.state.username} onChange={this.handleUsername} />
					<input className="userinput projectname" placeholder="Project (Optional)"
						value={this.state.project} onChange={this.handleProject} />
					<button className="searchbtn">{this.getButtonText()}</button>
				</form>
			</div>
		);
	}
}

export default Userform;