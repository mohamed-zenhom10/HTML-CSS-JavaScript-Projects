const task = document.getElementById("task");

const add = document.getElementById("add");
const clear = document.getElementById("clear");

const tasks = document.getElementById("tasks");

window.onload = () => {
    task.focus();
}



function addTask() {
    if(task.value === "") {
        alert("Please Fill The Text Feild");
        return;
    }

    const theTask = document.createElement("div");
    theTask.id = "theTask";

    const paragraph = document.createElement("p");
    paragraph.id = "p";
    paragraph.innerHTML = task.value;

    const taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.id = "task-check";
    
    taskCheck.addEventListener("change", () => {
        if (taskCheck.checked) {
            paragraph.style.textDecoration = "line-through";
        } else {
            paragraph.style.textDecoration = "none";
        }
    });

    theTask.appendChild(taskCheck);
    theTask.appendChild(paragraph);
    tasks.appendChild(theTask);
    task.value = "";
    task.focus();
}


function clearAll() {
    tasks.innerHTML = "";
}

add.addEventListener("click" , addTask);
clear.addEventListener("click" , clearAll);