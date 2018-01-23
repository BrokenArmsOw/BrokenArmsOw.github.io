
var FOLDER_REPLAY = null;
var FILES_REPLAY = [];

var mapFiles = new Map();
var range;

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
    getFiles();
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
}

function reponseDossier(resp){
  if (!resp.error) {
      FOLDER_REPLAY = resp.files[0];
  }else{
      showErrorMessage("Erreur: " + resp.error.message);
  }
 }

 function reponseFichier(resp){
  if (!resp.error) {
      for(i=0;i<resp.files.length;i++)
        FILES_REPLAY.push(resp.files[i]);
  }else{
      showErrorMessage("Erreur: " + resp.error.message);
  }
 }

 function reponseTableur(response){
  range = response.result;
      /*if (range.values.length > 0) {
       
      } else {
        
      }*/
 }

 function erreurTableur(response){
    showErrorMessage('Error: ' + response.result.error.message);
 }

 function lireFichier(fichier){
    gapi.client.sheets.spreadsheets.values.batchGet({
      spreadsheetId: fichier.id,
      range: 'Feuille 1!A:E',
    }).then(reponseTableur,erreurTableur);
 }

/**
 * Recuperation des fichiers avec lien replay
 */
function getFiles() {
  let request = gapi.client.drive.files.list({
    q : "name = 'Replay' and mimeType = 'application/vnd.google-apps.folder' and sharedWithMe = true"
  });

  request.execute(reponseDossier);

  console.log(request);

  let requestfile = gapi.client.drive.files.list({
    q : "mimeType = 'application/vnd.google-apps.spreadsheet' and '"+ FOLDER_REPLAY.id+"' in parents"
  });

  requestfile.execute(reponseFichier);

  for(let index = 0;index < FILES_REPLAY.length;index++){
    let fichier = FILES_REPLAY[index];
    console.log(fichier);
    /*let tabFichier = map.get(fichier.name);
    if(tabFichier == undefined){
      tabFichier = [];
      map.set(fichier.name);
    }

    tabFichier.push(lireFichier(fichier));*/

  }

}