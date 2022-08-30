// Selecting Elements
const myForm = document.querySelector('.myForm');
const listContainer = document.querySelector('.container');

// event listeners
window.addEventListener('DOMContentLoaded', () => renderList());
myForm.addEventListener('submit', (e) => handleSubmit(e));
listContainer.addEventListener('click', (e) => removeFromLocalStorage(e));

// render list
const renderList = () => {
	const items = JSON.parse(localStorage.getItem('list'));
	let list = '';

	// iterate through the Local storage
	for (let i = 0; i < items.length; i++) {
		list += `
		<!-- Start of single item-->
	    <div class="container-item" id="${items[i].id}">
		<i class="fa-solid fa-circle-check"></i>
	        <p>${items[i].value}</p>
            <i class="fa-solid fa-pen-to-square"></i>
	        <i class="fa-solid fa-trash"></i>
	    </div>
		<!-- End of single item-->`;
	}

	// Change circle check color
	window.addEventListener('click', (e) => {
		if (e.target.classList.contains('fa-circle-check')) {
			document.querySelector('.fa-circle-check').classList.toggle('red');
			console.log('circle check alterado');
		}
	});

	// render list on the HTML
	listContainer.innerHTML = list;
};

// functions
const handleSubmit = (e) => {
	e.preventDefault();

	// Sending data to the local storage
	const value = document.querySelector('#list').value;
	const id = new Date().getTime();
	if (value === '') {
		alert('Defina um item!');
	} else {
		console.log('item foi alocado!');
		addToLocalStorage(id, value);
	}

	// Clear input field
	const input = document.querySelector('#list')
	input.value = ''
};

// LOCAL STORAGE
const addToLocalStorage = (id, value) => {
	const listItems = { id, value };
	let items = getLocalStorage();

	items.push(listItems);
	console.log(listItems);
	console.log(items);
	localStorage.setItem('list', JSON.stringify(items));
	renderList();
};

const removeFromLocalStorage = (e) => {
	// Get element id and class
	const id = e.target.parentElement.id;
	const target = e.target.classList;

	// Get the local Storage Items
	let items = getLocalStorage();

	// ***TARGET EVENT LISTENERS***
	// Remove item clicked
	if (target.contains('fa-trash')) {
		items = items.filter((item) => {
			if (item.id != id) {
				return item;
			}
		});
		console.log('item deletado!');
	}
	// Update item clicked
	if (target.contains('fa-pen-to-square')) {
		console.log('item alterado!');
	}

	// Set new local store
	localStorage.setItem('list', JSON.stringify(items));
	renderList();
};

const getLocalStorage = () => {
	// return the current list
	return localStorage.getItem('list')
		? JSON.parse(localStorage.getItem('list'))
		: [];
};
