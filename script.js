const inputContainer = document.getElementById('text');
const addBtn = document.getElementById('addBtn');
const editBtn = document.getElementById('editBtn');
const listContainer = document.querySelector('.to-do-list-container');

function createEle(event) {
    const item = document.createElement(event.item);
    item.setAttribute('class', event.attr);
    if (event.text) {
        item.textContent = event.text;
    }
    return item
}

function addToDoItem() {
    try {
        if (inputContainer.value) {
            const listItem = createEle({
                item: 'li',
                attr: 'list-item'
            })

            const actions = createEle({
                item: 'div',
                attr: 'actions',
            })
            const editBtn = createEle({
                item: 'button',
                attr: 'edit',
                text: 'Edit'
            })
            const deleteBtn = createEle({
                item: 'button',
                attr: 'delete',
                text: 'Delete'
            })

            const textContent = createEle({
                item: 'span',
                attr: 'text-container',
                text: inputContainer.value
            })

            actions.append(editBtn)
            actions.append(deleteBtn)
            listItem.append(textContent)
            listItem.append(actions);

            listContainer.append(listItem);
            inputContainer.value = ''
            editBtn.addEventListener('click', function(event) {
                editItem(event)
            })
            deleteBtn.addEventListener('click', function(event) {
                deleteItem(event)
            })
            inputContainer.style.borderColor = '#ddd'
        } else if (inputContainer.value === '') {
            inputContainer.style.borderColor = 'red'
        }

    } catch (error) {
        console.log(error)
    }
}

let targetElement = ''

function editItem(event) {
    addBtn.hidden = true;
    editBtn.hidden = false;
    targetElement = event.target.parentElement.parentElement;
    const ItemText = targetElement.querySelector('.text-container')
    inputContainer.value = ItemText.textContent;

}

function deleteItem(event) {
    const currentItem = event.target.parentElement.parentElement;
    currentItem.remove();
}
editBtn.addEventListener('click', function() {
    if (targetElement.querySelector('.text-container').textContent == inputContainer.value) {
        inputContainer.style.borderColor = 'red'
        return
    } else {
        addBtn.hidden = false;
        editBtn.hidden = true;
        targetElement.querySelector('.text-container').textContent = inputContainer.value;
        inputContainer.value = '';
        inputContainer.style.borderColor = '#ddd'
    }

})
document.addEventListener('keypress', function(event) {
    if (event.key == 'Enter') {
        addToDoItem();
    }
})

addBtn.addEventListener('click', function() {
    addToDoItem()
})