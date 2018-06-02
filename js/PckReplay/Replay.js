/**
* Generated On: 2018-5-10
* Class: Replay
*/

var AffichageContenu = Object.freeze({CAROUSSEL:1, TABLEAU:2});

import ControleurReplay from './ControleurReplay.js';

import DossierReplay from './DonneesReplay/DossierReplay.js';

import * as GUI from '../GUI/*.js';

class Replay{
	constructor(Dossier,Controleur){
		this.menu;
		this.contenu;
		this.formulaireAjout;
		this.currentAffichage = AffichageContenu.CAROUSSEL;
		this.controleur = Controleur;
		this.dossier = Dossier;
	}

	/**
	* 
	*/
	charger(){
		this.controleur.getDossier("Replay");

		let chargementIcon = new GUI.ChargementIcon();
		chargementIcon.afficher($("#contenu"));
		
		initialiserBouton();
	};

	initialiserBouton(){
		window.evenementsClic['btnSwitchAffichage'] = this.swapAffichage;
	}

	clickMenu(NomFichier,DatePov,Joueur){
		$("#videos").show();
		switch(this.currentAffichage){
			case AffichageContenu.CAROUSSEL:
				this.contenu = new GUI.Carrousel(creationContenuCaroussel(NomFichier,DatePov,Joueur));
			break;
	
			case AffichageContenu.TABLEAU:
				this.contenu = new GUI.Tableau(creationContenuTableau(NomFichier,DatePov,Joueur));
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
		let root = new GUI.Tree(null,"");

		for(let [nom, fichier] of this.dossier.getFichiers().entries()){
			let sonFichier = new GUI.Tree(root,fichier.getNom());
			
			for(let [date, povs] of fichier.getPovs().entries()){

				let sonDate = new GUI.Tree(sonFichier,date);

				for(let [joueur, pov] of povs.entries()){
					let sonPov = new GUI.Tree(sonDate,joueur);
				}
			}

			root.addSon(sonFichier);
		}

		return root;
	}

	creationContenuCaroussel(NomFichier,DatePov,Joueur){

		let f = this.dossier.getFichier(NomFichier);
		let pov = f.getPov(DatePov);
		let videos = pov.getVideos();

		let carousselData = [];

		for(let i=0;i<videos.length;i++){
			let video = videos[i];

			let caption = $("<h3>"+video.getCarte()+"</h3>");
			let data = video.getBaliseLien();

			carousselData.append(new GUI.CarousselItem(caption,data));
		}
		
		return carousselData;
	}

	creationContenuTableau(NomFichier,DatePov,Joueur){
		let f = this.dossier.getFichier(NomFichier);
		let pov = f.getPov(DatePov);
		let videos = pov.getVideos();

		let tableauData = [];

		for(let i=0;i<videos.length;i++){
			let video = videos[i];

			let caption = $("<h3>"+video.getCarte()+"</h3>");
			let data = video.getBaliseLien();
			data.append(caption);

			tableauData.append(data);
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
				if(this.dossier.getCharger()){
					delete chargementIcon;
	
					//Recuperer le menu treeview
					//Creation des données
					this.menu = new GUI.TreeView(creationMenu(),this.clickMenu);
				}else{
					setTimeout(isReady,5000);
				}
			};
	
			setTimeout(isReady, 5000); 
		}
		
		if(this.contenu){
			$("#videos_contenu").empty();
			this.contenu.afficher($("#videos_contenu"));
		}
			
	}

}

export {Replay};