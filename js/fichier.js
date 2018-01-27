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

    requete.execute(this.reponseTableur.bind(this));
};

Fichier.prototype.reponseTableur = function(reponse){
    if(!reponse.error){
        let range = reponse.result;
        let mapDate = new Map();

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

            povArray.push({"Carte" : map,"URL" : lien});
        }

        this.set("data",mapDate);
    }else{
        showErrorMessage('Error: ' + reponse.result.error.message);
    }

};

Fichier.prototype.profondeurMenu = function(){

    let profondeur = 0;
    let data = this.get("data");
    for(let [date, mapPov] of data.entries()){
        for(let [pov, tab] of mapPov.entries()){
            profondeur++;
        }

        profondeur++;
    }

    return profondeur;
}

Fichier.prototype.getMenu = function(){
    let menu = [];
    let data = this.get("data");

    for(let [date, mapPov] of data.entries()){
        let menuPov = [];
        for(let [pov, tab] of mapPov.entries()){

            let p = {text: pov, href: "#"+pov, click: clickMenu,tags: [0], pov: pov,date: date,fichier: this.get("name")};
            menuPov.push(p);
        }
        let d = {text: date, href: "#"+date,tags: [menuPov.length],nodes:menuPov};
        menu.push(d);
    }
    return menu;
}

Fichier.prototype.printVideo = function(carousel,date,pov){
    let data = this.get("data");

    let videos = data.get(date).get(pov);
    let indicators = carousel.filter("#indicators_videos")[0];
    let inner = carousel.filter("#inner_videos")[0];

    for(i=0;i<videos.length;i++){
        let video = videos[i];

        let indicator_li = $('<li data-target="#videos"></li>').attr("data-slide-to",i);
        indicators.append(indicator_li);


        let lien = $("<a></a>").attr("href",video["URL"]);
        lien.append(video["Carte"]);


        let caption = $('<div class="carousel-caption"></div>');
        caption.append(lien);

        let item = $('<div class="item"></div>').append(caption);
        inner.append(item);
    }

    indicators.first().addClass("active");

    inner.first().addClass("active");
}