/**
* Generated On: 2018-5-10
* Class: CarousselItem
*/

class CarousselItem{
	constructor(Caption,Data){
		this.caption = Caption;
		this.data = Data;
	}

	/*
	* @return 
	*
	*/
	getCaption(){
		return $('<div class="carousel-caption"></div>').append(this.caption);
	};


	/*
	* @param value
	*
	*/
	setCaption(value){
		this.caption = value;
	};


	/*
	* @return 
	*
	*/
	getData(){
		return $('<div class="carousel-item"></div>').append(this.data);
	};


	/*
	* @param value
	*
	*/
	setData(value){
		this.data = value;
	};


}

export {CarousselItem as default};