// Elements Select
const userInput = document.querySelector("#item-input");
const form = document.querySelector('#item-form');
const itemList = document.querySelector('#item-list')


// const listArr = []

function addItem (event) {

    event.preventDefault()

    const inputList = userInput.value;
    if(inputList === ''){
        alert("please enter value")
        return
    }

    // Create Elements
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(inputList))

    // call createbtn
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li)

    userInput.value = '';
}

//Button Create Function
function createButton(classes){

    const button = document.createElement('button')
    button.className = classes

    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon)

    return button;
}

function createIcon(classes){
    
    const icon = document.createElement('i')
    icon.className = classes;

    return icon;
}


//event Listners
form.addEventListener('submit', addItem);