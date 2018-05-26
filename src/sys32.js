var location = ["root"];
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