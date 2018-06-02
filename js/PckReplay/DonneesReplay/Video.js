/**
* Generated On: 2018-5-12
* Class: Video
*/

class Video{
	constructor(Carte,Lien){
		this.carte = Carte;
		this.url = Lien;
	}

	/*
	*/
	recupererId(){
		return this.url.match(/https\:\/\/youtu\.be\/(.{11})/).pop(); 
	};


	/*
	* @return 
	*
	*/
	getCarte(){
		return this.carte;
	};


	/*
	* @param value
	*
	*/
	setCarte(value){
		this.carte = value;
	};


	/*
	* @return 
	*
	*/
	getUrl(){
		return this.url;
	};


	/*
	* @param value
	*
	*/
	setUrl(value){
		this.url = value;
	};

	getBaliseLien(){
		return $('<a class="center-block" target="_blank" href="'+this.url+'" ></a>').append(this.getBaliseThumbnail());
	}

	getBaliseThumbnail(){
		let id = this.recupererId();
		if (id.length == 11) {
			return $('<img class="d-block img-fluid center-block" src="https://img.youtube.com/vi/'+id+'/hqdefault.jpg">');
		}else{
			return $('<img class="d-block img-fluid center-block" src="..." alt="No thumbnail">');
		}
	}


}

export {Video as default};