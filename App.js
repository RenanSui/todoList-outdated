// Selecting Elements
const myForm = document.querySelector('.myForm');
const listContainer = document.querySelector('.container');
const clearItems = document.querySelector('.clear');
const itemsFooter = document.querySelector('.itemsFooter');
const myFormEdit = document.querySelector('.myFormEdit');
const alertBox = document.querySelector('.alertBox');

// global variables
let editID = '';

// event listeners
window.addEventListener('DOMContentLoaded', () => renderList());
window.addEventListener('click', (e) => handleCircle(e));
myForm.addEventListener('submit', (e) => handleSubmit(e));
listContainer.addEventListener('click', (e) => handleRemove(e));
clearItems.addEventListener('click', () => clearAllItems());
myFormEdit.addEventListener('submit', (e) => handleEditSubmit(e));

// render list
const renderList = () => {
	const items = JSON.parse(localStorage.getItem('list'));
	let list = '';
	let itemQuantity = 0;

	// iterate through the Local storage
	for (let i = 0; i < items.length; i++) {
		list += `
		<!-- Start of single item-->
	    <div class="container-item">
		<!--<i class="fa-regular fa-circle-check checkItem"></i>-->
		<div class="circle">
			<div class="list-options" id="${items[i].id}">
			<!--<i class="fa-solid fa-square-check"></i>-->
				<i class="fa-solid fa-pen-to-square"></i>
				<i class="fa-solid fa-trash"></i>
			</div>
		</div>
	    <p>${items[i].value}</p>
	    </div>
		<!-- End of single item-->`;

		itemQuantity++;
	}

	// render list on the HTML
	listContainer.innerHTML = list;

	// render items quantity on the footer
	itemsFooter.innerHTML = `${itemQuantity} items`;
};

// LOCAL STORAGE

const handleRemove = (e) => {
	// Get element id and classes
	const id = e.target.parentElement.id;
	const target = e.target.classList;

	// Get local Storage Items
	let items = getLocalStorage();

	// *****TARGET EVENT LISTENERS*****
	// Remove item clicked
	if (target.contains('fa-trash')) {
		removeFromLocalStorage(id, items);
	}

	// Update item clicked
	if (target.contains('fa-pen-to-square')) {
		// hide list options
		const listOptions = document.getElementById(`${id}`).classList;
		listOptions.remove('list-options-display-block');

		// show edit form
		myForm.classList.add('myFormDisplayNone');
		myFormEdit.classList.add('myFormEditDisplayBlock');
		editID = id;
	}
};

const addToLocalStorage = (id, value) => {
	const listItems = { id, value };
	let items = getLocalStorage();

	items.push(listItems);
	localStorage.setItem('list', JSON.stringify(items));
	renderList();
};

const removeFromLocalStorage = (id, list) => {
	let newList = list.filter((item) => {
		if (item.id != id) {
			return item;
		}
	});
	// Set new local Store
	newLocalStore(newList);

	// alert
	const alertText = 'Item deleted!';
	const alertClass = 'alertDanger';
	handleAlert(alertText, alertClass);
};

const updateFromLocalStorage = (id, value) => {
	let items = getLocalStorage();

	items = items.map((item) => {
		if (item.id == id) {
			item.value = value;
		}
		return item;
	});
	localStorage.setItem('list', JSON.stringify(items));
	renderList();
};

const getLocalStorage = () => {
	// return the current list
	return localStorage.getItem('list')
		? JSON.parse(localStorage.getItem('list'))
		: [];
};

const handleCircle = (e) => {
	const target = e.target.classList;

	// Show circle options
	if (target.contains('circle')) {
		const id = e.target.childNodes[1].id;
		const listOptions = document.getElementById(`${id}`).classList;
		listOptions.toggle('list-options-display-block');
	}

	// Hide circle options
	if (target.contains('fa-square-check')) {
		const id = e.target.parentElement.id;
		const listOptions = document.getElementById(`${id}`).classList;
		listOptions.remove('list-options-display-block');
	}

	// Show circle check
	// if (target.contains('fa-square-check')) {
	// 	const id = e.target.parentElement.id;
	// 	const circle = document.getElementById(`${id}`).parentElement
	// 		.previousElementSibling;
	// 	circle.classList.add('checkItemDisplay');
	// }

	// Hide circle check
	if (target.contains('fa-circle-check')) {
		const id = e.target.nextElementSibling.childNodes[1].id;
		const checkItem = document.getElementById(`${id}`).parentElement
			.previousElementSibling;
		checkItem.classList.remove('checkItemDisplay');
	}
};

const clearAllItems = () => {
	let items = [];
	localStorage.setItem('list', JSON.stringify(items));
	renderList();
};

const newLocalStore = (items) => {
	localStorage.setItem('list', JSON.stringify(items));
	renderList();
};

const handleSubmit = (e) => {
	e.preventDefault();

	// Sending data to the local storage
	const value = document.querySelector('#list').value;
	const id = new Date().getTime();
	if (value === '') {
		// alert
		const alertText = 'Type something!';
		const alertClass = 'alertWarning';
		handleAlert(alertText, alertClass);
	} else {
		addToLocalStorage(id, value);
		// alert
		const alertText = 'Item added!';
		const alertClass = 'alertAdded';
		handleAlert(alertText, alertClass);
	}

	// Clear input field
	const input = document.querySelector('#list');
	input.value = '';
};

const handleEditSubmit = (e) => {
	e.preventDefault();

	// Editing data
	const value = document.querySelector('#listEdit').value;

	if (value === '') {
		// alert
		const alertText = 'Type something!';
		const alertClass = 'alertDanger';
		handleAlert(alertText, alertClass);
	} else {
		updateFromLocalStorage(editID, value);

		// alert
		const alertText = 'Item edited!';
		const alertClass = 'alertEdited';
		handleAlert(alertText, alertClass);

		// hide edit form
		myForm.classList.remove('myFormDisplayNone');
		myFormEdit.classList.remove('myFormEditDisplayBlock');
	}

	// Clear input field
	const input = document.querySelector('#listEdit');
	input.value = '';
};

const handleAlert = (alertText, alertClass) => {
	// show alert box
	alertBox.classList.add('alertBoxDisplay');
	alertBox.classList.add(alertClass);
	alertBox.innerText = alertText;

	// hide alert box
	setTimeout(() => {
		alertBox.classList.remove('alertBoxDisplay');
		alertBox.classList.remove(alertClass);
		alertBox.innerText = '';
	}, 3 * 1000);
};
