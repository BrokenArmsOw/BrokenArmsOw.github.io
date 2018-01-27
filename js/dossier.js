class Dossier{
    constructor(){
        this.id = '';
        this.fichiers = [];
        
    }

    get(){
        let requete = gapi.client.drive.files.list({
            q : "name = 'Replay' and mimeType = 'application/vnd.google-apps.folder' and sharedWithMe = true"
        });

        requete.execute(this.reponseDossier);
    }

    reponseDossier(reponse){
        if (!reponse.error) {
            let folder = reponse.files[0];
            console.log(this);
            this.id = folder.id;
            this.lireFichiers();
        }else{
            showErrorMessage("Erreur: " + reponse.error.message);
        }
    }

    lireFichiers(){
        let requete = gapi.client.drive.files.list({
            q : "mimeType = 'application/vnd.google-apps.spreadsheet' and '"+ this.id +"' in parents"
        });
        
        requete.execute(this.reponseFichier);
    }

    reponseFichier(reponse){
        if (!reponse.error) {
            for(i=0;i<reponse.files.length;i++){
                let f = reponse.files[i];
                let fichier = new Fichier(fichier.id,fichier.name);
                fichier.get();
                fichiers.push(fichier);
            } 
        }else{
            showErrorMessage("Erreur: " + reponse.error.message);
        }
    }
}