/**
* Generated On: 2018-5-10
* Class: Tree
*/

class Tree{
	constructor(Father,Data,DataName){

		this.data = Data;
		this.dataName = DataName;
		this.father = Father;
		this.sons = [];
	}

	addSon(Son){
		this.sons.push(Son);
	}

	getData(){
		return this.data;
	}

	getArray(DataFathers,ClickFunc,FunctionObject){
		let item;

		if(this.sons.length !=0){
			let n = [];

			DataFathers[this.dataName] = this.data;

			for(let i=0;i<this.sons.length;i++){
				n.push(this.sons[i].getArray(DataFathers,ClickFunc,FunctionObject));
			}

			item = {text: this.data,tags: [getLength()],nodes:n};
		}else{
			item = {text: this.data, click: ClickFunc.bind(FunctionObject), tags: [getLength()]};

			item[this.dataName] = this.data;

			for(let name in DataFathers){
				item[name] = DataFathers[name];
			}
		}

		return item;
	}

	getLength(){
		let length = 0;
		for(let i=0;i<this.sons.length;i++){
			length += this.sons[i].getLength();
		}

		return length;
	}

}

export {Tree as default};