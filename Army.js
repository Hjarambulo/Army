// ------------------- VARIABLES OF CONTROL --------------------
// types of units available
let units = ['lancer', 'archer', 'knight'];
//dictionary unit type: [basePoints, trainingCost, trainingPoints, transformCost]
let unitDict = {
  lancer: [5, 10, 3, 30],
  archer: [10, 20, 7, 40],
  knight: [20, 30, 10, 0],
};
//dictionary army type: [number of lancers, archers and knights]
let armyDict = {
  chinese: [2, 25, 2],
  english: [10, 10, 10],
  byzantines: [5, 8, 15],
};
// message list
let message = {
  trainSucces: 'Unit trained successfully',
  transformSuccess: 'Unit transformed successfully',
  transformFail: 'Unit can not be transformed',
  insufficientGold: 'Insufficient Gold',
  battleWin: 'Battle won',
  battleLose: 'Battle lost',
  battleTie: 'Battle tied',
};
//starting gold amount
let initialGold = 1000;
// reward for wining a battle
let reward = 100;
// number of units lost in a lost and tie battle
let unitsLostBattle = 2;

let unitsTieBattle = 1;

// ------------------- UNIT CLASS AND HIS CORRESPONDING METHODS --------------------
class unit {
  constructor(type) {
    this.type = type;
    this.basePoints = unitDict[this.type][0];
    this.trainingCost = unitDict[this.type][1];
    this.trainingPoints = unitDict[this.type][2];
    this.transformCost = unitDict[this.type][3];
    this.trainingPower = 0;
  }
  // method to calculate the total points of a single unit
  totalPoints() {
    let points = this.basePoints + this.trainingPower;
    return points;
  }
  // method to train a unit
  train() {
    this.trainingPower += this.trainingPoints;
  }
  // method to transform a unit it returns a boolean to check if succeded
  transform() {
    if (this.type != units[units.length - 1]) {
      this.type = units[units.indexOf(this.type) + 1];
      this.basePoints = unitDict[this.type][0];
      this.trainingCost = unitDict[this.type][1];
      this.trainingPoints = unitDict[this.type][2];
      this.transformCost = unitDict[this.type][3];
      return true;
    } else return false;
  }
}
// ------------------- army CLASS AND HIS CORRESPONDING METHODS --------------------
class army {
  constructor(type) {
    this.civilization = type;
    this.gold = initialGold;
    this.battleHistory = [];
    this.units = [];
    for (let i = 0; i < units.length; i++) {
      for (let j = 0; j < armyDict[this.civilization][i]; j++) {
        this.units.push(new unit(units[i]));
      }
    }
  }
  // method to train a unit based in his position in units array
  unitTrain(unit) {
    //verify if the units have the gold required
    if (this.gold >= this.units[unit].trainingCost) {
      this.gold -= this.units[unit].trainingCost;
      this.units[unit].train();
      return message.trainSucces;
    } else return message.insufficientGold;
  }
  // method to transform a unit based in his position in units array
  unitTransform(unit) {
    //check if units have the gold required
    if (this.gold >= this.units[unit].transformCost) {
      this.gold -= this.units[unit].transformCost;
      //check if the transformation process was a success
      if (this.units[unit].transform()) {
        return message.transformSuccess;
      } else return message.transformFail;
    } else return message.insufficientGold;
  }
  // method to calculate the total power of units
  totalPower() {
    let power = 0;
    this.units.forEach((unit) => (power += unit.totalPoints()));
    return power;
  }
  // method to search the stronger unit in units array and remove it
  looseStrongerUnit() {
    for (let i = 0; i < unitsLostBattle; i++) {
      let stronger = null;
      let maxPoints = 0;
      this.units.forEach((unit) => {
        if (unit.totalPoints() > maxPoints) {
          maxPoints = unit.totalPoints();
          stronger = unit;
        }
      });
      this.units.splice(this.units.indexOf(stronger), 1);
    }
  }
  // method to search the weakest unit in units array and remove it
  looseWeakestUnit() {
    for (let i = 0; i < unitsTieBattle; i++) {
      let weakest = null;
      let minPoints = Number.MAX_VALUE;
      this.units.forEach((unit) => {
        if (unit.totalPoints() < minPoints) {
          weakest = unit;
          minPoints = unit.totalPoints();
        }
      });
      this.units.splice(this.units.indexOf(weakest), 1);
    }
  }
  // method in charge of the battle between armys
  battle(defender) {
    if (this.totalPower() > defender.totalPower()) {
      this.battleWin(defender);
      defender.battleLose(this);
      return message.battleWin;
    } else if (this.totalPower() < defender.totalPower()) {
      this.battleLose(defender);
      defender.battleWin(this);
      return message.battleLose;
    } else {
      this.battleTie(defender);
      defender.battleTie(this);
      return message.battleTie;
    }
  }
  // methods to control the result effects of the battle
  battleWin(rival) {
    this.gold += reward;

    this.battleHistory.push(message.battleWin + ` vs ${rival.civilization}`);
  }

  battleLose(rival) {
    this.looseStrongerUnit();

    this.battleHistory.push(message.battleLose + ` vs ${rival.civilization}`);
  }

  battleTie(rival) {
    this.looseWeakestUnit();

    this.battleHistory.push(message.battleTie + ` vs ${rival.civilization}`);
  }
}
// ------------------- CONSTANTS FOR TESTS IN CONSOLE --------------------
const l = new unit('lancer');
const a = new unit('archer');
const k = new unit('knight');

const c = new army('chinese');
const c2 = new army('chinese');
const e = new army('english');
const e2 = new army('english');
const b = new army('byzantines');
const b2 = new army('byzantines');
