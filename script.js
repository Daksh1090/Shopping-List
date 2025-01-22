// Elements Select
const userInput = document.querySelector("#item-input");
const form = document.querySelector('#item-form');
const itemList = document.querySelector('#item-list')
const clearBtn = document.getElementById('clear')
const filter = document.getElementById('filter')


// const listArr = []

function addItem (event) {

    event.preventDefault();

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

    // Add DOM LIST
    itemList.appendChild(li)
    CheckUI()
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

function removeItem(e){
  if (e.target.parentElement.classList.contains("remove-item")){
      e.target.parentElement.parentElement.remove()
      CheckUI()
  }
}

function cleareItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }
    CheckUI()
    
}

function CheckUI(){
    const item = itemList.querySelectorAll('li')
    if(item.length === 0){
        filter.style.display = 'none'
        clearBtn.style.display = 'none'
    }else{
        filter.style.display = 'block'
        clearBtn.style.display = 'block'
    }
}

CheckUI()

//event Listners
form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', cleareItems)
