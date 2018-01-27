var dossier;

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
    dossier = new Dossier();
    dossier.getDossier();
    
    setTimeout(dossier.getMenu.bind(dossier), 1000);

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
  gapi.auth2.getAuthInstance().signOut();
  delete this.dossier;
}

function clickMenu(event){
  let indicators = $("#indicators_videos").empty();
  let inner = $("#inner_videos").empty();

  let target = event.target;

  let pov = target.getAttribute("pov");
  let date = target.getAttribute("date");
  let fichier = target.getAttribute("fichier");

  dossier.get("fichiers").get(fichier).printVideo(date,pov);

  $("#videos").show(); 
}