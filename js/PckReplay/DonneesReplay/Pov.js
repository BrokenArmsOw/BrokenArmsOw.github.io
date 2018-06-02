/**
* Generated On: 2018-5-12
* Class: Pov
*/

import Video from './Video.js';

class Pov{
	constructor(){
		this.nom;
		this.videos = [];
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

	addPov(Pov){
		this.videos.push(Pov);
	}

	getVideos(){
		return this.videos;
	}

	getVideo(Index){
		return this.videos[Index];
	}


}

export {Pov as default};