var axios = require("axios");

function getDownloads(details, callback) {
	if (details.project !== "") {
		getProjectDownloads(details, callback);
		return;
	}
	var apiStr = `https://api.github.com/users/${details.username}/repos`;
	axios.get(apiStr)
		.then(function (response) {
			getMultiProjectDownloads(response.data, callback);
		})
		.catch(function (error) {
			callback(error);
		});
}

function getProjectDownloads(details, callback) {

	var apiStr = `https://api.github.com/repos/${details.username}/${details.project}/releases`
	axios.get(apiStr)
		.then(function (response) {

			var obj = { name: details.project };
			obj.assets = [];
			response.data.forEach((release) => {

				// for each tag of the project, check if theres an asset
				if (release.assets) {
					release.assets.forEach((asset) => {
						// for each asset of a tag
						obj.assets.push({
							name: asset.name,
							downloads: asset.download_count
						});
					});

				}
			});

			//for similar input to callback add it to array
			var arr = [];
			arr.push(obj);
			callback(undefined, arr);

		})
		.catch(function (error) {
			callback(error);
		});

}

function getMultiProjectDownloads(resp, callback) {

	var downloads = [];
	var count = 0;

	resp.forEach((proj) => {
		//for each project create a obj
		var obj = { name: proj.name };
		var url = proj.releases_url.substr(0, proj.releases_url.length - 5);
		var flag = false;
		//get the releases of the project

		axios.get(url)

			.then((response) => {

				obj.assets = [];
				response.data.forEach((release) => {

					// for each tag of the project, check if theres an asset
					if (release.assets) {
						flag = true;
						release.assets.forEach((asset) => {
							// for each asset of a tag
							obj.assets.push({
								name: asset.name,
								downloads: asset.download_count
							});
						});

					}
				});

				//add it to downloads object
				if (flag)
					downloads.push(obj);

				//when all projects have returned call the callback 
				count += 1;
				if (count === resp.length) {
					callback(undefined, downloads);
				}
			});
	});
}

module.exports = getDownloads;