var Fichier_View_Caroussel = function(){};

/*Fichier_View_Caroussel.prototype.show = function(fichier,date,pov){
    let data = fichier.get("data");

    let videos = data.get(date).get(pov);
    let indicators = $("#indicators_videos");
    let inner = $("#inner_videos");

    for(i=0;i<videos.length;i++){
        let video = videos[i];

        let indicator_li = $('<li data-target="#videos"></li>').attr("data-slide-to",i);
        indicators.append(indicator_li);
        
        let youtube_video_id = video["URL"].match(/https\:\/\/youtu\.be\/(.{11})/).pop();
        let video_thumbnail;
        
        if (youtube_video_id.length == 11) {
            video_thumbnail = $('<img class="d-block img-fluid center-block" src="https://img.youtube.com/vi/'+youtube_video_id+'/hqdefault.jpg">');
        }else{
            video_thumbnail = $('<img class="d-block img-fluid center-block" src="..." alt="No thumbnail">');
        }

        let lien = $('<a class="center-block" target="_blank"></a>').attr("href",video["URL"]).append(video_thumbnail);
        let carte = $("<h3></h3>").append(video["Carte"]);

        let caption = $('<div class="carousel-caption"></div>');
        caption.append(carte);
        
        let item = $('<div class="carousel-item"></div>').append(lien).append(caption);
        inner.append(item);

        if(i==0){
            indicator_li.addClass("active");
            item.addClass("active");
        }
    }

};*/

Fichier_View_Caroussel.prototype.show = function(fichier,date,pov){
    let data = fichier.get("data");
    let videos = data.get(date).get(pov);

    let carousel = $('<div id="caroussel_video" class="carousel slide" data-ride="carousel"></div>');
    let indicators = $('<ol class="carousel-indicators" id ="indicators_videos"></ol>');
    let inner = $('<div class="carousel-inner" role="listbox" id = "inner_videos"></div>');
    let controlPrev = $('<a class="carousel-control-prev" href="#caroussel_video" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a>');
    let controlPred = $('<a class="carousel-control-next" href="#caroussel_video" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a>');

    carousel.append(indicators);
    carousel.append(inner);
    carousel.append(controlPrev);
    carousel.append(controlPred);

    for(i=0;i<videos.length;i++){
        let video = videos[i];

        let indicator_li = $('<li data-target="#caroussel_video" data-slide-to='+i+'></li>');
        indicators.append(indicator_li);

        let lien = $('<a class="center-block" target="_blank" href="'+video.get("url")+'" ></a>').append(video.getBaliseImg());
        let carte = $("<h3></h3>").append(video.get("carte"));

        let caption = $('<div class="carousel-caption"></div>');
        caption.append(carte);
        
        let item = $('<div class="carousel-item"></div>').append(lien).append(caption);
        inner.append(item);

        if(i==0){
            indicator_li.addClass("active");
            item.addClass("active");
        }
    }

    $("#videos").append(carousel);
};