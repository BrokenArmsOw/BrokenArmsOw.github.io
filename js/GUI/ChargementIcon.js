/**
* Generated On: 2018-6-2
* Class: ChargementIcon
*/

import Composant from './Composant.js';

class ChargementIcon extends Composant {
	constructor(){
		super();
	}

	/*
	* @param Location
	*
	*/
	afficher(Location){
		let chargementIcon = $('<div id="loader" />');
		Location.prepend(chargementIcon);
		
		this.location = chargementIcon;
	};


}

export {ChargementIcon as default};