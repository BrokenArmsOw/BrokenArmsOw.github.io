var Fichier = function(Id,Name){
    var _ = {
        id = Id,
        name = name,
        data = null
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

Fichier.prototype.getFichier = function(){
    let requete = gapi.client.sheets.spreadsheets.values.batchGet({
        spreadsheetId: this.get('id'),
        ranges: 'Feuille 1!A:E',
    });

    requete.execute(this.reponseTableur);
};

Fichier.prototype.reponseTableur = function(reponse){
    if(!reponse.error){
        let range = reponse.result;
        console.log(range);
        /*if (range.values.length > 0) {
            
        } else {
            
        }*/
    }else{
        showErrorMessage('Error: ' + reponse.result.error.message);
    }

};