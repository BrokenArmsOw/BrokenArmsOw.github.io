/**
* Generated On: 2018-5-11
* Class: ConnexionReplay
*/

import Connexion from '../Connexion.js';
import Replay from './Replay.js';
import ControleurReplay from './ControleurReplay.js';
import DossierReplay from './DonneesReplay/DossierReplay.js';

class ConnexionReplay extends Connexion {
	constructor(MainView){
		super();
		this.mainView = MainView;
	}

	/*
	*/
	connexion(){
		gapi.auth2.getAuthInstance().signIn();

		
	};

	/*
	*/
	deconnexion(){
		gapi.auth2.getAuthInstance().signOut();
	};


	/*
	* @param estConnecter
	*
	*/
	miseAJourStatus(estConnecter){
		if (estConnecter) {
			$("#btnConnexion").hide();
			$("#btnDeconnexion").show();
			this.mainView.charger();
		} else {
			$("#btnConnexion").show();
			$("#btnDeconnexion").hide(); 
		} 
	};


}

export {ConnexionReplay as default};