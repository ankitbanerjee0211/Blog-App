const content = document.getElementById('content');
const form1 = document.getElementById('form1');

function formatDoc(cmd, value=null) {
	if(value) {
		document.execCommand(cmd, false, value);
	} else {
		document.execCommand(cmd);
	}
}

function addLink() {
	const url = prompt('Insert url');
	formatDoc('createLink', url);
}

// resetText

function resetText() {
	content.innerHTML = "Start your blog here....";
}


content.addEventListener('mouseenter', function () {
	const a = content.querySelectorAll('a');
	a.forEach(item => {
		item.addEventListener('mouseenter', function () {
			content.setAttribute('contenteditable', false);
			item.target = '_blank';
		})
		item.addEventListener('mouseleave', function () {
			content.setAttribute('contenteditable', true);
		})
	})
})
