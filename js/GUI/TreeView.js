/**
* Generated On: 2018-5-10
* Class: TreeView
*/

import Tree from './Tree.js';

import Composant from './Composant.js';

class TreeView extends Composant {
	constructor(Root,FunctionClick){
		super();

		this.data = Root;
		this.funcClick = FunctionClick; 
	}

	/*
	*/
	afficher(Location){

		Location.treeview({
			color: "#428bca",
			showBorder: false,
			data: this.data.getArray(new Object(),this.funcClick)
		});

		this.location = Location;
	};


}

export {TreeView as default};