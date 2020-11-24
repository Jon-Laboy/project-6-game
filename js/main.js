// variables
let array = [];
let cell;   
var activePlayer, passivePlayer; 
let box = $("div#board > div");
let adjacents;
let P1Abtn = $("#P1A") 
let P1Dbtn = $("#P1D") 
let P2Abtn = $("#P2A") 
let P2Dbtn = $("#P2D") 
let fight = false; 




// Find Open Cell for Objects ////
function findOpenCell() {
    do {
        cell = Math.floor((Math.random() * 100));
    }
    while (!(array[cell] == null))
    return cell;
}


//Define Obstacle Class
class Obstacle {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
    generatePosition() {
        for (let i = 0; i < 12; i++) {
            cell = findOpenCell();
            array[cell] = this.name;
            let mybox = document.getElementById(cell);
            mybox.classList.add(this.name);
        }
    }
};


//Define Weapon Class
class Weapon {
    constructor(name, image, damage) {
        this.name = name;
        this.image = image;
        this.damage = damage;
    }
    generatePosition() {
        cell = findOpenCell();
        array[cell] = this.name;
        let mybox = document.getElementById(cell);
        mybox.classList.add(this.name);
    }
};

//Define Player Class
class Player {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.weaponDamage = null;
        this.health = 100; 
        this.damage = 10;
    }
    generatePosition() {
        cell = findOpenCell();
        array[cell] = this.name;
        let mybox = document.getElementById(cell);
        mybox.classList.add(this.name);

        mybox.innerHTML = '<img src="img/' + this.image + '" height="56" ></img>';
        //Prevent  players placement in adjacent divs ////////////////////////
        let contacts = [cell - 1, cell + 1, cell - 10, cell + 10];
        $.each(contacts,(index, contact) => {
            if ((contact >= 0 && contact < 100) && array[contact] == null) {
                array[contact] = 'full';
            }
        });
        return this.position = cell;
    }
};




//  Instantiate Objects 
let obstacle = new Obstacle("obstacle", "obstacles.png");

let weapon1 = new Weapon("weapon1", "weapon1.png", 10);
let weapon2 = new Weapon("weapon2", "weapon2.png", 20);
let weapon3 = new Weapon("weapon3", "weapon3.png", 40);
let weapon4 = new Weapon("weapon4", "weapon4.png", 30);

let player1 = new Player("player1", "player1.png");
let player2 = new Player("player2", "player2.png");




// Generate Object Positions on Board
obstacle.generatePosition();
player1.generatePosition();
player2.generatePosition();
weapon1.generatePosition();
weapon2.generatePosition();
weapon3.generatePosition();
weapon4.generatePosition();



// Get the rules modal
let rulesModal = document.getElementById("rulesModal");
// Get the game over modal
let gameOverModal = document.getElementById("gameOverModal")
// Get the fight modal
let fightModal = document.getElementById("fightModal")

// Get the <span> element that closes the rules modal
let closeRules = document.getElementsByClassName("close-rules")[0];
let closeGameOver = document.getElementsByClassName("close-game-over")[0];
let closeFightModal = document.getElementsByClassName("close-fight-modal")[0];
// Get the button that opens the rules modal
let rulesBtn = document.getElementById("game-rules-btn");

// When the user clicks on the button, open the modal
rulesBtn.onclick = function() {
  rulesModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeRules.onclick = function() {
  rulesModal.style.display = "none";
}

closeFightModal.onclick = function() {
    fightModal.style.display = "none";
  }

closeGameOver.onclick = function() {
    gameOverModal.style.display = "none";
    location.reload();
  }

  //hide fight modal until fight begins 
  fightModal.style.display = "none";

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == rulesModal) {
    rulesModal.style.display = "none";
  }
    if (event.target == gameOverModal) {
        location.reload();
    }
    if (event.target == fightModal) {
        fightModal.style.display = "none"; 
    }
  }




