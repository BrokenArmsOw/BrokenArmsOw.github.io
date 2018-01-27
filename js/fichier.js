class Fichier{
    constructor(Id,Name){
        this.id = Id;
        this.name = Name;
        this.data;
    }

    get(){
        let requete = gapi.client.sheets.spreadsheets.values.batchGet({
            spreadsheetId: this.id,
            ranges: 'Feuille 1!A:E',
        });

        requete.execute(this.reponseTableur);
    }

    reponseTableur(reponse){
        if(!reponse.error){
            let range = reponse.result;
            console.log(range);
            /*if (range.values.length > 0) {
                
            } else {
                
            }*/
        }else{
            showErrorMessage('Error: ' + reponse.result.error.message);
        }
        
    }
}