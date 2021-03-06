

// Define UI Variables
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load Event Listenrers

loadEventListeners();

function loadEventListeners(){
    // document content loaded event to load all tasks//
    document.addEventListener('DOMContentLoaded', getTasks())
    // add task event
    form.addEventListener('submit', addTask);
    // add remove event listener
    taskList.addEventListener('click', removeTask);

    //add fitler task
    filter.addEventListener('keyup',filterTask);

    //add clear task Event

    clearBtn.addEventListener('click', clearTask);


}

//get tasks
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];

    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(task){
            //create a task list element
            const li = document.createElement('li');
            //add class
            li.className = "collection-item";
            //append text to link(task)
            li.appendChild(document.createTextNode(task));
            //create a link element
            const link = document.createElement('a');
            //add class to link
            link.className = "delete-item secondary-content";
            link.innerHTML = `<i class="fa fa-remove"></i>`
            //append to li
            li.appendChild(link);
            //append to the parent ul element

            taskList.appendChild(li);

        })


    }
}


//Adding Task
function addTask(e){
    //check if input is blank
    if (taskInput.value === ''){
        alert("Add a task");
    }

    //create an li element
    const li = document.createElement('li');
    li.className = "collection-item";

    //create and append text node

    li.appendChild(document.createTextNode(taskInput.value));

    //create a new link

    const link = document.createElement('a');
    // add class to link
    link.className = 'delete-item secondary-content';

    //add icon element

    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);


    //store task in local storage

    storeTaskInLocalStorage(taskInput.value);


    //clear input
    taskInput.value = '';
    e.preventDefault();
}


//function to store task in local storage

function storeTaskInLocalStorage(task){
    let tasks;

    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Remove Taks function

function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure you want to delete the task?")){
                e.target.parentElement.parentElement.remove();
                //remove from local Storage
                removeFromLocalStorage(e.target.parentElement.parentElement);
        }

    }
}

//function to remove from local storage
function removeFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks')=== null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }

    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//clear task

function clearTask(){
    if(confirm("Are you sure you want to clear the tasks?")){
        while (taskList.firstChild) {

                taskList.firstChild.remove();

        }
         clearTasksFromLocalStorage();
    }



}

//Function clear task from storage

function clearTasksFromLocalStorage(){
    localStorage.clear();
}
//filter tasks

function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';

                } else {
                task.style.display = 'none';
                }
        }
    )


    }
