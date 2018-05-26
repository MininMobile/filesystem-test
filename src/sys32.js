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
	if (loc.length == 1 && loc[0] == "root")
		return true;
	else
		return false;
}

function dir() {
	let navto = document.getElementById("query").value;

	if (navto == "..") {
		if (!isAtRoot())
			loc.pop();
	} else {
		loc.push(navto);
	}

	let x = true;
	do {
		let navving = "hdd";
		loc.forEach(folder => {
			navving += `["${folder}"]`;
		});
		curdir = eval(navving);

		if (!curdir) {
			loc.pop();
		} else if (curdir.type == "dir") {
			x = false;
		} else if (curdir.type == "file") {
			openFile(curdir);
			loc.pop();
		}
	} while (x)
}

function updateDisplays() {
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

function navigate() {
	dir();
	updateDisplays();

	return false;
}