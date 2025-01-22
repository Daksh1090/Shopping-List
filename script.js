// Elements Select
const userInput = document.querySelector("#item-input");
const form = document.querySelector('#item-form');
const itemList = document.querySelector('#item-list')
const clearBtn = document.getElementById('clear')
const filter = document.querySelector('.filter')
const textFilter = document.getElementById('filter')


function displayContent() {
    const itemsFormStorage = getElementFromLocal();
    itemsFormStorage.forEach(item => {
        addElementToDom(item);
        CheckUI()
    })
}

function addItem(event) {

    event.preventDefault();
    const inputList = userInput.value;
    if (inputList === '') {
        alert("please enter value")
        return
    }

    addElementToDom(inputList)
    addItemTOLocal(inputList)
    CheckUI()

    userInput.value = '';
}

function addElementToDom(item) {

    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))

    // call createbtn
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add DOM LIST
    itemList.appendChild(li)
}

function addItemTOLocal(items) {
    let ListFormLocal = getElementFromLocal()
    ListFormLocal.push(items)
    localStorage.setItem('items', JSON.stringify(ListFormLocal))
}

function getElementFromLocal() {
    let ListFormLocal;
    if (localStorage.getItem('items') === null) {
        ListFormLocal = [];
    } else {
        ListFormLocal = JSON.parse(localStorage.getItem('items'))
    }
    return ListFormLocal;
}

//Button Create Function
function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon)
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes;
    return icon;
}

function OnClickRemove(e) {
    if (e.target.parentElement.classList.contains("remove-item")) {
        removeItem(e.target.parentElement.parentElement)
    }
}
function removeItem(item) {
    if (confirm('Are You sure?')) {
        item.remove();
        removeItemsFromLocal(item.textContent);
    }
}

function removeItemsFromLocal(item) {
    let itemsFromLocal = getElementFromLocal();
    itemsFromLocal = itemsFromLocal.filter(i => i !== item)
    localStorage.setItem('items', JSON.stringify(itemsFromLocal))

    CheckUI()
}

function cleareItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    localStorage.removeItem('items')
    CheckUI()
}

function CheckUI() {
    const item = itemList.querySelectorAll('li')
    if (item.length === 0) {
        filter.style.display = 'none'
        clearBtn.style.display = 'none'
    } else {
        filter.style.display = 'block'
        clearBtn.style.display = 'block'
    }
}

function filterItems(e) {
    const item = itemList.querySelectorAll('li')
    const inpValue = e.target.value.toLowerCase();
    item.forEach(item => {
        const firstchild = item.firstChild.textContent.toLowerCase();
        if (firstchild.indexOf(inpValue) != -1) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })

}


CheckUI();

//event Listners
form.addEventListener('submit', addItem);
itemList.addEventListener('click', OnClickRemove)
clearBtn.addEventListener('click', cleareItems)
textFilter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayContent)
