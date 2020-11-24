/*Range of Movement */
Player.prototype.setMoveRange = function (p) {
  $("div#board > div").removeClass("range-highlight")

  rowX = [];
  rowY = [];

  let up = p - 10, down = p + 10, left = p - 1, right = p + 1, blocked = false;
  let xmin = p - p % 10;  
  let xmax = xmin + 9;

  while (up >= 0 && up >= p - 30) {
    blocked = false;
    let classList = $("div#" + up).attr('class').split(/\s+/);
    $.each(classList, function (index, item) {
      if (item === 'obstacle' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    });
    if (blocked === true) {
      break;
    } else {
      $("div#" + up).addClass('range-highlight');
      rowY.push(up);
    }
    up = up - 10;

  }
  while (down <= 99 && down <= p + 30) {
    blocked = false;
    let classList = $("div#" + down).attr('class').split(/\s+/);

    $.each(classList, function (index, item) {
      if (item === 'obstacle' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    });
    if (blocked === true) {
      break;
    } else {
      $("div#" + down).addClass('range-highlight');
      rowY.push(down);
    }
    down = down + 10;
  }
  while (left >= xmin && left >= p - 3) {
    blocked = false;
    let classList = $("div#" + left).attr('class').split(/\s+/);
    $.each(classList, function (index, item) {
      if (item === 'obstacle' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    });
    if (blocked === true) {
      break;
    } else {
      $("div#" + left).addClass('range-highlight');
      rowX.push(left);
    }
    left = left - 1;
  }

  while (right <= xmax && right <= p + 3) {
    blocked = false;
    let classList = $("div#" + right).attr('class').split(/\s+/);
    $.each(classList, function (index, item) {
      if (item === 'obstacle' || item === 'player2' || item === 'player1') {
        blocked = true;
      }
    });
    if (blocked === true) {
      break;
    } else {
      $("div#" + right).addClass('range-highlight');
      rowX.push(right);
    }
    right = right + 1;
  }

  return [rowX, rowY];
} //while loops to determine available places nested if statements to execute blocked or not ...tell overall structure 

/*  Change active player   */
Player.prototype.activatePlayer = function () {
  if (this.name === 'player1') {
    activePlayer = player1;

    passivePlayer = player2;
  } else {
    activePlayer = player2;

    passivePlayer = player1;
  }
  if (fight === false) {
    activePlayer.setMoveRange(this.position);
  }
}

/* Move / see if a fight starts */
//on each move if have weapon available or not 
Player.prototype.move = function (target) {


  target = parseInt(target);
  //array change
  array.splice(this.position, 1);
  array[target] = this.name;

  // class change
  let oldbox = document.getElementById(this.position);
  oldbox.classList.remove(this.name);
  let newbox = document.getElementById(target);
  newbox.classList.add(this.name);

  //check for weapon
  let searchFrom = this.position;
  let searchTo = target;
  checkWeapon(searchFrom, searchTo, target);

  this.position = target;
  adjacents = [target - 1, target + 1, target - 10, target + 10];

  switch (this.name) {
    case 'player1':
      newbox.innerHTML = '<img src="img/' + this.image + '" height="58"></img>';
      break;
    case 'player2':
      newbox.innerHTML = '<img src="img/' + this.image + '" height="58"></img>';
      break;
  }
  oldbox.innerHTML = ""; //checking difference between new and old positions and weapons available //

  //check for adjacents player // add alert  
  $.each(adjacents, function (index, adjacent) {
    if ($("#" + adjacent).find('img').length) {
      fight = true;
    }
  });

  if (fight === false) {
    passivePlayer.activatePlayer();  //player change

  } else {
    //fight  and remove move range highlight
    rowX = []; rowY = [];
    $("div#board > div").removeClass('range-highlight');
    enableFightButtons();
    fightModal.style.display = "block";

    //REAL ALERT HERE/////////////////////////////////////////////
  }

};

player1.activatePlayer();  //starting player is player1 

/*  Movements   */
//checking if available and making opeque thing show 
box.hover(function () {
  if (jQuery.inArray(parseInt(this.id), rowX) >= 0 || jQuery.inArray(parseInt(this.id), rowY) >= 0) {
    //show the opaque moving image defined in the css 
    $(this).addClass(window.activePlayer.name + 'Moving');
  }
}, function () {
  $(this).removeClass(window.activePlayer.name + 'Moving');
});

//on click to move character to new location 
box.on("click", function () {
  let target = parseInt(this.id);
  if (jQuery.inArray(target, rowX) >= 0 || jQuery.inArray(target, rowY) >= 0) {
    box.removeClass(window.activePlayer.name + 'Moving');
    activePlayer.move(target);
  }
});

/*  Change weapon  *///////////////////////////
// one function change actual weapon array already have previously 
function checkWeapon(searchFrom, searchTo, target) {
  let diff = searchTo - searchFrom;
  let movedArray = [];
  if (diff > 0) {
    if (diff <= 3) {
      for (let i = searchFrom; i <= searchTo; i++) {
        if (jQuery.inArray(i, rowX) >= 0) {
          movedArray.push(i);
        }
      }
    } else {
      for (let i = searchFrom; i <= searchTo; i += 10) {
        if (jQuery.inArray(i, rowY) >= 0) {
          movedArray.push(i);
        }
      }
    }
  } else {
    if (diff >= -3) {
      for (let i = searchFrom; i >= searchTo; i--) {
        if (jQuery.inArray(i, rowX) >= 0) {
          movedArray.push(i);
        }
      }
    } else {
      for (let i = searchFrom; i >= searchTo; i -= 10) {
        if (jQuery.inArray(i, rowY) >= 0) {
          movedArray.push(i);
        }
      }
    }
  }
  //weaon and damage change 
  for (let j = 0; j <= movedArray.length; j++) {
    let passedBox = $("div#" + movedArray[j]);

    oldWeapon = activePlayer.weapon;

    if (passedBox.hasClass("weapon1")) {
      newWeapon = 'weapon1';
      activePlayer.damage = 40;
    } else if (passedBox.hasClass("weapon2")) {
      newWeapon = 'weapon2';
      activePlayer.damage = 20;
    } else if (passedBox.hasClass("weapon3")) {
      newWeapon = 'weapon3';
      activePlayer.damage = 30;
    } else if (passedBox.hasClass("weapon4")) {
      newWeapon = 'weapon4';
      activePlayer.damage = 50;
    } else {
      newWeapon = '';
    }
//removing class of previous weapon 
    if (newWeapon != '') {
      passedBox.removeClass(newWeapon);
      passedBox.addClass(oldWeapon);
      activePlayer.weapon = newWeapon;
      $("#" + activePlayer.name + "weapon1").removeClass('range-highlight');
      $("#" + activePlayer.name + "weapon2").removeClass('range-highlight');
      $("#" + activePlayer.name + "weapon3").removeClass('range-highlight');
      $("#" + activePlayer.name + "weapon4").removeClass('range-highlight');
      $("#" + activePlayer.name + newWeapon).removeClass('range-highlight');
      $("#" + activePlayer.name + newWeapon).addClass('range-highlight');
      $("#" + activePlayer.name + "damage").text(activePlayer.damage);
    }
  }
}