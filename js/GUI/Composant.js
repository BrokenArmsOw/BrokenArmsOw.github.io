/**
* Generated On: 2018-6-2
* Class: Composant
*/

class Composant{
	constructor(){
		this.location;
	}

	/*
	* @param Location
	*
	*/
	afficher(Location){
		throw 'AbstractMethodNotImplementedError';
	};


	/*
	*/
	cacher(){
		this.location.hide();
	};


}

export {Composant};