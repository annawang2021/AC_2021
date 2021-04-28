// 初始變數
let my_todo = document.querySelector('#my-todo');
let addBtn = document.querySelector('#addBtn');
let input = document.querySelector('#newTodo');
let my_done = document.querySelector('#my_done');
let main = document.querySelector('main');

// 資料
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
    addItem(todo)
}

// 函式 
function addItem(text) {
	let newItem = document.createElement('li')
    newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
    my_todo.appendChild(newItem)
}

// block invalid value 
function inputCheck() {
    let inputValue = input.value;
    
    if (!inputValue) {
        // input.classList.add("invalid", "change");
        input.placeholder = "This blank is required";
        
    } else {
        addItem(inputValue);
        // input.classList.remove("invalid", "change");
        input.value = "";
        input.placeholder = "add item";
    }
}

// Add item
addBtn.addEventListener("click", inputCheck);

// press enter to add new value
input.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        inputCheck();
    }
})

// Delete and check
main.addEventListener('click', function(event) {
    let target = event.target
    let parentElement = target.parentElement
   
    if (target.classList.contains('delete')) {
        parentElement.remove()
        
    } else if (target.tagName === 'LABEL') {
        target.classList.toggle('checked');
        let newLi = document.createElement("li");
        newLi.innerHTML = parentElement.innerHTML;
        parentElement.remove();
        
        if (target.classList.contains("checked")) {
            my_done.appendChild(newLi);
            
        } else {
            my_todo.appendChild(newLi);
        }
    }
})
