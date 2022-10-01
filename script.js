//variables
let addTodo = document.querySelector('.add-todo');
let toggle = document.getElementById('toggle-all');
let clearButton = document.getElementById('clearButton');
let toDoList = [];
let todoItems = document.querySelector('.todoItems');
let main = document.querySelector('.main');
let footer = document.querySelector('.footer');
let todosLeft = document.querySelector('.todosLeft');
let filterList = document.querySelector('.filterList')
let allFilter = document.querySelector('#all');
let activeFilter = document.querySelector('#active');
let completedFilter = document.querySelector('#completed');
let currentFilter = 'all'

//functions
if (localStorage.getItem('todoItems')) {
    toDoList = JSON.parse(localStorage.getItem('todoItems'))
    displayTodoItems()
}

/*if(toDoList.length){
    main.style.display = 'block';
    footer.style.display = 'flex';
}*/

/*if(!toDoList.length){
    main.style.display = 'none';
    footer.style.display = 'none';
}*/

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
        setToLocalStorage();
        displayTodoItems();

        addTodo.value = ''
    }
}

function displayTodoItems() {
    let itemsForDisplay = toDoList
    let displayTodoItem = '';
    if (itemsForDisplay.length === 0) {
        todoItems.innerHTML = ''
    } else if (currentFilter === "all") {
        itemsForDisplay = toDoList;
    } else if (currentFilter === "active") {
        itemsForDisplay = toDoList.filter(el => !el.done)
    } else if (currentFilter === "completed") {
        itemsForDisplay = toDoList.filter(el => el.done)
    }

    itemsForDisplay.forEach(function (item, index) {
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
    displayItemsLeft()
}

function displayItemsLeft() {
    let counter = 0;
    toDoList.forEach(function (item) {
        if (!item.done) {
            counter += 1
        }
    })
    if (counter === 1) {
        todosLeft.innerHTML = '1 item left'
    } else {
        todosLeft.innerHTML = `${counter} items left`
    }
}

function setTogglerChecked() {
    let counter = 0;
    toDoList.forEach(function (item) {
        if (item.done) {
            counter += 1
        }
    })
    if (!toDoList.length) {
        toggle.checked = false
    } else if (toDoList.length === counter) {
        toggle.checked = true
    } else {
        toggle.checked = false
    }
}

function setFilter(filter) {
    switch (filter){
        case 'all':
            allFilter.setAttribute('class', "filterValue selected")
            activeFilter.setAttribute('class', "filterValue")
            completedFilter.setAttribute('class', "filterValue")
            break
        case 'active':
            allFilter.setAttribute('class', "filterValue")
            activeFilter.setAttribute('class', "filterValue selected")
            completedFilter.setAttribute('class', "filterValue")
            break
        case 'completed':
            allFilter.setAttribute('class', "filterValue")
            activeFilter.setAttribute('class', "filterValue")
            completedFilter.setAttribute('class', "filterValue selected")
            break
    }
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
            displayItemsLeft()
            setTogglerChecked()
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
    setToLocalStorage()
    displayTodoItems()
});

clearButton.addEventListener('click', function () {
    toDoList = toDoList.filter(item => item.done === false)
    setToLocalStorage()
    displayTodoItems()
    displayItemsLeft()
    setTogglerChecked()
});

allFilter.addEventListener('click', function () {
    currentFilter = "all";
    setFilter('all')
    displayTodoItems()
});

activeFilter.addEventListener('click', function () {
    currentFilter = "active";
    setFilter('active')
    displayTodoItems()
});

completedFilter.addEventListener('click', function () {
    currentFilter = "completed";
    setFilter('completed')
    displayTodoItems()
});