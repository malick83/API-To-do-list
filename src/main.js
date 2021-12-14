let card = _('.carte');
let allCards = _('.mes-cartes')
let button =  _('.test-button')
let addBtn = _('.addBtn')
let taskForm = _('.form-task')
let delButton = __('.bouton-suppression')

let task = {
    title:"brief : algo",
    state:"en cours",
    description:"description de merde",
    deadline:"23/11/23 23:23",
    priority:"faible",
    ended:true
}

renderTasks();

function addTask(newTask){
    let newCard = card.cloneNode(true);
    _('.carte').style.display = 'block';
    _('.carte').setAttribute('id', newTask.id);
    _('.mon-titre h3').innerText = newTask.title;
    _('time').innerText = newTask.deadline;
    _('.mon-titre span').innerHTML = newTask.state;
    _('textarea').innerHTML = newTask.description;
    switch (newTask.priority) {
        case "faible":
            _('.etiquette').style.backgroundColor = "green";
            break;
        case "forte":
            _('.etiquette').style.backgroundColor = "red";
            break;
        case "moyenne":
            _('.etiquette').style.backgroundColor = "yellow";
            break;
        default:
            _('.etiquette').style.backgroundColor = "red";
            break;
    }
    allCards.appendChild(newCard);
}


function getFields(){
    let title = _('.input-title').value;
    let description = _('.input-description').value;
    let deadline = _('.input-deadline').value;
    let state = _('.select-state').selectedOptions[0].value.toLowerCase()
    let priority = _('.select-priority').selectedOptions[0].value.toLowerCase()
    return {
        title, description, deadline, 
        priority, state, ended:false
    };
}

function saveTask(){
    let task = getFields();
    let oldTasks = JSON.parse(localStorage.getItem("tasks"));
    
    if (oldTasks != null){
        task.id = oldTasks.length
        localStorage.setItem("tasks", JSON.stringify([...oldTasks, task]));
    }else{
        task.id = 0
        localStorage.setItem("tasks", JSON.stringify([task]));
    }
}

function deleteTask(id){


}

__('.bouton-suppression').forEach(element => {
    $(element, 'click', ()=>{
        let idElement = element.parentElement["id"];
        console.log(idElement)
    });
});
// $(button, 'click', ()=>{
//     addTask(task);
// })

function renderTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks){
        for (const taskItem of tasks) {
            addTask(taskItem);
        }
    }
}

function endTask(){

}

$(taskForm, 'submit', (e)=>{
    addTask(task);
    // getFields();
    saveTask();
})