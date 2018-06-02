/**
* Generated On: 2018-5-11
* Class: Connexion
*/

class Connexion{
	constructor(){

	};

	/*
	*/
	connexion(){
		throw 'AbstractMethodNotImplementedError';
	};


	/*
	*/
	deconnexion(){
		throw 'AbstractMethodNotImplementedError';
	};


	/*
	*/
	affichageErreur(Description){
		$("#error").html(Description);
	};


	/*
	* @param estConnecter
	*
	*/
	miseAJourStatus(estConnecter){
		throw 'AbstractMethodNotImplementedError';
	};


};

export {Connexion as default};