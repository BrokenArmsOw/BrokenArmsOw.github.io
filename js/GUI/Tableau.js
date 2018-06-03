/**
* Generated On: 2018-5-10
* Class: Tableau
*/

import Composant from './Composant.js';

class Tableau extends Composant {
	constructor(Data){
		super();

		this.data = Data;
	}

	/*
	* @return 
	*
	*/
	getData(){
		return this.data;
	};


	/*
	* @param value
	*
	*/
	setData(value){
		this.data = value;
	};


	/*
	*/
	afficher(Location){
		let tableau = $('<table class="table-responsive"></table>');
		let body = $('<tbody></tbody>');
		let tr = $('<tr></tr>'); 
		
		for(let i=0;i<this.data.length;i++){
			let video = this.data[i];
	
			if(i%3 == 0 && i!=0){
				tableau.append(tr);
				tr = $('<tr></tr>');
			}
			
			let td = $('<td"></td>').append(video);
			tr.append(td);
		}

		body.append(tr);
		tableau.append(body);

		Location.append(tableau);
		this.location = Location;
	};


}

export {Tableau as default};