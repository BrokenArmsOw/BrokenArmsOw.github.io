var Dossier = function(){
    var _ = {
        id : '',
        fichiers : []
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
        for(i=0;i<reponse.files.length;i++){
            let f = reponse.files[i];
            let fichier = new Fichier(f.id,f.name);
            fichier.getFichier();
            this.get('fichiers').push(fichier);
        } 
        this.getMenu();
    }else{
        showErrorMessage("Erreur: " + reponse.error.message);
    }
};

Dossier.prototype.getMenu = function(){
    let menu = [];

    for(i=0;i<this.get('fichiers').length;i++){
        let fichier = this.get('fichiers')[i];

        let n = fichier.getMenu();
        let f = {text: fichier.get("Name"), href: "#"+fichier.get("Name"),tags: [fichier.profondeurMenu()],nodes:n};

        menu.push(f);
    }

    console.log(menu);

    $('#treeview_videos').treeview({
        color: "#428bca",
        showBorder: false,
        enableLinks :true,
        data: menu
      });
}