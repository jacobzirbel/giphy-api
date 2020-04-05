let items = "cat,dog,fish,deer,bird,cat,dog,fish,deer,bird,cat,dog,fish,deer,bird,cat,dog,fish,deer,bird,cat,dog,fish,deer,bird,cat,dog,fish,deer,bird,".split(
	","
);
let container = document.getElementsByClassName("container")[0];
let generateButtons = (items) => {
	let buttonsContainer = document
		.createElement("div")
		.setAttribute("class", "container buttons");
	let row;
	items.forEach((e, i, a) => {
		if (i % 6 === 0) {
			row = document.createElement("div");
			row.setAttribute("class", "row justify-content-start");
		}
		let button = document.createElement("button");
		button.setAttribute("class", "col-md-2 btn btn-primary");
		button.textContent = e;
		button.onclick = () => getGifs(e);
		row.appendChild(button);
		if (i % 6 === 0 || i === a.length - 1) {
			container.appendChild(row);
		}
	});
};

let getGifs = (item) => {
	console.log(item);
};
generateButtons(items);
