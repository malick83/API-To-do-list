import DB from './database.js'
let template = document.querySelector('template')
let modeleCarte = template.content.firstElementChild
let containeurDesCartes = document.querySelector('.mes-cartes')
let tousLesCartes;
let formulaireDeTache = document.querySelector('.form-task')
let buttonFermetureFormulaire = document.querySelector('.btn-close')
let apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTc5MDUxLCJleHAiOjE5NTQ1NTUwNTF9.9zUm7vEolQ-I2qKcxN3NIz2I-o2iAiSoAZzwdy8fO5g"
let url = "https://pomvfsgmnducyfclngvq.supabase.co/rest/v1/tasks"

let Database = new DB(url, apiKey);
afficherLesTaches();

function ajouterTache(){

    let saisi = recupererLesChamps();
    let nouvelleCarte = creerCarte(saisi);
    containeurDesCartes.appendChild(nouvelleCarte);
    Database.ajouter(saisi)
}


function supprimerTache(carte){
    let id = carte.getAttribute('data-id');
    carte.remove()
    Database.supprimer(id);
}

async function afficherLesTaches(){
    fetch(`${url}?apikey=${apiKey}`)
    .then( data => data.json())
    .then( listeDesTaches => {
        for (const tache of listeDesTaches) {
            let nouvelleCarte = creerCarte(tache);
            containeurDesCartes.appendChild(nouvelleCarte);
        }
    })
    // ajouter les evens sur les buttons
    .then( () => {
        tousLesCartes = document.querySelectorAll('.carte');

        for (const carte of tousLesCartes) {
            let buttonSupprimer = carte.lastElementChild.lastElementChild;
            let buttonTerminer = carte.lastElementChild.firstElementChild; 
            buttonSupprimer.addEventListener('click', (e) =>{
                e.stopPropagation();
                supprimerTache(carte);
            })
            buttonTerminer.addEventListener('click', (e) =>{
                e.stopPropagation();
                e.target.classList.toggle("ended");
                let ended = e.target.classList.contains("ended");
                Database.modifier(carte.getAttribute('data-id'), {ended});
            })
        }
    })
}

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
    evenement.preventDefault();
    evenement.stopPropagation()
    ajouterTache();
    buttonFermetureFormulaire.click();
})

/* retourne l'element carte creer a partir de tache(JSON)*/
// function creerCarte(tache){
//     let carte = modeleCarte.cloneNode(true);
//     document.querySelector('.carte').style.display = 'block';
//     document.querySelector('.carte').setAttribute('data-id', tache.id);
//     //document.querySelector('.terminer').setAttribute('data-state', tache.ended);
//     document.querySelector('.mon-titre h3').innerText = tache.title;
//     document.querySelector('time').innerText = tache.deadline;
//     document.querySelector('.mon-titre span').innerHTML = tache.state;
//     document.querySelector('.description').innerHTML = tache.description;
//     // let terminer = document.querySelector('.terminer');

//     switch (tache.priority) {
//         case "faible":
//             document.querySelector('.etiquette').style.backgroundColor = "green";
//             break;
//         case "forte":
//             document.querySelector('.etiquette').style.backgroundColor = "red";
//             break;
//         case "moyenne":
//             document.querySelector('.etiquette').style.backgroundColor = "yellow";
//             break;
//         default:
//             document.querySelector('.etiquette').style.backgroundColor = "red";
//             break;
//     }
//     if(tache.ended == true){
//         document.querySelector('.bouton-terminer span').setAttribute('class', 'ended');
//     }else{
//         document.querySelector('.bouton-terminer span').removeAttribute('class', 'ended');
//     }
//     return carte;
// }

function creerCarte(tache){
    let carte = modeleCarte.cloneNode(true);

    let calendrier = carte.firstElementChild.firstElementChild
    let date = calendrier.lastElementChild;
    let titre = carte.children[1].firstElementChild
    let etat = carte.children[1].lastElementChild
    let description = carte.children[2]
    let etiquette = carte.firstElementChild.lastElementChild
    let terminer = carte.lastElementChild.firstElementChild.lastElementChild

    // carte.style.display = 'block';
    carte.setAttribute('data-id', tache.id);
    titre.innerText = tache.title;
    date.innerText = tache.deadline;
    etat.innerHTML = tache.state;
    description.innerHTML = tache.description;

    switch (tache.priority) {
        case "faible":
            etiquette.style.backgroundColor = "green";
            break;
        case "forte":
            etiquette.style.backgroundColor = "red";
            break;
        case "moyenne":
            etiquette.style.backgroundColor = "yellow";
            break;
        default:
            etiquette.style.backgroundColor = "red";
            break;
    }

    if(tache.ended == true){
        terminer.setAttribute('class', 'ended');
    }else{
        terminer.removeAttribute('class', 'ended');
    }
    return carte;
}