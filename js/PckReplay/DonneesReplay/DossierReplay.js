/**
* Generated On: 2018-5-12
* Class: DossierReplay
*/

import Dossier from '../../Donnees/Dossier.js';

import FichierReplay from './FichierReplay.js';

class DossierReplay extends Dossier {
	constructor(){
		super();
		this.nom;
		this.nombreFichiers;
		this.fichiers = new Map();
	}

	/*
	* @return 
	*
	*/
	getNom(){
		return this.nom;
	};


	/*
	* @param value
	*
	*/
	setNom(value){
		this.nom = value; 
	};

	/*
	* @return 
	*
	*/
	getNombreFichiers(){
		return this.nombreFichiers; 
	};


	/*
	* @param value
	*
	*/
	setNombreFichiers(value){
		this.nombreFichiers = value; 
	};


	/*
	*/
	getFichiers(){
		return this.fichiers; 
	};


	/*
	* @param Index
	*
	*/
	getFichier(Index){
		return this.fichiers.get(Index); 
	};


	/*
	* @param nom
	*
	*/
	recupererDossier(){
		let requete = gapi.client.drive.files.list({
			q : "name = '"+ this.nom +"' and mimeType = 'application/vnd.google-apps.folder' and sharedWithMe = true"
		});
	
		requete.execute(this.traitementDossier.bind(this));

	};

	/*
	* @param reponse
	*
	*/
	traitementDossier(reponse){
		if (!reponse.error) {
			let folder = reponse.files[0];
	
			this.id = folder.id;
			this.recupererFichiers();
		}else{
			this.AffichageErreur("Erreur: " + reponse.error.message);
		} 
	};


	/*
	*/
	recupererFichiers(){
		let requete = gapi.client.drive.files.list({
			q : "mimeType = 'application/vnd.google-apps.spreadsheet' and '"+ this.id +"' in parents"
		});
		
		requete.execute(this.traitementFichier.bind(this)); 
	};


	/*
	* @param reponse
	*
	*/
	traitementFichier(reponse){
		if (!reponse.error) {
			this.nombreFichiers = reponse.files.length
	
			for(i=0;i<this.nombreFichiers;i++){

				let f = reponse.files[i];
				let fichier = new FichierReplay(f.id,f.name);
				fichier.recupererContenu();
				this.fichiers.set(f.name,fichier);
			} 

			let isReady = function() {
				for(let [nom, fichier] of this.fichiers.entries()){
					if(!fichier.getCharger()){
						setTimeout(isReady,1000);
					}
				}
			}
			setTimeout(isReady, 1000); 

			this.charger = true;

		}else{
			this.AffichageErreur("Erreur: " + reponse.error.message);
		} 

	};


}

export {DossierReplay as default};