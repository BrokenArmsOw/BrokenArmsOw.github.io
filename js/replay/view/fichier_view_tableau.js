var Fichier_View_Tableau = function(){};

Fichier_View_Tableau.prototype.show = function(fichier,date,pov){
    let data = fichier.get("data");
    let videos = data.get(date).get(pov);

    let tableau = $('<table></table>');
    let tr = $('<tr></tr>');

    for(i=0;i<videos.length;i++){
        let video = videos[i];

        if(i%3 == 0 && i!=0){
            tableau.append(tr);
            tr = $('<tr></tr>');
        }

        let lien = $('<a class="center-block" target="_blank" href="'+video.get("url")+'" ></a>').append(video.getBaliseImg());
        let carte = $("<h3></h3>").append(video.get("carte"));
        
        let td = $('<td"></td>').append(lien).append(carte);
        tr.append(td);
    }

    tableau.append(tr);

    $("#videos").append(tableau);
};