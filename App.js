const myForm = document.querySelector('.myForm');
const listContainer = document.querySelector('.listContainer');

// event listeners
window.addEventListener('DOMContentLoaded', () => renderList());
myForm.addEventListener('submit', (e) => handleSubmit(e));
listContainer.addEventListener('click', (e) => removeFromLocalStorage(e));

// render list
const renderList = () => {
	const items = JSON.parse(localStorage.getItem('list'));
	let list = '';
	console.log(items.length);

	for (let i = 0; i < items.length; i++) {
		list += `
	    <div class="container-item" id="${items[i].id}">
	        <p>${items[i].value}</p>
            <i class="fa-solid fa-pen-to-square"></i>
	        <i class="fa-solid fa-trash"></i>
	    </div>`;
	}

	listContainer.innerHTML = list;
};

// functions
const handleSubmit = (e) => {
	e.preventDefault();

	const value = document.querySelector('#list').value;
	const id = new Date().getTime();
	if (value === '') {
		alert('Defina um item!');
	} else {
		console.log('item foi alocado!');
		addToLocalStorage(id, value);
	}
};

// LOCAL STORAGE
const addToLocalStorage = (id, value) => {
	const listItems = { id, value };
	let items = getLocalStorage();

	items.push(listItems);
	console.log(listItems);
	console.log(items);
	localStorage.setItem('list', JSON.stringify(items));
	renderList()
};

const removeFromLocalStorage = (e) => {
	// Get element id and class
	const id = e.target.parentElement.id;
	const target = e.target.classList;

	// Get the local Storage Items
	let items = getLocalStorage();

	// Remove item clicked
	if (target.contains('fa-trash')) {
		items = items.filter((item) => {
			if (item.id != id) {
				return item;
			}
		});
	}

	// Set new local store
	localStorage.setItem('list', JSON.stringify(items));
	console.log('deletado');
	renderList()
};

const getLocalStorage = () => {
	return localStorage.getItem('list')
		? JSON.parse(localStorage.getItem('list'))
		: [];
};
