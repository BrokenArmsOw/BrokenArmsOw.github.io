var directory = 'js/replay/';
var files = ['video','fichier','dossier','view/fichier_view_caroussel','view/fichier_view_tableau','view/fichier_view'];
loadScripts(directory,files);

var dossier;
var fichier_view;

function showErrorMessage(errorMessage){
  $("#content").html(errorMessage);
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    $("#btnConnexion").hide();
    $("#btnDeconnexion").show();
    $("#loader").show();
    fichier_view = new Fichier_View();
    dossier = new Dossier();
    dossier.getDossier();

    let isReady = function() {
      if(dossier.ready()){
        $("#loader").hide();
        $("#contenu").show();
        dossier.getMenu();
      }else{
        setTimeout(isReady,5000);
      }
    };
    setTimeout(isReady, 5000);
    
  } else {
    $("#btnConnexion").show();
    $("#btnDeconnexion").hide();
  }
}

/**
 *  Sign in the user upon button click.
 */
function Connexion(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function Deconnexion(event) {
  $("#contenu").hide();

  $("#videos").empty();
  $("#treeview_list").empty();
  
  delete this.dossier;
  gapi.auth2.getAuthInstance().signOut();
}

function clickMenu(event){
  let target = event.target;

  let pov = target.getAttribute("pov");
  let date = target.getAttribute("date");
  let fichierName = target.getAttribute("fichier");

  let fichier = dossier.get("fichiers").get(fichierName);

  fichier_view.show(fichier,date,pov);
}

function clickSwitch(event){
  if (event.target.checked) {
    fichier_view.set("currentAffichage",Fichier_View_Type.CAROUSSEL);
  } else {
    fichier_view.set("currentAffichage",Fichier_View_Type.TABLEAU);
  }

  fichier_view.refresh();
}