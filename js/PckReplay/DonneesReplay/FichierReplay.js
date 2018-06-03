/**
* Generated On: 2018-5-12
* Class: FichierReplay
*/

import Fichier from '../../Donnees/Fichier.js';

import Pov from './Pov.js';

class FichierReplay extends Fichier {
	constructor(Id,Nom){
		super(Id);
		this.nom = Nom;
		this.nombrePov;
		this.povs = new Map();
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
	*/
	getPovs(){
		return this.povs;
	};


	/*
	* @param Index
	*
	*/
	getPov(Index){
		return this.povs.get(Index); 
	};


	/*
	*/
	recupererContenu(){
		let requete = gapi.client.sheets.spreadsheets.values.get({
			spreadsheetId: this.id,
			range: 'Feuille 1!A2:E',
		});
	
		requete.execute(this.traitementContenu.bind(this));
	};


	/*
	* @param reponse
	*
	*/
	traitementContenu(reponse){
		if(!reponse.error){
			let range = reponse.result;
	
			for(i=0;i<range.values.length;i++){
				let row = range.values[i];
				let date = row[0];
				let map = row[1];
				let joueur = row[2];
				let lien = row[3];
	
				let mapPov;
				if(this.povs.has(date)){
					mapPov = this.povs.get(date);
				}else{
					mapPov = new Map();
					this.povs.set(date,mapPov);
				}
	
				let pov;
				if(mapPov.has(joueur)){
					pov = mapPov.get(joueur);
				}else{
					pov = new Pov(joueur);
					mapPov.set(joueur,pov);
				}
	
				pov.addPov(new Video(map,lien));
			}

			this.charger = true;
		}else{
			this.affichageErreur('Error: ' + reponse.result.error.message);
		}
	};


}

export {FichierReplay as default};