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

/**
 * Recuperation des fichiers avec lien replay
 */
/*function getFiles() {
  let request = gapi.client.drive.files.list({
    q : "name = 'Replay' and mimeType = 'application/vnd.google-apps.folder' and sharedWithMe = true"
  });

  request.execute(reponseDossier);
}

function reponseDossier(resp){
  if (!resp.error) {
      FOLDER_REPLAY = resp.files[0];
      lireFichiers();
  }else{
      showErrorMessage("Erreur: " + resp.error.message);
  }
 }

 function lireFichiers(){
  let requestfile = gapi.client.drive.files.list({
    q : "mimeType = 'application/vnd.google-apps.spreadsheet' and '"+ FOLDER_REPLAY.id+"' in parents"
  });

  requestfile.execute(reponseFichier);
 }

 function reponseFichier(resp){
  if (!resp.error) {
      for(i=0;i<resp.files.length;i++){
        FILES_REPLAY.push(resp.files[i]);
      } 
      lireFichier();
  }else{
      showErrorMessage("Erreur: " + resp.error.message);
  }
 }

 function lireFichier(){
  for(let index = 0;index < FILES_REPLAY.length;index++){
    let fichier = FILES_REPLAY[index];
    /*let tabFichier = map.get(fichier.name);
    if(tabFichier == undefined){
      tabFichier = [];
      map.set(fichier.name);
    }

    tabFichier.push(lireFichier(fichier));
    gapi.client.sheets.spreadsheets.values.batchGet({
      spreadsheetId: fichier.id,
      ranges: 'Feuille 1!A:E',
    }).then(reponseTableur,erreurTableur);
  }
 }

 function reponseTableur(response){
  let range = response.result;
  console.log(range);
      /*if (range.values.length > 0) {
       
      } else {
        
      }
 }

 function erreurTableur(response){
    showErrorMessage('Error: ' + response.result.error.message);
 }*/