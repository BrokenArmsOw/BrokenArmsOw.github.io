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

/**
 * Recuperation des fichiers avec lien replay
 */
function getFiles() {
  let request = gapi.client.drive.files.list({
    q : "name = 'Replay' and mimeType = 'application/vnd.google-apps.folder' and sharedWithMe = true"
  });

  request.execute(reponseDossier);

  if(FOLDER_REPLAY){
    let request = gapi.client.drive.files.list({
      q : "mimeType : 'application/vnd.google-apps.spreadsheet' and sharedWithMe : true and"+ FOLDER_REPLAY.getId()+" in parents"
    });

    request.execute(reponseFichier);

    for(let index = 0;index < FILES_REPLAY.length;index++){
      let fichier = FILES_REPLAY[index];
      console.log(fichier);
    }

    console.log(FOLDER_REPLAY);
  }

}

function showErrorMessage(errorMessage){
    $("#content").html(errorMessage);
}