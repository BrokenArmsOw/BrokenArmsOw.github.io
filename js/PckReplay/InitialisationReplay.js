/**
* Generated On: 2018-5-10
* Class: InitialisationReplay
*/

import Initialisation from '../Initialisation.js';
import ConnexionReplay from './ConnexionReplay.js';
import Replay from './Replay.js';
import ControleurReplay from './ControleurReplay.js';
import DossierReplay from './DonneesReplay/DossierReplay.js';

class InitialisationReplay extends Initialisation {
	constructor(){
		super();
		
		this.Discovery_Docs = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest","https://sheets.googleapis.com/$discovery/rest?version=v4"];
		this.Scopes = "https://www.googleapis.com/auth/drive";

		let dossier = new DossierReplay();
		let controleur = new ControleurReplay(dossier);
		let replay = new Replay(dossier,controleur);
		controleur.abonne(replay);

		this.connexion = new ConnexionReplay(replay);
	}

	/*
	* 
	*/
	initialiser(){
		this.initialiserBoutonConnexion();
		this.initialiserGoogleApi();
	};


	/*
	*/
	initialiserBoutonConnexion(){
		//Création d'un tableau associant l'id d'un élément et la fonction à appeler en cas de clic sur cet élement
		window.evenementsClic = {
			'btnConnexion' : this.connexion.connexion,
			'btnDeconnexion' : this.connexion.deconnexion,
		};

		//Ajout d'un écouteur d'événement onClick sur la page
		window.addEventListener('click', this.gererClic, true);
	};


}

export {InitialisationReplay as default};