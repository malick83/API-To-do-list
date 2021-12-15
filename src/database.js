export default class Database{

    constructor(url, apiKey){
        this.apiKey = apiKey;
        this.url  = url;
    }

    ajouter(tache){
        fetch(`${this.url}?apikey=${this.apiKey}`, {
            method: "POST",
            body: JSON.stringify(tache),
            headers: {
                "Content-Type": "application/json",
            }
        }).then( data => data.json())
    }

    supprimer(id){
        fetch(`${this.url}?apikey=${this.apiKey}&id=eq.${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`
            }
        }).then( data => data.json())
    }
    
    modifier(id, nouvelleTache){
        fetch(`${this.url}?apikey=${this.apiKey}&id=eq.${id}`, {
            method: "PATCH",
            body: JSON.stringify(nouvelleTache),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.apiKey}`
            }
        }).then( data => data.json())
    }
}