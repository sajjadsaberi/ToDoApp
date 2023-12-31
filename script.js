const taskInput = document.getElementById("task-input") ;
const dateInput = document.getElementById("date-input") ;
const addButton = document.getElementById("add-button") ;
const editButton = document.getElementById("edit-button") ;
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");
const filterButtons = document.querySelectorAll(".filter-todos") ;



let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const generateId = () => {
    return Math.round(Math.random() * Math.random() * Math.pow(10,15)).toString();
};

const showAlert = (message, type) => {
    alertMessage.innerHTML = "";
    const alert = document.createElement("p") ;
    alert.innerText = message ;
    alert.classList.add("alert") ;
    alert.classList.add(`alert-${type}`); 
    alertMessage.append(alert) ;

    setTimeout(() => {
        alert.style.display = "none" ;
    }, 2000);
};

const displayToDos = (data) => {
    const todoList = data ? data : todos ;
        todosBody.innerHTML = "" ;
    if(!todoList.length) {
        todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!</td></tr>";
        return ;
    };
    todoList.forEach((todo) => {
        todosBody.innerHTML += `
            <tr>
                <td>${todo.task}</td>
                <td>${todo.date || "No Date"}</td>
                <td>${todo.completed ? "Completed" : "Pending"}</td>
                <td>
                    <button onclick="editHandler('${todo.id}')">Edit</button>
                    <button onclick="toggleHandler('${todo.id}')">${todo.completed ? "Undo" : "Do"}</button>
                    <button onclick="deleteHandler('${todo.id}')">Delete</button>
                </td>
            </tr>
        `
    });
};

const addHandler = () => {
    const task = taskInput.value ;
    const date = dateInput.value ;
    const todo =  {
        id: generateId(),
        task: task,
        date: date,
        completed: false,
    };
    if(task !== "") {
        todos.push(todo) ;
        saveToLocalStorage() ;
        displayToDos() ;
        taskInput.value = "" ;
        dateInput.value = "" ;
        showAlert("Todo Added Successfully", "success")
    } else {
        showAlert("Please Enter a ToDo!", "error") ;
    }
};

const deleteAllHandler = () => {
    if (todos.length) {
        todos = [] ;
        saveToLocalStorage();
        displayToDos() ;
        showAlert("All ToDos Cleared Successfully !", "success");
    } else {
        showAlert("NO Todos To Cleared", "error") ;
    }

};

//add delete button

const deleteHandler = (id)=> {
    const newTodos = todos.filter(todo => todo.id !== id);
    todos = newTodos ;
    saveToLocalStorage() ;
    displayToDos() ;
    showAlert("ToDo Deleted Successfully", "success");
};

// add toggle

const toggleHandler = (id) => {
    const newTodos = todos.map(todo => {
        if(todo.id === id) {
            return {
            id: todo.id,
            task: todo.task,
            date: todo.date,
            completed: !todo.completed
            };
        } else {
            return todo ;
        }
    });
    todos = newTodos;
    saveToLocalStorage() ;
    displayToDos();
    showAlert("Todo Status Changed Successfully", "success");
};

const editHandler = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    taskInput.value = todo.task ;
    dateInput.value = todo.date ;
    addButton.style.display = "none" ;
    editButton.style.display = "inline-block";
    editButton.dataset.id = id ;
};

const applyEditHandler = event => {
    const id = event.target.dataset.id ;
    const todo = todos.find((todo) => todo.id === id );
    todo.task = taskInput.value ;
    todo.date = dateInput.value;
    taskInput.value = "" ;
    dateInput.value = "" ;
    addButton.style.display = "inline-block";
    editButton.style.display = "none" ;
    saveToLocalStorage();
    displayToDos();
    showAlert("Todo Edited is Successfully!", "success" );
};

const filterHandler = (event) => {
    let filteredTodos= null ;
    const filter = event.target.dataset.filter ;
    switch (filter) {
        case "pending" :
            filteredTodos = todos.filter((todo) => todo.completed === false);
            break;
        case "completed" :
            filteredTodos = todos.filter((todo) => todo.completed === true);
            break;

        default:
            filteredTodos = todos ;
        break;
    }
    displayToDos(filteredTodos) ;
};

window.addEventListener("load", () => displayToDos());
addButton.addEventListener("click", addHandler) ;
deleteAllButton.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", applyEditHandler);
filterButtons.forEach((button) => {
    button.addEventListener("click", filterHandler) ;
});


//end Project - By Sajjad saberi