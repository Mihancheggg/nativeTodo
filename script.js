//variables
let addTodo = document.querySelector('.add-todo');
let toggle = document.getElementById('toggle-all');
let clearButton = document.getElementById('clearButton');
let toDoList = [];
let todoItems = document.querySelector('.todoItems');

//functions
if (localStorage.getItem('todoItems')) {
    toDoList = JSON.parse(localStorage.getItem('todoItems'))
    displayTodoItems()
}

function setToLocalStorage() {
    localStorage.setItem('todoItems', JSON.stringify(toDoList))
}

function addTodoItem() {
    if (addTodo.value) {
        let newTodoItem = {
            todo: addTodo.value,
            done: false
        };

        toDoList.push(newTodoItem);
        displayTodoItems();
        setToLocalStorage()
        addTodo.value = ''
    }
}

function displayTodoItems() {
    let displayTodoItem = '';
    if (toDoList.length === 0) {
        todoItems.innerHTML = ''
    }
    toDoList.forEach(function (item, index) {
        displayTodoItem += `
        <li class="${item.done ? 'completed' : ''}">
            <div class="view">
                <input type="checkbox" class="toggle" id='item_${index}' ${item.done && 'checked'}>
                <label for='item_${index}'>${item.todo}</label>
                <button class="destroy"></button>
            </div>
        </li>
        `
        todoItems.innerHTML = displayTodoItem
    })
}

//event listeners
todoItems.addEventListener('change', function (event) {
    let todoItemID = event.target.getAttribute('id')
    let forItemLabel = document.querySelector('[for=' + todoItemID + ']')
    let labelValue = forItemLabel.innerHTML
    toDoList.forEach(function (item) {
        if (item.todo === labelValue) {
            item.done = !item.done
            setToLocalStorage()
            displayTodoItems()
        }
    })
})
addTodo.addEventListener('blur', addTodoItem)
addTodo.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        addTodoItem()
    }
})

toggle.addEventListener('click', () => {
    let isDoneArr = [];
    toDoList.forEach(function (item) {
        isDoneArr.push(item.done)
    })
    if (isDoneArr.includes(false)) {
        toDoList.forEach(function (item) {
            item.done = true
        })
    } else {
        toDoList.forEach(function (item) {
            item.done = false
        })
    }
    displayTodoItems()
})