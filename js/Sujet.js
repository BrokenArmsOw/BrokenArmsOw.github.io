/**
* Generated On: 2018-5-10
* Class: Sujet
*/

class Sujet{
	constructor(){

		this.obs = [];
	}

	/*
	* @param o
	*
	*/
	abonne(o){
		this.obs.append(o);
	};

	/*
	*/
	notifie(){
		for(let i=0;i<this.obs.length;i++)
			this.obs[i].miseAJour(this);
	};


}

export {Sujet as default};