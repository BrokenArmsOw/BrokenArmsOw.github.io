/**
* Generated On: 2018-5-12
* Class: Fichier
*/

class Fichier{
	constructor(Id){
		this.id = Id;
		this.charger = false;
		this.erreur = false;
	}

	/*
	*/
	recupererContenu(){
		throw 'AbstractMethodNotImplementedError';

	};


	/*
	* @param reponse
	*
	*/
	traitementContenu(reponse){
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

export {Fichier as default};