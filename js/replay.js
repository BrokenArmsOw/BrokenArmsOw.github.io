// Client ID and API key from the Developer Console
var CLIENT_ID = '1074490662687-7lnpsrg7i1cvq67a4v76dmhmlm9504kf.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDFsoWk-iagO1k8y_OtbfYfwKo92tqxOhA';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest","https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/drive";

var authorizeButton = document.getElementById('login-button');
var signoutButton = document.getElementById('signout-button');
var FOLDER_REPLAY = null;
var FILES_REPLAY = [];

var mapFiles = new Map();
var range;

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    getFiles();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
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
      FILES_REPLAY = resp.files;
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

  if(FOLDER_REPLAY){
    let requestfile = gapi.client.drive.files.list({
      q : "mimeType = 'application/vnd.google-apps.spreadsheet' and '"+ FOLDER_REPLAY.id+"' in parents"
    });

    requestfile.execute(reponseFichier);
    requestfile.execute(function (resp) {console.log(resp);});
    for(let index = 0;index < FILES_REPLAY.length;index++){
      let fichier = FILES_REPLAY[index];

      let tabFichier = map.get(fichier.name);
      if(tabFichier == undefined){
        tabFichier = [];
        map.set(fichier.name);
      }

      tabFichier.push(lireFichier(fichier));

    }
  }

}

function showErrorMessage(errorMessage){
    $("#content").html(errorMessage);
}