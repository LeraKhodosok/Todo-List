//дата
let date = new Date();
const d = document.querySelector('.day');
const m = document.querySelector('.month');
const y = document.querySelector('.year');
const w = document.querySelector('.week');

//окно для добавления записи
const new_item = document.querySelector('.new_item');
const popup = document.querySelector('.modal');
const main = document.querySelector('.main');
//кнопки для добавления/удаления
const cancel = document.querySelector('.cancel');


//input для записи
const inputElement = document.querySelector('.add_input');


//дата
let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let week = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

d.innerHTML = date.getDate().toString();
m.innerHTML = month[date.getMonth().toString()]
y.innerHTML = date.getFullYear().toString();
w.innerHTML = week[date.getDay().toString()];

//вычеркивание записи

function checkParent(element, parent) {
    return element.closest(parent);
}

const list = document.querySelector('.list_wraper');
const edit = document.querySelector('.edit')
const cancelEdit = document.querySelector('.cancel_edit');

const editInput = document.querySelector('.edit_input');

cancelEdit.addEventListener('click', () => {
    edit.classList.add('hide');
    edit.classList.remove('active');
    main.classList.remove('active');
    errorEdit.classList.remove('active');
});

let spanForEdit;

//окно с добавлением записи

new_item.addEventListener('click', () => {
    popup.classList.add('active');
    main.classList.add('active');
    popup.classList.remove('hide');
    error.classList.remove('active');
})

cancel.addEventListener('click', () => {
    main.classList.remove('active');
    popup.classList.add('hide');
    popup.classList.remove('active');
    error.classList.remove('active');
});

const addInput = document.querySelector('input');

let todos = [];

function addTodo(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            text: item,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);

        addInput.value = '';

        main.classList.remove('active');
        popup.classList.add('hide');
        popup.classList.remove('active');
        clearInput(inputElement);
    }
}

function renderTodos(todos) {
    list.innerHTML = '';

    todos.forEach(function(item) {

        const item1 = document.createElement('div');
        item1.classList.add('list-item');
        item1.setAttribute('data-key', item.id);

        const title = document.createElement('span');
        title.innerText = item.text;

        const controls = document.createElement('div');
        controls.classList.add('controls');

        const rewriteBtn = document.createElement('i');
        rewriteBtn.classList.add('fa');
        rewriteBtn.classList.add('fa-pencil');

        const deleteBtn = document.createElement('i');
        deleteBtn.classList.add('fa');
        deleteBtn.classList.add('fa-trash-o');

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('check');

        item1.appendChild(title);
        controls.appendChild(rewriteBtn);
        controls.appendChild(deleteBtn);
        controls.appendChild(checkbox);
        item1.appendChild(controls);

        list.appendChild(item1);

        if (item.completed === true) {
            checkbox.checked = true;
            title.classList.add('active');
        }
    });
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function toggle(id) {
    todos.forEach(function(item) {
        if (+item.id === +id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function(item) {
        return +item.id !== +id;
    });

    addToLocalStorage(todos);
}

function editTodo (text, id) {
    todos.forEach(function(item) {
        if (+item.id === +id) {
            item.text = text;
        }
    });

    addToLocalStorage(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

const error = document.querySelector('.error');

//кнопка для добавления новой записи
const addByInput = document.querySelector('.add_btn');

addByInput.addEventListener('click', () => {
    addTodo(inputElement.value);
    errorInput(inputElement);
});

function errorInput (text) {
    if (text.value == '') {
        error.classList.add('active');
    } else {
        error.classList.remove('active');
    }
}

getFromLocalStorage();

list.addEventListener('click', (e) => {
    if (checkParent(e.target, '.controls')) {
        if (e.target.classList.contains('check')) {
            toggle(e.target.parentElement.parentElement.dataset.key);
        } else if (e.target.classList.contains('fa-trash-o')) {
            deleteTodo(e.target.parentElement.parentElement.dataset.key);
        } else {
            edit.classList.add('active');
            edit.classList.remove('hide');
            main.classList.add('active');
            spanForEdit = e.target.parentElement.previousElementSibling;
            editInput.value = spanForEdit.innerText;
        }
    }
})

//очистка input
function clearInput(text) {
    text.value = '';
}

//клик вне popUp

document.addEventListener('click', (e) => {
    let click = e.target;
    if (!checkParent(click, '.modal') && !click.classList.contains('new_item') && !click.classList.contains('fa-pencil')) {
        popup.classList.remove('active');
        edit.classList.remove('active');
        main.classList.remove('active');
    }
});

const editBtn = document.querySelector('.edit_btn');
const errorEdit = document.querySelector('.edit_error');

editBtn.addEventListener('click', () => {

   if (editInput.value === '') {
       errorEdit.classList.add('active');
   } else {
       editTodo(editInput.value, spanForEdit.parentElement.dataset.key);
       spanForEdit.innerText = editInput.value;
       errorEdit.classList.remove('active');
       edit.classList.add('hide');
       main.classList.remove('active');
   }
});

const deleteItem = document.querySelector('.delete_list');

deleteItem.addEventListener('click', () => {
    list.innerHTML = '';
    localStorage.clear();
    todos = [];
})



