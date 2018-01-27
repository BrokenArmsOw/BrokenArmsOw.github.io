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
    let requete = gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.get('id'),
        range: 'Feuille 1!A2:E',
    });

    requete.execute(this.reponseTableur);
};

Fichier.prototype.reponseTableur = function(reponse){
    if(!reponse.error){
        let range = reponse.result;

        let mapDate = new Map();
        console.log(range);

        for(i=0;i<range.values.length;i++){
            let row = range.values[i];
            let date = row[0];
            let map = row[1];
            let pov = row[2];
            let lien = row[3];

            let mapPov;
            if(mapDate.has(date)){
                mapPov = mapDate.get(date);
            }else{
                mapPov = new Map();
                mapDate.set(date,mapPov);
            }

            let povArray;
            if(mapPov.has(pov)){
                povArray = mapPov.get(pov);
            }else{
                povArray = [];
                mapPov.set(pov,povArray);
            }

            povArray.push({"Carte" : map,"Url" : lien});
        }

        console.log(mapDate);
    }else{
        showErrorMessage('Error: ' + reponse.result.error.message);
    }

};

Fichier.prototype.printMenu = function(menu){

}

Fichier.prototype.printVideo = function(tableau){

}