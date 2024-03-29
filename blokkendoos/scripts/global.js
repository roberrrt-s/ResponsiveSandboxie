console.log('yo')

function dragStart(e) {
	console.log('dragged');
 	e.dataTransfer.setData("text", e.target.classList);
 	e.effectAllowed = "copyMove";
}

function dragOver(e) {
	console.log('over');
	e.currentTarget.style.background = 'lightblue';
	e.preventDefault();
}

function dragLeave(e) {
	console.log('left')
	e.currentTarget.style.background = '';
	e.preventDefault();
}

function dragDrop(e) {
	console.log('ended');

	// Save data from origin in menu
	const type = e.dataTransfer.getData('text');
	const copy = document.querySelector(`#menu .${type}`).cloneNode(true);

	// Copy and append element to section
   	let htmlElement = e.currentTarget.appendChild(copy);
   	htmlElement.querySelector('button').addEventListener('click', removeNode)

   	// Verify if section has sibling
   	e.currentTarget.nextElementSibling ? null : createNewSection()

   	// Reset
	e.currentTarget.style.background = "";
	e.dataTransfer.clearData();
}

function removeNode(e) {
	const section = e.target.parentNode.parentNode
	section.removeChild(e.target.parentNode);
	section.hasChildNodes() && section.nextElementSibling ? console.log('false') : section.parentNode.removeChild(section);
}

function createNewSection() {
	const section = document.createElement('section')

	section.classList.add('drag-target')

	section.addEventListener('dragleave', dragLeave)
	section.addEventListener('dragover', dragOver)
	section.addEventListener('drop', dragDrop)

	document.querySelector('main').appendChild(section)
}

function changeLayout(e) {
	if(e.currentTarget.id === 'vertical') {
		document.body.classList.remove('is-row');
		document.body.classList.remove('is-magic');
	} else if(e.currentTarget.id === 'horizontal') {
		document.body.classList.add('is-row');
		document.body.classList.remove('is-magic');
	} else {
		document.body.classList.remove('is-row');
		document.body.classList.add('is-magic');
	}
}

function init() {
	let articles = document.querySelectorAll('#menu article');
	let sections = document.querySelectorAll('main section');
	let switchers = document.querySelectorAll('#switcher button');

	articles.forEach(article => {
		article.addEventListener('dragstart', dragStart)
	})

	sections.forEach(section => {
		section.addEventListener('dragleave', dragLeave)
		section.addEventListener('dragover', dragOver)
		section.addEventListener('drop', dragDrop)
	})

	switchers.forEach(switcher => {
		switcher.addEventListener('click', changeLayout)
	});
}

init();
