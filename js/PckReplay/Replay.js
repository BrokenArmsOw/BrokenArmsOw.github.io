/**
* Generated On: 2018-5-10
* Class: Replay
*/

var AffichageContenu = Object.freeze({CAROUSSEL:1, TABLEAU:2});

import ControleurReplay from './ControleurReplay.js';
import DossierReplay from './DonneesReplay/DossierReplay.js';
import Composant from '../GUI/Composant.js';

import Caroussel from '../GUI/Caroussel.js';
import CarousselItem from '../GUI/CarousselItem.js';

import ChargementIcon from '../GUI/ChargementIcon.js';
import Formulaire from '../GUI/Formulaire.js';
import Tableau from '../GUI/Tableau.js';

import TreeView from '../GUI/TreeView.js';
import Tree from '../GUI/Tree.js';

class Replay{
	constructor(Dossier,Controleur){
		this.menu;
		this.contenu;
		this.formulaireAjout;
		this.currentAffichage = AffichageContenu.CAROUSSEL;
		this.controleur = Controleur;
		this.dossier = Dossier;
		this.chargementIcon;
	}

	/**
	* 
	*/
	charger(){
		this.controleur.getDossier("Replay");

		this.chargementIcon = new ChargementIcon();
		this.chargementIcon.afficher($("#contenu"));
		
		this.initialiserBouton();
	};

	initialiserBouton(){
		window.evenementsClic['btnSwitchAffichage'] = this.swapAffichage.bind(this);
	}

	clickMenu(event){
		$("#videos").show();

		let target = event.target;

  		let Joueur = target.getAttribute("pov");
  		let DatePov = target.getAttribute("date");
  		let NomFichier = target.getAttribute("fichier");

		switch(this.currentAffichage){
			case AffichageContenu.CAROUSSEL:
				this.contenu = new Caroussel(this.creationContenuCaroussel(NomFichier,DatePov,Joueur));
			break;
	
			case AffichageContenu.TABLEAU:
				this.contenu = new Tableau(this.creationContenuTableau(NomFichier,DatePov,Joueur));
			break;
		}

		this.afficher();
	}

	swapAffichage(){
		switch(this.currentAffichage){
			case AffichageContenu.CAROUSSEL:
				this.currentAffichage = AffichageContenu.TABLEAU;
			break;
	
			case AffichageContenu.TABLEAU:
				this.currentAffichage = AffichageContenu.CAROUSSEL;
			break;
		}

		this.afficher();
	}

	creationMenu(){
		let root = new Tree(null,"");

		for(let [nom, fichier] of this.dossier.getFichiers().entries()){
			let sonFichier = new Tree(root,fichier.getNom(),"fichier");
			
			for(let [date, povs] of fichier.getPovs().entries()){

				let sonDate = new Tree(sonFichier,date,"date");

				for(let [joueur, pov] of povs.entries()){
					let sonPov = new Tree(sonDate,joueur,"pov");

					sonDate.addSon(sonPov);
				}
				sonFichier.addSon(sonDate);
			}

			root.addSon(sonFichier);
		}

		return root;
	}

	creationContenuCaroussel(NomFichier,DatePov,Joueur){
		let f = this.dossier.getFichier(NomFichier);
		let mapPov = f.getPov(DatePov);
		let videos = mapPov.get(Joueur).getVideos();

		let carousselData = [];

		for(let i=0;i<videos.length;i++){
			let video = videos[i];

			let caption = $("<h3>"+video.getCarte()+"</h3>");
			let data = video.getBaliseLien();

			carousselData.push(new CarousselItem(caption,data));
		}
		
		return carousselData;
	}

	creationContenuTableau(NomFichier,DatePov,Joueur){
		let f = this.dossier.getFichier(NomFichier);
		let mapPov = f.getPov(DatePov);
		let videos = mapPov.get(Joueur).getVideos();

		let tableauData = [];

		for(let i=0;i<videos.length;i++){
			let video = videos[i];

			let caption = $("<h3>"+video.getCarte()+"</h3>");
			let data = video.getBaliseLien();
			data.append(caption);

			tableauData.push(data);
		}
		
		return tableauData;
	}

	/*
	* @param exped
	*
	*/
	miseAJour(exped){
		this.afficher();
	};

	afficher(){
		if(this.menu){
			$("#menu").empty();
			this.menu.afficher($("#menu")); 
		}else{
			
			let isReady = function() {
				if(this.dossier.asErreur() || this.dossier.getCharger()){
					this.chargementIcon.cacher();
					if(this.dossier.getCharger()){
						$("#contenu").append($('<div id="menu" class="treeview col-sm-4"><ul id="treeview_list" class="list-group"></ul></div>'));
						//Recuperer le menu treeview
						//Creation des données
						this.menu = new TreeView(this.creationMenu(),this.clickMenu.bind(this));
						this.menu.afficher($("#menu")); 
					}
				}else{
					setTimeout(isReady.bind(this),5000);
				}

			};
			setTimeout(isReady.bind(this), 5000);
		}
		
		if(this.contenu){
			if(!$("#videos_contenu").length)
				$("#contenu").append('<div id="videos" class="col-sm-6"><div id="videos_contenu"></div><label class="switch"><input id="btnSwitchAffichage" type="checkbox" checked><span class="slider"></span></label></div>')

			$("#videos_contenu").empty();
			this.contenu.afficher($("#videos_contenu"));
		}
			
	}

}

export {Replay as default};