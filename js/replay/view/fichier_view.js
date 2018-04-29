var Fichier_View_Type = Object.freeze({CAROUSSEL:1, TABLEAU:2});

var Fichier_View = function(){
    var _ = {
        caroussel : new Fichier_View_Caroussel(),
        tableau : new Fichier_View_Tableau(),
        currentAffichage : Fichier_View_Type.CAROUSSEL
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

Fichier_View.prototype.show = function(fichier,date,vod){

    switch(this.get("currentAffichage")){
        case Fichier_View_Type.CAROUSSEL:
            this.get("caroussel").show(fichier,date,vod);
        break;

        case Fichier_View_Type.TABLEAU:
            this.get("tableau").show(fichier,date,vod);
        break;
    }

};

