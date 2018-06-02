/**
* Generated On: 2018-5-10
* Class: Caroussel
*/

import CarousselItem from './CarousselItem.js';

import Composant from './Composant.js';

class Caroussel extends Composant {
	constructor(Items){
		super();

		this.items = Items;
	}

	/*
	*/
	afficher(Location){
		let caroussel = $('<div id="caroussel_video" class="carousel slide" data-ride="carousel"></div>');
    	let indicators = $('<ol class="carousel-indicators" id ="indicators_videos"></ol>');
    	let inner = $('<div class="carousel-inner" role="listbox" id = "inner_videos"></div>');
    	let controlPrev = $('<a class="carousel-control-prev" href="#caroussel_video" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a>');
    	let controlPred = $('<a class="carousel-control-next" href="#caroussel_video" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a>');

		caroussel.append(indicators);
    	caroussel.append(inner);
    	caroussel.append(controlPrev);
    	caroussel.append(controlPred);

		for(let i=0;i<this.items.length;i++){
			let indicator_li = $('<li data-target="#caroussel_video" data-slide-to='+i+'></li>');
			indicators.append(indicator_li);
			
			let item = this.items[i].getData();
			let caption = this.items[i].getCaption();

			item.append(caption);
			inner.append(item);

			if(i==0){
				indicator_li.addClass("active");
				item.addClass("active");
			}
		}

		Location.append(caroussel);
		this.location = Location;
	};

	addItem(Item){
		this.items.push(Item);
	}

	getItem(Index){
		return this.items[Index];
	}

	getItems(){
		return this.items;
	}

}

export {Caroussel as default};