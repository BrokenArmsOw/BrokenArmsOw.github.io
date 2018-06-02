/**
* Generated On: 2018-5-10
* Class: ControleurReplay
*/

import Sujet from '../Sujet.js';

import DossierReplay from './DonneesReplay/DossierReplay.js';

class ControleurReplay extends Sujet {
	constructor(Dossier){
		super();

		this.dossier = Dossier;
	}

	getDossier(){
		this.dossier.recupererDossier();
		this.notifie();
	}

}

export {ControleurReplay};