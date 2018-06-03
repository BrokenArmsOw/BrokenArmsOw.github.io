/**
* Generated On: 2018-5-12
* Class: Dossier
*/

class Dossier{
	constructor(){
		this.id;
		this.charger = false;
		this.erreur = false;
	}

	/*
	* @param nom
	*
	*/
	recupererDossier(){
		throw 'AbstractMethodNotImplementedError';

	};


	/*
	* @param reponse
	*
	*/
	traitementDossier(reponse){
		throw 'AbstractMethodNotImplementedError';

	};


	/*
	*/
	recupererFichiers(){
		throw 'AbstractMethodNotImplementedError';

	};


	/*
	* @param reponse
	*
	*/
	traitementFichier(reponse){
		throw 'AbstractMethodNotImplementedError';

	};

	affichageErreur(Description){
		this.erreur = true;
		$("#error").html(Description);
	};


	/*
	* @return 
	*
	*/
	getId(){
		return this.id;
	};


	/*
	* @param value
	*
	*/
	setId(value){
		this.id = value;
	};


	/*
	* @return 
	*
	*/
	getCharger(){
		return this.charger;
	};


	/*
	* @param value
	*
	*/
	setCharger(value){
		this.charger = value;
	};

	asErreur(){
		return this.erreur;
	}


}

export {Dossier as default};