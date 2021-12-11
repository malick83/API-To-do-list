let card = _('.carte');
let allCards = _('.mes-cartes')
let button =  _('.test-button')

let task = {
    title:"brief : algo",
    state:"en cours",
    description:"description de merde",
    deadline:"23/11/23 23:23",
    priority:"faible"
}

function addTask(newTask){
    let newCard = card.cloneNode(true);
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
        case "moyen":
            _('.etiquette').style.backgroundColor = "yellow";
            break;
        default:
            _('.etiquette').style.backgroundColor = "red";
            break;
    }
    allCards.appendChild(newCard);
}


function getFields(form){

}
$(button, 'click', ()=>{
    addTask(task);
})