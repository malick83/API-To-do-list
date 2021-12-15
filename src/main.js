let modeleCarte = document.querySelector('.carte');
let btnOpenModel = document.querySelector('.btn-open-modal')
let containeurDesCartes = document.querySelector('.mes-cartes')
// let button =  document.querySelector('.test-button')
let buttonAjouter = document.querySelector('.addBtn')
let tousLesCartes;
let formulaireDeTache = document.querySelector('.form-task')
let buttonFermetureFormulaire = document.querySelector('.btn-close')
let apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTc5MDUxLCJleHAiOjE5NTQ1NTUwNTF9.9zUm7vEolQ-I2qKcxN3NIz2I-o2iAiSoAZzwdy8fO5g"
let url = "https://pomvfsgmnducyfclngvq.supabase.co/rest/v1/tasks"

afficherLesTaches();

function ajouterTache(){

    let saisi = recupererLesChamps();
    let nouvelleCarte = creerCarte(saisi);
    containeurDesCartes.appendChild(nouvelleCarte);
    ajouterDansDatabase(saisi)
}


function supprimerTache(carte){
    let id = carte.getAttribute('data-id');
    carte.remove()
    supprimerDansDatabase(id);
}

// function modifierTache(carte, modification){
//     let id = carte.getAttribute('data-id');
//     document.querySelector('.btn-add-task').lastElementChild.click();
//     // let ancienTache = recupererLesChamps();
//     // tu modifier dans la page
//     // modifierDansDatabase(id, modification);
// }

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
                modifierDansDatabase(carte.getAttribute('data-id'), {ended});
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
    ajouterTache();
    buttonFermetureFormulaire.click();
})

/* retourne l'element carte creer a partir de tache(JSON)*/
function creerCarte(tache){
    let carte = modeleCarte.cloneNode(true);
    document.querySelector('.carte').style.display = 'block';
    document.querySelector('.carte').setAttribute('data-id', tache.id);
    //document.querySelector('.terminer').setAttribute('data-state', tache.ended);
    document.querySelector('.mon-titre h3').innerText = tache.title;
    document.querySelector('time').innerText = tache.deadline;
    document.querySelector('.mon-titre span').innerHTML = tache.state;
    document.querySelector('.description').innerHTML = tache.description;
    // let terminer = document.querySelector('.terminer');

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
    if(tache.ended == true){
        document.querySelector('.bouton-terminer span').setAttribute('class', 'ended');
        console.log(true);
    }else{
        document.querySelector('.bouton-terminer span').removeAttribute('class', 'ended');
        console.log(false);
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

