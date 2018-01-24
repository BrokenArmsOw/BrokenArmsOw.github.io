class Dossier{
    constructor(){
        this.id = '';
        this.fichiers = [];
        let requete = gapi.client.drive.files.list({
            q : "name = 'Replay' and mimeType = 'application/vnd.google-apps.folder' and sharedWithMe = true"
        });

        requete.execute(this.reponseDossier);
    }

    reponseDossier(reponse){
        if (!reponse.error) {
            this.id = reponse.files[0].id;
            lireFichiers();
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
                let fichier = reponse.files[i];
                fichiers.push(new Fichier(fichier.id,fichier.name));
            } 
        }else{
            showErrorMessage("Erreur: " + reponse.error.message);
        }
    }
}