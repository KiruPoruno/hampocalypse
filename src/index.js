const fs = require("fs");
const path = require("path");
const log = require("ez-log").out;

let images = fs.readdirSync(__dirname + "/images");

function between(max, min) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function random() {
	if (between(5, 1) == 1) {
		return true;
	}
}

async function copy(source, target) {
    const writeFileStream = fs.createWriteStream(target);
    const readFileStream = fs.createReadStream(source).pipe(writeFileStream);

    return new Promise(function(resolve, reject) {
        writeFileStream.on("finish", resolve);
        readFileStream.on("error", reject);
    });
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
	fs.mkdirSync(dir, {recursive: true});

	log(":: haminating: " + dir)

	let files = fs.readdirSync(dir);
	for (let i = 0; i < files.length; i++) {
		let file  = dir + "/" + files[i];
		if (fs.statSync(file).isDirectory()) {
			haminate(file);
		}
	}


	let aggressiveness = between(50, 150);
	for (let i = 0; i < aggressiveness; i++) {
		let img = getImage();
		switch(between(2, 0)) {
			case 0:
				copy(img.path, path.join(dir,  getName() + between(99999999999999, 999999) + getName() + "." + img.extension));
				break;
			case 1:
				let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
				chars = chars.split("").sort(() => Math.random() - 0.5).join("");
				chars = chars.slice(0, between(10, chars.length));
				copy(img.path, path.join(dir, chars + "." + img.extension));
				break;
			case 2:
				copy(img.path, path.join(dir,  between(99999999999999, 999999).toString().slice(0, between(5, 15)) + "." + img.extension));
				break;
		}
	}
}

let args = process.argv.splice(2, process.argv.length);
for (let i in args) {
	haminate(args[i]);
}
