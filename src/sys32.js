// filesystem

var hdd = {
	"root": {
		type:"dir",
		"home": {
			type:"dir",
			"Documents": {
				type:"dir",
				"JavaScript": {
					type:"dir",
					"helloworld.js": {
						type:"file",
						format:"javascript",
						content:"alert('Hello, World!')"
					}
				},
				"Homework": {
					type:"dir",
					"passwords.txt": {
						type:"file",
						format:"text",
						content:"HA! YOU'VE JUST GOT PRANKED!"
					},
					"pornos.mp4.txt": {
						type:"file",
						format:"text",
						content:"HA! THIS IS not A VIRUS!"
					}
				}
			},
			"Videos": {
				type:"dir"
			},
			"Photos": {
				type:"dir"
			}
		},
		"usr": {
			type:"dir"
		}
	}
}
var loc = ["root"];
var curdir = hdd["root"];

// bin

function isAtRoot() {
	// if loc is set to root
	if (loc.length == 1 && loc[0] == "root")
		return true;
	else
		return false;
}

function dir() {
	// get cd query
	let query = document.getElementById("cd");
	let navto = query.value;

	// go up on ..
	if (navto == "..") {
		if (!isAtRoot())
			loc.pop();
	} else {
		loc.push(navto);
	}

	// Empty Query field
	query.value = "";

	// validator variable
	let x = true;
	// while location in tree is not a directory
	do {
		// reset navigation to hdd
		let navving = "hdd";
		// foreach selected location in tree, cd there
		loc.forEach(folder => {
			navving += `["${folder}"]`;
		});
		// string to object
		curdir = eval(navving);

		if (!curdir) {
			// if undefined, remove last cd
			loc.pop();
		} else if (curdir.type == "dir") {
			// if at directory, quit
			x = false;
		} else if (curdir.type == "file") {
			// if at file, open and remove last cd
			openFile(curdir);
			loc.pop();
		}
	} while (x)
}

function openFile() {
	if (curdir.format == "text") {
		// if file format is text, echo contents
		alert(`TEXT FILE: ${curdir.content}`);
	} else if (curdir.format == "javascript") {
		// if file format is javascript, run contents
		eval(curdir.content);
	}
}

function writeFile(type = "file", format = "text") {
	if (type == "folder") {
		// get directory name
		const dirname = document.getElementById("directory");

		// if no directory name, abort
		if (!dirname.value == "") {
			// reset navigation to hdd
			let navving = "hdd";
			// foreach selected location in tree, cd there
			loc.forEach(folder => {
				navving += `["${folder}"]`;
			});
			// create new directory at end of tree
			navving += `["${dirname.value}"] = { type:"dir" }`;
	
			// string to code
			eval(navving);
	
			// clear query
			dirname.value = "";
		}
	} else if (type == "file") {
		// get filename & content
		const content = document.getElementById("content");
		const filename = document.getElementById("filename");

		// if no filename/content, abort
		if (!(content.value == "" && filename.value == "")) {
			// reset navigation to hdd
			let navving = "hdd";
			// foreach selected location in tree, cd there
			loc.forEach(folder => {
				navving += `["${folder}"]`;
			});
			// create new file at end of tree
			navving += `["${filename.value}.txt"] = { type:"file", format:format, content:"${content.value}" }`;

			// string to code
			eval(navving);

			// clear querys
			content.value = "";
			filename.value = "";
		}
	}
}

function delFile(type = "file") {
	if (type == "folder") {
		const dirname = document.getElementById("directory2");

		if (!dirname.value == "" && confirm(`Delete "${dirname.value}"?`)) {
			let navving = "hdd";
			loc.forEach(folder => {
				navving += `["${folder}"]`;
			});
			navving += `["${dirname.value}"]`;
	
			eval(`delete ${navving}`);
	
			dirname.value = "";
		}
	} else if (type == "file") {
		const filename = document.getElementById("file");

		if (!filename.value == "" && confirm(`Delete "${filename.value}"?`)) {
			let navving = "hdd";
			loc.forEach(folder => {
				navving += `["${folder}"]`;
			});
			navving += `["${filename.value}"]`;
	
			eval(`delete ${navving}`);
	
			filename.value = "";
		}
	}
}

function updateDisplays() {
	let navving = "hdd";
	loc.forEach(folder => {
		navving += `["${folder}"]`;
	});
	curdir = eval(navving);

	const breadcrumbs = document.getElementById("breadcrumbs");
	const dirdisplay = document.getElementById("dir");

	breadcrumbs.innerHTML = loc.join("/");
	breadcrumbs.innerHTML += "/";

	let files = Object.getOwnPropertyNames(curdir); files.shift();

	let types = [];
	files.forEach(file => {
		types.push(curdir[file].type);
	});

	dirdisplay.innerHTML = `${files.length} Files<br><br>\n`;
	for (let i = 0; i < files.length; i++) {
		dirdisplay.innerHTML += `${types[i].toUpperCase()} ${files[i]}<br>\n`;
	}
}

// misc

function cdto() {
	dir();
	updateDisplays();

	return false;
}

function mkdir() {
	writeFile("folder");
	updateDisplays();

	return false;
}

function echo() {
	writeFile("file");
	updateDisplays();

	return false;
}

function rmdir() {
	delFile("folder");
	updateDisplays();

	return false;
}

function del() {
	delFile("file");
	updateDisplays();

	return false;
}