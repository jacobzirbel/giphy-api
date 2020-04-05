window.onload = () => initialSetup();

let items = "cat,dog,fish,deer,bird,cat,dog,fish,deer,bird,cat,dog,fish,deer,bird,cat,dog,fish,deer,bird,cat,dog,fish,deer,bird".split(
		","
	),
	apiKey = sensitive.apiKey,
	container,
	topRow;

let initialSetup = () => {
	container = document.getElementsByClassName("container")[0];
	topRow = document.createElement("div");
	let inputF = document.createElement("div");
	inputF.setAttribute("class", "col-md-3  ml-2 mr-1");
	inputF.setAttribute("id", "new-item-input");
	let title = document.createElement("h6");
	title.textContent = "Add a search term";
	let textField = document.createElement("INPUT");
	textField.setAttribute("type", "text");
	let submitButton = document.createElement("INPUT");
	submitButton.setAttribute("type", "submit");
	submitButton.setAttribute("class", "mt-2 btn-secondary");
	inputF.append(title, textField, submitButton);
	topRow.appendChild(inputF);
	container.appendChild(topRow);
	topRow.setAttribute("class", "row");
	generateButtons(items);
};
let generateButtons = (items) => {
	let buttonsCol = document.createElement("div");
	buttonsCol.setAttribute("class", "col-md-8 buttons");
	items.forEach((e) => {
		let button = document.createElement("button");
		button.setAttribute("class", "btn btn-primary");
		button.textContent = e;
		button.onclick = () => getGifs(e);
		buttonsCol.appendChild(button);
	});
	topRow.insertBefore(buttonsCol, document.getElementById("new-item-input"));
};

let getGifs = async (item) => {
	let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${sensitive.apiKey}&q=${item}&limit=10&offset=0&rating=G&lang=en`;
	let res = await apiGetRequest(queryURL);
	console.log(res);
};

let addSearchTerm = () => {
	return true;
};

let apiGetRequest = (queryURL) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", queryURL);
		xhr.onload = function () {
			if (xhr.status === 200) {
				resolve(JSON.parse(xhr.responseText));
			} else {
				alert("Request failed.  Returned status of " + xhr.status);
			}
		};
		xhr.send();
	});
};
