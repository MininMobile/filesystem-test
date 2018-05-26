// filesystem

var loc = ["root"];
var hdd = {
	"root": {
		type:dir,
		"home": {
			type:dir,
			"Documents": {
				type:dir,
				"JavaScript": {
					type:dir,
					"helloworld.js": {
						type:file,
						format:javascript,
						content:"alert('Hello, World!')"
					}
				},
				"Homework": {
					type:dir,
					"passwords.txt": {
						type:file,
						format:text,
						content:"HA! YOU'VE JUST GOT PRANKED!"
					},
					"pornos.mp4.txt": {
						type:file,
						format:text,
						content:"HA! THIS IS not A VIRUS!"
					}
				}
			},
			"Videos": {
				type:dir
			},
			"Photos": {
				type:dir
			}
		},
		"usr": {
			type:dir
		}
	}
}

// bin

var curdir = {};

function dir() {
	let navto = document.getElementById("query").value;
	let navving = "hdd";

	var x = true;
	do {
		try {
			navving = "hdd";
			location.forEach(folder => {
				navving += `["${folder}"]`;
			});
			curdir = eval(navving);

			if (curdir) x = false;
		} catch (e) {
			loc.pop();
		}
	} while (x)
}

function updateDisplays() {
	const breadcrumbs = document.getElementById("breadcrumbs");
	const dirdisplay = document.getElementById("dir");

	breadcrumbs.innerHTML = loc.join("/");
	breadcrumbs.innerHTML += "/";
}

// misc

function navigate() {
	dir();
	updateDisplays();

	return false;
}