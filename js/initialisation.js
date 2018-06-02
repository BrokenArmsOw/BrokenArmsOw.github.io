/**
* Generated On: 2018-5-10
* Class: Initialisation
*/

import Connexion from './Connexion.js';

class Initialisation{
	constructor(){
		this.Client_Id = '1074490662687-7lnpsrg7i1cvq67a4v76dmhmlm9504kf.apps.googleusercontent.com';
		this.Api_Key = 'AIzaSyDFsoWk-iagO1k8y_OtbfYfwKo92tqxOhA';
		this.Discovery_Docs;
		this.Scopes;
		this.connexion = new Connexion();
	}

	/*
	*/
	initialiser(){
		throw 'AbstractMethodNotImplementedError';
	};


	/*
	* @param evenement
	*
	*/
	gererClic(evenement){
		//Récupère l'id de l'élément sur lequel l'utilisateur a cliqué
		let targetID = evenement.target.id;

		//Exécute le gestionnaire d'événement onClick correspondant à l'élément cible
		if(window.evenementsClic[targetID])
		{
			window.evenementsClic[targetID](evenement);
		} 
	};

	/*
	*/
	initialiserGoogleApi(){
		gapi.load('client:auth2', this.initialiserClient); 
	};


	/*
	*/
	initialiserClient(){
		gapi.client.init({
			apiKey: API_KEY,
			clientId: CLIENT_ID,
			discoveryDocs: DISCOVERY_DOCS,
			scope: SCOPES
		}).then(function () {
			// Listen for sign-in state changes.
			gapi.auth2.getAuthInstance().isSignedIn.listen(this.connexion.miseAJourStatus);

			// Handle the initial sign-in state.
			this.connexion.miseAJourStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		}); 
	};


	/*
	*/
	initialiserBoutonConnexion(){
		throw 'AbstractMethodNotImplementedError';
	};


	/*
	* @return 
	*
	*/
	getClient_Id(){
		return this.Client_Id;
	};


	/*
	* @param value
	*
	*/
	setClient_Id(value){
		this.Client_Id = value;
	};


	/*
	* @return 
	*
	*/
	getApi_Key(){
		return this.Api_Key;
	};


	/*
	* @param value
	*
	*/
	setApi_Key(value){
		this.Api_Key = value;
	};


	/*
	* @return 
	*
	*/
	getDiscovery_Docs(){
		return this.Discovery_Docs;
	};


	/*
	* @param value
	*
	*/
	setDiscovery_Docs(value){
		this.Discovery_Docs = value;
	};


	/*
	* @return 
	*
	*/
	getScopes(){
		return this.Scopes;
	};


	/*
	* @param value
	*
	*/
	setScopes(value){
		this.Scopes = value;
	};


}

export {Initialisation as default};