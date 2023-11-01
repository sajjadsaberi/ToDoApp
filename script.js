const taskInput = document.getElementById("task-input") ;
const dateInput = document.getElementById("date-input") ;
const addButton = document.getElementById("add-button") ;
const alertMessage = document.getElementById("alert-message") ;

const todos = [] ;

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

const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
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
        taskInput.value = "" ;
        dateInput.value = "" ;
        console.log(todos) ;
        showAlert("Todo Added Successfully", "success")
    } else {
        showAlert("Please Enter a ToDo!", "error") ;
    }
};

addButton.addEventListener("click", addHandler) ;