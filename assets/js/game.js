var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?")
  }

  console.log("Your robot's name is ");
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 100;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >=7) {
      window.alert("Refilling a player's health by 20 for 7 coins.");
      this.health +=20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enoug money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >=7) {
      window.alert("Upgrading player's attack by 6 for 7 coins.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Arturobot",
    attack: randomNumber(10,14)
  },
  {
    name: "Unghys",
    attack: randomNumber(10,14)
  },
  {
    name: "Mecha-godzilla",
    attack: randomNumber(10,14)
  }
];

var startGame = function() {
    // reset player stats
    playerInfo.reset();
  
    // fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
      // if player is still alive, keep fighting
      if (playerInfo.health > 0) {
        // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
  
        // pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyObj = enemyInfo[i];
  
        // reset enemyHealth before starting new fight
        pickedEnemyObj.health = randomNumber(40, 60);
  
        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyObj);
        if (playerInfo.health > 0 && i < enemyInfo.length -1) {
            shop();
        }

      }
      // if player is not alive, break out of the loop and let endGame function run
      else {
        break;
      }
    }
  
    // after loop ends, we are either out of playerInfo.health or enemies to fight, so run the endGame function
    endGame();
};


var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to 1. REFILL your health, 2. UPGRADE your attack, or 3. LEAVE the store? Please enter one: '1', '2', or '3' to make a choice."
      );
      shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1: // new case
          playerInfo.refillHealth();
          break;
        case 2: // new case
          playerInfo.upgradeAttack();
          break;
        case 3: // new case
          window.alert("Leaving the store.");
          break;
        default:
          window.alert("You did not pick a valid option. Try again.");
          shop();
          break;
      }
};

var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // check localStorage for high score, if it's not there, use 0
  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }
  // if player have more money than the high score, player has new high score!
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
  } 
  else {
    alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  } 
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Enter the conditional recursive function call here!
  // Conditional Recursive Function Call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if player picks "skip" confirm and then stop the loop
  promptFight = promptFight.toLowerCase();

  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      return true;
    }
  }
  return false;
}


var fight = function(enemy) {
  var isPlayerTurn = true;
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }
    // repeat and execute as long as the enemy-robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        // alert players that they are starting the round
       // if player picks "skip" confirm and then stop the loop
      if (isPlayerTurn) {
       if (fightOrSkip()) {
       break;
    }
    // if player choses to fight, then fight
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
  
    // check enemy's health
    if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        break;
    } else {
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }
  
    // remove player's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );
  
    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
  }
  isPlayerTurn = !isPlayerTurn;

  }
};



startGame();
