var Fichier = function(Id,Name){
    var _ = {
        id : Id,
        name : Name,
        data : null
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
        console.log(this);
        let range = reponse.result;
        console.log(range);
        
    }else{
        showErrorMessage('Error: ' + reponse.result.error.message);
    }

};

Fichier.prototype.printMenu = function(menu){

}

Fichier.prototype.printVideo = function(tableau){

}