import React, { Component } from "react";

class DownloadsPage extends Component {

	constructor(props) {
		super(props);
		this.getView = this.getView.bind(this);
	}

	defineRows(assets) {
		return assets.map((asset,index) => {
			return (
				<tr key={index}>
					<td>{asset.name}</td>
					<td>{asset.downloads}</td>
				</tr>
			);
		});
	}

	getView() {
		if (this.props.data.length !== 0) {
			return this.props.data.map((project) => {
				return (
					<div className="projectBox" key={project.name}>
						<h1>{project.name}</h1>
						<table>
							<tbody>
								<tr>
									<th>Asset</th>
									<th>Downloads</th>
								</tr>
								{this.defineRows(project.assets)}
							</tbody>
						</table>
					</div>
				);
			});
		} else {
			return (
				<div className="projectBox">
					<h1>No projects have assets.</h1>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				{this.getView()}
			</div>
		);
	}
}

export default DownloadsPage;