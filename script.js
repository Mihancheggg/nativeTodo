//variables
let addTodo = document.querySelector('.add-todo');
let toggle = document.getElementById('toggle-all');
let clearButton = document.getElementById('clearButton');
let toDoList = [];
let todoItems = document.querySelector('.todoItems');

//functions

function addTodoItem() {
    if (addTodo.value) {
        let newTodoItem = {
            todo: addTodo.value,
            done: false
        };

        toDoList.push(newTodoItem);
        displayTodoItems();
        localStorage.setItem('todoItems',JSON.stringify(toDoList))
        addTodo.value = ''
    }
}

function displayTodoItems() {
    let displayTodoItem = ''
    toDoList.forEach(function (item, index) {
        displayTodoItem += `
        <li>
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
addTodo.addEventListener('blur', addTodoItem)
toggle.addEventListener('click', () => {
})