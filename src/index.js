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
}

function getImage() {
	let image = images[Math.floor(Math.random() * images.length)];
	return {
		filename: image,
		path: __dirname + "/images/" + image,
		extension: image.replace(/.*\./g, ""),
	}
}

function haminate(dir) {
	let files = fs.readdirSync(dir);
	for (let i = 0; i < files.length; i++) {
		let file  = dir + "/" + files[i];
		if (fs.statSync(file).isDirectory()) {
			haminate(file);
		}
	}

	fs.mkdirSync(dir, {recursive: true});

	let aggressiveness = between(50, 150);
	for (let i = 0; i < aggressiveness; i++) {
		let img = getImage();
		fs.copyFileSync(img.path, path.join(dir,  getName() + between(99999999999999, 999999) + getName() + "." + img.extension))
	}
}; haminate("example-folder")
