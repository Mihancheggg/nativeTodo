/*
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
            const todoItem = document.createElement('li')
            todoItem.setAttribute('id', `${item.id}`);
            todoItem.setAttribute('class', item.completed ? 'completed' : '');
            const view = document.createElement('div')
            view.setAttribute('class', 'view');
            const check = document.createElement('input');
            check.setAttribute('class', 'toggle');
            check.setAttribute('type', 'checkbox');
            check.setAttribute('id', `item_${index}`);
            check.setAttribute('checked', item.done);
            const name = document.createElement('label');
            name.setAttribute('for', `item_${index}`);
            name.innerHTML = `${item.todo}`;
            const button = document.createElement('button');
            button.setAttribute('class', 'destroy');
            button.setAttribute('id', `${item.id}`);

            todoItems.appendChild(todoItem);
            todoItem.appendChild(view);
            view.appendChild(check);
            view.appendChild(name);
            view.appendChild(button);

            button.addEventListener('click', (event) => deleteItem(event))
        }
    );
    displayItemsLeft();
}*/
