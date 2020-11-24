//enable attack and defend buttons on the active player/disable from passive player 
function enableFightButtons(){
  if (activePlayer === player1){
    P1Abtn.removeAttr('disabled');
    P1Dbtn.removeAttr('disabled');
    P2Abtn.attr('disabled', 'disabled');
    P2Dbtn.attr('disabled', 'disabled');
  }else{
    P2Abtn.removeAttr('disabled');
    P2Dbtn.removeAttr('disabled');
    P1Abtn.attr('disabled', 'disabled');
    P1Dbtn.attr('disabled', 'disabled');
  }
}

function attack() {
	if(passivePlayer.protected === true){
    //health damage when defending 50%
    passivePlayer.health -= activePlayer.damage/2;
    passivePlayer.protected = false;
  }else{
    //regular health damage 
    passivePlayer.health -= activePlayer.damage;

  }
  
  if(passivePlayer.health < 0){ 
    passivePlayer.health=0; }
  //update health points on player stats
  $("#"+passivePlayer.name+"health").text(passivePlayer.health);
 


  if(passivePlayer.health === 0){
  	if(activePlayer.name === "player1"){
  		activePlayer.name = "player1";
  	}else{
  		activePlayer.name = "player2";
    }	
    //generate winner player name on  game over modal 
    $("#gameOverModal .modal-content p:nth-child(2)").text(activePlayer.name);
    // dispaly game over modal with health reaches 0 
    gameOverModal.style.display = "block";

  }else{
    passivePlayer.activatePlayer();
    enableFightButtons();
  }    
};

function defend(){
    activePlayer.protected = true;
    passivePlayer.activatePlayer();
    enableFightButtons();
}


