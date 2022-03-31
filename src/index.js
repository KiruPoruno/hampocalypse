const fs = require("fs");
const path = require("path");
let images = fs.readdirSync(__dirname + "/images");

function between(max, min) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function random() {
	if (between(5, 1) == 1) {
		return true;
	}
}

function getName() {
	let str = "ham";
	if (random()) {str = str.replaceAll("", " ")}
	if (random()) {str = str.replaceAll("", " ")}
	if (random()) {str = str.replaceAll("", " ")}
	if (random()) {str = str.replaceAll("", "-")}
	if (random()) {str = str.replaceAll("", "_")}

	return str;
}; console.log(getName())

function getImage() {
	let image = images[Math.floor(Math.random() * images.length)];
	return {
		filename: image,
		path: __dirname + "/images/" + image,
	}
}

function haminate(dir) {
	fs.mkdirSync(dir, {recursive: true});

	let img = getImage();
	fs.copyFileSync(img.path, path.join(dir,  between(99999999999999, 999999) + getName() + img.filename))
}; haminate("example-folder")
