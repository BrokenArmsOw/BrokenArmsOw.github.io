/*
 * Initialisation au chargement de la page
 */
// Client ID and API key from the Developer Console
var CLIENT_ID = '1074490662687-7lnpsrg7i1cvq67a4v76dmhmlm9504kf.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDFsoWk-iagO1k8y_OtbfYfwKo92tqxOhA';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest","https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/drive";

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
		});
  }

//Initialisation de la gestion des événements onClick sur la page
function initialiser()
{
	//Création d'un tableau associant l'id d'un élément et la fonction à appeler en cas de clic sur cet élement
	window.evenementsClic = {
		'btnConnexion' : Connexion,
		'btnDeconnexion' : Deconnexion,
		'btnSwitchAffichage' : clickSwitch
	};

	//Ajout d'un écouteur d'événement onClick sur la page
	window.addEventListener('click', gererClic, true);
	handleClientLoad();
}

//Gestion des événements onClick de la page
function gererClic(evenement)
{
	//Récupère l'id de l'élément sur lequel l'utilisateur a cliqué
	let targetID = evenement.target.id;

	//Exécute le gestionnaire d'événement onClick correspondant à l'élément cible
	if(window.evenementsClic[targetID])
	{
		window.evenementsClic[targetID](evenement);
	}
}

function loadScripts(directory,files){
  let extension = '.js';  
  for (let file of files){ 
      let path = directory + file + extension; 
      let script = document.createElement("script");
      script.src = path;
      document.body.appendChild(script);
  } 
}

//Lie la fonction initialiser au gestionnaire d'événément onLoad de la page
window.onload = initialiser;
