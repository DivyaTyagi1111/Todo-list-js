const todo_input = document.querySelector('.todo-input');
const todo_btn = document.querySelector('.todo-button');
const todo_list = document.querySelector('.todo-list');
const todo_filter = document.querySelector('.todo-filter')

document.addEventListener('DOMContentLoaded', loadTodos);
todo_btn.addEventListener('click', add_todo);
todo_list.addEventListener('click', del_check_todo);
todo_filter.addEventListener('change', filter_todo);

function createTodo(input){
    //Create div element
    const todo_div = document.createElement('div')
    todo_div.classList.add('todo-div')
    //Create new todo
    const todo_item = document.createElement('li')
    todo_item.innerText = input;
    todo_item.classList.add('todo-item')
    todo_div.appendChild(todo_item)
    //Create checked button
    const todo_check_btn = document.createElement('button')
    todo_check_btn.innerHTML = '<i class="fas fa-check"></i>'
    todo_check_btn.classList.add('checked')
    todo_div.appendChild(todo_check_btn)
    //Create delete button
    const todo_del_btn = document.createElement('button')
    todo_del_btn.innerHTML = '<i class="fas fa-trash"></i>'
    todo_del_btn.classList.add('deleted')
    todo_div.appendChild(todo_del_btn)
    //Append div to list
    todo_list.appendChild(todo_div)
}

function add_todo(e){
    //Prevent default behavior
    e.preventDefault();
    if (todo_input.value !== ''){
        createTodo(todo_input.value);
        //Add todo to local storage
        saveLocalTodos(todo_input.value);
        //Clear input
        todo_input.value = '';
    }
}

function del_check_todo(e){
    const item = e.target;
    const todo =  item.parentElement;

    //Delete todo
    if(item.classList[0] === 'deleted'){
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();    
        });
    }
    if(item.classList[0] === 'checked')
        todo.classList.toggle('completed');
}

function filter_todo(e){
    const todos = todo_list.childNodes;
    console.log(e.target.value);
    todos.forEach(function(todo){
        console.log(todo.classList);
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                if(todo.classList.contains('completed'))
                    todo.style.display = 'flex'
                else
                    todo.style.display = 'none'
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed'))
                    todo.style.display = 'flex'
                else
                    todo.style.display = 'none'
                break;
        }
    })
}


// Local storage
function getLocalTodos(){
    var todos;
    if(localStorage.getItem('todos') == null)
        todos = [];
    else
        todos = JSON.parse(localStorage.getItem('todos'))
    return todos;
}

function saveLocalTodos(todo){
    var todos = getLocalTodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function loadTodos(){
    var todos = getLocalTodos();   
    todos.forEach(function(todo){
        createTodo(todo);
    })   
}

function removeLocalTodos(todo){
    var todos = getLocalTodos();   
    const todoIndex = todo.children[0].innerText;
    console.log(todoIndex);
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


const suggest = document.getElementById('todo-suggestions')
const inp = document.querySelector('input')
inp.addEventListener("focus", () => {
    const todos = getLocalTodos()
    if (todos.length !== suggest.childElementCount){
        suggest.innerHTML = ''
        todos.forEach(todo => {
            const opt = document.createElement('option');
            opt.value = todo;
            suggest.appendChild(opt);
        });
    }
})


