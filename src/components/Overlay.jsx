import React, { Component } from "react";
import DownloadsPage from "./DownloadsPage";

class Overlay extends Component {

	constructor(props) {
		super(props);
		this.closeOverlay = this.closeOverlay.bind(this);
	}

	closeOverlay() {
		this.props.closeOverlay();
	}

	render() {
		return (
			<div className="overlay">
				<a href="#" className="close" onClick={this.closeOverlay}></a>
				<div className="overlay-content">
					<DownloadsPage data={this.props.data} />
				</div>
			</div>
		);
	}
}

export default Overlay;