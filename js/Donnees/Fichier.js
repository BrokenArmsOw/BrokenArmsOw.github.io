/**
* Generated On: 2018-5-12
* Class: Fichier
*/

class Fichier{
	constructor(){
		this.id;
		this.charger = false;
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


}

export {Fichier as default};