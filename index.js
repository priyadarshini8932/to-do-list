const taskList = document.getElementById("task-list");
const taskEl = document.getElementById("task");
const btn = document.getElementById("btn");

let task = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(task));
}

function createTask(taskObj){

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("custom-checkbox");

    const cross = document.createElement("span");
    cross.textContent = "x";
    cross.classList.add("cross");

    const textVal = document.createElement("span");
    textVal.textContent = taskObj.text;

    const textContainer = document.createElement("div");
    textContainer.classList.add("task-list");

    textContainer.appendChild(checkbox);
    textContainer.appendChild(textVal);
    textContainer.appendChild(cross);

    taskList.appendChild(textContainer);

    // restore completed state after refresh
    if(taskObj.completed){
        checkbox.checked = true;
        textVal.style.textDecoration = "line-through";
        textVal.style.color = "grey";
    }

    function updateTaskUI(){

        if(checkbox.checked){
            textVal.style.textDecoration = "line-through";
            textVal.style.color = "grey";
        }
        else{
            textVal.style.textDecoration = "none";
            textVal.style.color = "black";
        }

        // update localStorage data
        taskObj.completed = checkbox.checked;
        saveTasks();
    }

    // click on text
    textVal.addEventListener("click", function(){

        checkbox.checked = !checkbox.checked;

        updateTaskUI();
    });

    // click on checkbox
    checkbox.addEventListener("click", function(){

        updateTaskUI();
    });

    // delete task
    cross.addEventListener("click", function(){

        textContainer.remove();

        task = task.filter(function(t){
            return t !== taskObj;
        });

        saveTasks();
    });
}

// load tasks after refresh
task.forEach(function(taskObj){

    createTask(taskObj);
});

// add new task
btn.addEventListener("click", function(){

    if(taskEl.value.trim() !== ""){

        const taskObj = {
            text: taskEl.value,
            completed: false
        };

        task.push(taskObj);

        saveTasks();

        createTask(taskObj);

        taskEl.value = "";
    }
});