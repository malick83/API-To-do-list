let modeleCarte = document.querySelector('.carte');
let containeurDesCartes = document.querySelector('.mes-cartes')
let button =  document.querySelector('.test-button')
let buttonAjouter = document.querySelector('.addBtn')
let formulaireDeTache = document.querySelector('.form-task')
let buttonSupprimer = document.querySelectorAll('.bouton-suppression')
let buttonFermetureFormulaire = document.querySelector('.btn-close')
let apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTc5MDUxLCJleHAiOjE5NTQ1NTUwNTF9.9zUm7vEolQ-I2qKcxN3NIz2I-o2iAiSoAZzwdy8fO5g"
let url = "https://pomvfsgmnducyfclngvq.supabase.co/rest/v1/tasks"

let taskModel = {
    "title":"brief : algo",
    "state":"en cours",
    "description":"description de merde",
    "deadline":'23/11/23 23:23',
    "priority":"faible",
    "ended":true
}

//ramata 
function ajouterTache(tache){

}

//rokhaya
function supprimerTache(){
   console.log("hello word")
   removeEventListener()
    
}

// abdou karim
function modifierTache(id){}

//kebe
function afficherLesTaches(){}

/* recupere les champs saisi par l'utilisateur*/
function recupererLesChamps(){
    let title = document.querySelector('.input-title').value;
    let description = document.querySelector('.input-description').value;
    let deadline = document.querySelector('.input-deadline').value;
    let state = document.querySelector('.select-state').selectedOptions[0].value.toLowerCase()
    let priority = document.querySelector('.select-priority').selectedOptions[0].value.toLowerCase()
    return {
        title, description, deadline, 
        priority, state, ended:false
    };
}

formulaireDeTache.addEventListener('submit', (evenement)=>{
    evenement.preventDefault()
    // console.log(recupererLesChamps())
    let nouvelleCarte =  creerCarte(recupererLesChamps());

    containeurDesCartes.append(nouvelleCarte);
    
    buttonFermetureFormulaire.click();
})



/* retourne l'element carte creer a partir de tache(JSON)*/
function creerCarte(tache){
    let carte = modeleCarte.cloneNode(true);
    document.querySelector('.carte').style.display = 'block';
    document.querySelector('.carte').setAttribute('id', tache.id);
    document.querySelector('.mon-titre h3').innerText = tache.title;
    document.querySelector('time').innerText = tache.deadline;
    document.querySelector('.mon-titre span').innerHTML = tache.state;
    document.querySelector('.description').innerHTML = tache.description;
    switch (tache.priority) {
        case "faible":
            document.querySelector('.etiquette').style.backgroundColor = "green";
            break;
        case "forte":
            document.querySelector('.etiquette').style.backgroundColor = "red";
            break;
        case "moyenne":
            document.querySelector('.etiquette').style.backgroundColor = "yellow";
            break;
        default:
            document.querySelector('.etiquette').style.backgroundColor = "red";
            break;
    }
    return carte;
}

function ajouterDansDatabase(tache){
    fetch(`${url}?apikey=${apiKey}`, {
        method: "POST",
        body: JSON.stringify(tache),
        headers: {
            "Content-Type": "application/json",
        }
    }).then( data => data.json())
}

function supprimerDansDatabase(id){
    fetch(`${url}?apikey=${apiKey}&id=eq.${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${apiKey}`
        }
    }).then( data => data.json())
}

function modifierDansDatabase(id, nouvelleTache){
    fetch(`${url}?apikey=${apiKey}&id=eq.${id}`, {
        method: "PATCH",
        body: JSON.stringify(nouvelleTache),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        }
    }).then( data => data.json())
}

async function recupererDansDatabase() { 
    fetch(`${url}?apikey=${apiKey}`)
        .then( data => data.json())
        .then( listeDesTaches => listeDesTaches)
        .then( listeDesTaches => console.log(listeDesTaches))
}
/* retourne true si les champs requis sont correcte et false sinon
function verifierLesChamps(saisi){
    return (
        saisi.title.length >= 3 &&
        saisi.description >= 3 &&
        deadline != null
    )
}*/