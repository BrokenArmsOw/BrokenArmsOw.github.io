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
		$("#btnConnexion").hide();
		$("#btnDeconnexion").show();

		this.mainView.charger();
	};

	/*
	*/
	deconnexion(){
		$("#btnConnexion").show();
		$("#btnDeconnexion").hide(); 
	};


	/*
	* @param estConnecter
	*
	*/
	miseAJourStatus(estConnecter){
		if (estConnecter) {
			this.connexion();
		} else {
			this.deconnexion();
		} 
	};


}

export {ConnexionReplay};