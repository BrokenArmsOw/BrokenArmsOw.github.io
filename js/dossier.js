var Dossier = function(){
    var _ = {
        id : '',
        nbFichier : -1,
        fichiers : new Map()
    };   
    
    this.get = function(variable) 
    { 
        return _[variable];
    };
    
    this.set = function(variable, val) 
    { 
        if(_[variable] !== undefined)
            _[variable] = val; 
    };
};

Dossier.prototype.getDossier = function()
{
    let requete = gapi.client.drive.files.list({
        q : "name = 'Replay' and mimeType = 'application/vnd.google-apps.folder' and sharedWithMe = true"
    });

    requete.execute(this.reponseDossier.bind(this));
};

Dossier.prototype.reponseDossier = function(reponse){
    if (!reponse.error) {
        let folder = reponse.files[0];

        this.set('id',folder.id);
        this.lireFichiers();
    }else{
        showErrorMessage("Erreur: " + reponse.error.message);
    }
};

Dossier.prototype.lireFichiers = function(){
    let requete = gapi.client.drive.files.list({
        q : "mimeType = 'application/vnd.google-apps.spreadsheet' and '"+ this.get('id') +"' in parents"
    });
    
    requete.execute(this.reponseFichier.bind(this));
};

Dossier.prototype.reponseFichier = function(reponse){
    if (!reponse.error) {
        this.set("nbFichier",reponse.files.length);

        for(i=0;i<reponse.files.length;i++){
            let f = reponse.files[i];
            let fichier = new Fichier(f.id,f.name);
            fichier.getFichier();
            this.get('fichiers').set(f.name,fichier);
        } 
    }else{
        showErrorMessage("Erreur: " + reponse.error.message);
    }
};

Dossier.prototype.getMenu = function(){
    let menu = [];
    let fichiers = this.get("fichiers");
    
    for(let [name, fichier] of fichiers.entries()){

        let n = fichier.getMenu();

        let f = {text: fichier.get("name"),tags: [fichier.profondeurMenu()],nodes:n};

        menu.push(f);
    }

    $("#loader").hide();

    $('#treeview_videos').treeview({
        color: "#428bca",
        showBorder: false,
        data: menu
    });

};

Dossier.prototype.ready = function(){
    let ready = 0;
    let fichiers = this.get("fichiers");

    for(let [name, fichier] of fichiers.entries()){
        if(fichier.get("ready")){
            ready++; 
        }
    }

    return ready == this.get("nbFichier");
}