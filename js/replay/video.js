var Video = function(Carte,Url){
    var _ = {
        carte:Carte,
        url : Url
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

    this.getId = function(){
        return _["url"].match(/https\:\/\/youtu\.be\/(.{11})/).pop();
    };
};

Video.prototype.getBaliseImg = function(){
    let id = this.getId();
    if (id.length == 11) {
        return $('<img class="d-block img-fluid center-block" src="https://img.youtube.com/vi/'+id+'/hqdefault.jpg">');
    }else{
        return $('<img class="d-block img-fluid center-block" src="..." alt="No thumbnail">');
    }
};