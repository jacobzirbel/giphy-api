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
		button.onclick = () => showGifs(e);
		buttonsCol.appendChild(button);
	});
	topRow.insertBefore(buttonsCol, document.getElementById("new-item-input"));
};

let showGifs = async (item) => {
	let gifData = await getGifs(item);
	let gifRow = document.createElement("div");
	gifRow.setAttribute("class", "row gif-row");
	let gifCol = document.createElement("div");
	gifCol.setAttribute("class", "col-md-12");
	gifData.forEach((e) => {
		let imgHolder = document.createElement("span");
		imgHolder.setAttribute("class", "img-holder");
		imgHolder.onclick = (event) =>
			(event.target.src = gifClick(event.target.src));
		let title = document.createElement("p");
		title.textContent = "Rating: " + e.rating;
		let img = document.createElement("img");
		img.setAttribute("src", e.url);
		imgHolder.append(title, img);
		gifRow.appendChild(imgHolder);
	});

	gifRow.appendChild(gifCol);
	if (document.getElementsByClassName("gif-row")[0]) {
		container.removeChild(document.getElementsByClassName("gif-row")[0]);
	}
	container.appendChild(gifRow);
};
let gifClick = (src) => {
	return src.match(/^.*[0-9]{3}/g) + (/s.gif$/g.test(src) ? ".gif" : "_s.gif");
};
let getGifs = async (item) => {
	let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${sensitive.apiKey}&q=${item}&limit=10&offset=0&rating=pg&lang=en`;
	let res = await apiGetRequest(queryURL);
	console.log(res);
	return res.data.map((e) => {
		return {
			title: e.title,
			url: `https://media3.giphy.com/media/${e.id}/200.gif`,
			rating: e.rating,
		};
	});
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
