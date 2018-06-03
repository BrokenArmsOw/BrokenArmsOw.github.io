/**
* Generated On: 2018-5-10
* Class: TreeView
*/

import Tree from './Tree.js';

import Composant from './Composant.js';

class TreeView extends Composant {
	constructor(Root,FunctionClick,FunctionObject){
		super();

		this.data = Root;
		this.funcClick = FunctionClick;
		this.funcObject = FunctionObject;
	}

	/*
	*/
	afficher(Location){
		console.log(this.data.getArray(new Object(),this.funcClick,this.functionObject));

		Location.treeview({
			color: "#428bca",
			showBorder: false,
			data: this.data.getArray(new Object(),this.funcClick,this.functionObject)
		});

		this.location = Location;
	};


}

export {TreeView as default};