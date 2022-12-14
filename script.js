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
let currentFilter = 'all';

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

function setRandomId() {
    return Math.round(Math.random() * 100000000)
}

function setToLocalStorage() {
    localStorage.setItem('todoItems', JSON.stringify(toDoList))
}

function addTodoItem() {

    const newId = setRandomId()

    if (addTodo.value.trim()) {
        let newTodoItem = {
            todo: addTodo.value.trim(),
            done: false,
            id: +newId,
            editMode: false
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
        displayTodoItem += !item.editMode ?
            `<li class="${item.done ? 'completed' : ''}" id=${item.id}>
                <div class="view">
                    <input type="checkbox" class="toggle" id='item_${index}' ${item.done && 'checked'}>
                    <label>${item.todo}</label>
                    <button data-action="delete" class="destroy"></button>
                </div>
            </li>`
            :
            `<li id=${item.id}>
                <input class="edit" type="text" value=${item.todo}>
            </li>`
        todoItems.innerHTML = displayTodoItem
    })
    //todoItems.insertAdjacentHTML('beforeend', displayTodoItem) пока не работает
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
    switch (filter) {
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

function deleteItem(event) {
    if (event.target.dataset.action === 'delete') {
        const parentNodeId = event.target.closest('li').id
        toDoList = toDoList.filter(item => item.id !== +parentNodeId)
        setToLocalStorage()
        displayTodoItems()
        displayItemsLeft()
    }
}

function toggleDone(event) {
    if (event.target.className === "toggle") {
        const parentNodeId = event.target.closest('li').id
        toDoList.forEach(function (item) {
            if (item.id === +parentNodeId) {
                item.done = !item.done
                setToLocalStorage()
                displayTodoItems()
                displayItemsLeft()
                setTogglerChecked()
            }
        })
    }
}

function editModeOn(event) {
    if (event.target.tagName === 'LABEL') {
        const parentNodeId = event.target.closest('li').id
        //basic way
        //const item = toDoList.find(el => el.id === +parentNodeId)
        //item.editMode = true
        //until editModeOff is not ready
        //toDoList = toDoList.map(el => el.id === +parentNodeId ? {...el, editMode: true} : {...el, editMode: false})
        displayTodoItems()
    }
}

function editModeOff(event) {
    if (event.target.className === 'INPUT') {

    } else {
        toDoList.map(item => !item.editMode)
        displayTodoItems()
    }
}

//event listeners
/*todoItems.addEventListener('change', function (event) {
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
})*/
//old version for (for='item_${index}') label property

todoItems.addEventListener('click', deleteItem)
todoItems.addEventListener('click', toggleDone)
todoItems.addEventListener('dblclick', editModeOn)
window.addEventListener('click', ()=> {
    console.log('click')}    )

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