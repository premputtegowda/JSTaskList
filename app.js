

// Define UI Variables
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load Event Listenrers

loadEventListeners();

function loadEventListeners(){
    // add task event
    form.addEventListener('submit', addTask);
    // add remove event listener
    taskList.addEventListener('click', removeTask);

    //add fitler task
    filter.addEventListener('keyup',filterTask);

    //add clear task Event

    clearBtn.addEventListener('click', clearTask);


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

    //clear input
    taskInput.value = '';
    e.preventDefault();
}


//Remove Taks function

function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure you want to delete the task?")){
                e.target.parentElement.parentElement.remove();
        }

    }
}


//clear task

function clearTask(e){

    while (taskList.firstChild) {

            taskList.firstChild.remove();

    }
    e.preventDefault();
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
