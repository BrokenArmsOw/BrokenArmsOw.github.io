var dossier;

function showErrorMessage(errorMessage){
  $("#content").html(errorMessage);
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    $("#btnConnexion").hide();
    $("#btnDeconnexion").show();
    dossier = new Dossier();
    dossier.getDossier();
    
    setTimeout(dossier.getMenu.bind(dossier), 1000);

  } else {
    $("#btnConnexion").show();
    $("#btnDeconnexion").hide();
  }
}

/**
 *  Sign in the user upon button click.
 */
function Connexion(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function Deconnexion(event) {
  gapi.auth2.getAuthInstance().signOut();
  delete this.dossier;
}

function clickMenu(event){
  console.log(event);
}

var defaultData = [
  {
    text: 'Parent 1',
    href: '#parent1',
    tags: ['4'],
    nodes: [
      {
        text: 'Child 1',
        href: '#child1',
        tags: ['2'],
        nodes: [
          {
            text: 'Grandchild 1',
            href: '#grandchild1',
            tags: ['0']
          },
          {
            text: 'Grandchild 2',
            href: '#grandchild2',
            tags: ['0']
          }
        ]
      },
      {
        text: 'Child 2',
        href: '#child2',
        tags: ['0']
      }
    ]
  },
  {
    text: 'Parent 2',
    href: '#parent2',
    tags: ['0']
  },
  {
    text: 'Parent 3',
    href: '#parent3',
     tags: ['0']
  },
  {
    text: 'Parent 4',
    href: '#parent4',
    tags: ['0']
  },
  {
    text: 'Parent 5',
    href: '#parent5'  ,
    tags: ['0']
  }
];