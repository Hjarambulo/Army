//dictionary unit type: [basePoints, trainingCost, trainingPoints, transformationCost]
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
  trainSucces: 'La unidad fue entrenada',
  transformSucces: 'La unidad ha sido transformada',
  transformFail: 'La unidad no puede ser transformada',
  insufficientGold: 'Cantidad de oro insuficiente',
  battleWin: 'Battalla ganada',
  battleLose: 'Batalla perdida',
  battleTie: 'Battalla empatada',
};

let units = ['lancer', 'archer', 'knight'];

class unit {
  constructor(type) {
    this.type = type;
    this.bPoints = unitDict[this.type][0];
    this.trainingCost = unitDict[this.type][1];
    this.trainingPoints = unitDict[this.type][2];
    this.transCost = unitDict[this.type][3];
    this.trainingPower = 0;
  }

  totalPoints() {
    let points = this.bPoints + this.trainingPower;
    return points;
  }

  train() {
    this.trainingPower += this.trainingPoints;
  }

  transform() {
    if (this.type != units[units.length - 1]) {
      this.type = units[units.indexOf(this.type) + 1];
      this.bPoints = unitDict[this.type][0];
      this.trainingCost = unitDict[this.type][1];
      this.trainingPoints = unitDict[this.type][2];
      this.transCost = unitDict[this.type][3];
      return true;
    } else return false;
  }
}

class civilization {
  constructor(type) {
    this.type = type;
    this.gold = 1000;
    this.battleHistory = [];
    this.army = [];
    for (let i = 0; i < units.length; i++) {
      for (let j = 0; j < armyDict[this.type][i]; j++) {
        this.army.push(new unit(units[i]));
      }
    }
  }

  unitTrain(unit) {
    if (this.gold >= this.army[unit].trainingCost) {
      this.gold -= this.army[unit].trainingCost;
      this.army[unit].train();
      return message.trainSucces;
    } else return message.insufficientGold;
  }

  unitTransform(unit) {
    if (this.gold >= this.army[unit].transCost) {
      this.gold -= this.army[unit].transCost;
      if (this.army[unit].transform()) {
        return message.transformSucces;
      } else return message.transformFail;
    } else return message.insufficientGold;
  }

  totalPower() {
    let power = 0;
    this.army.forEach((unit) => (power += unit.totalPoints()));
    return power;
  }

  looseStrongerUnit() {
    let stronger = null;
    let maxPoints = 0;
    this.army.forEach((unit) => {
      if (unit.totalPoints() > maxPoints) {
        maxPoints = unit.totalPoints();
        stronger = unit;
      }
    });
    this.army.splice(this.army.indexOf(stronger), 1);
  }

  looseWeakestUnit() {
    let weakest = null;
    let minPoints = 100;
    this.army.forEach((unit) => {
      if (unit.totalPoints() < minPoints) {
        weakest = unit;
        minPoints = unit.totalPoints();
      }
    });
    this.army.splice(this.army.indexOf(weakest), 1);
  }

  battle(civil2) {
    if (this.totalPower() != civil2.totalPower()) {
      if (this.totalPower() > civil2.totalPower()) {
        this.battleWin();
        civil2.battleLose();
      } else {
        this.battleLose();
        civil2.battleWin();
      }
    } else {
      this.battleTie(civil2);
    }
  }

  battleWin() {
    this.gold += 100;
    this.battleHistory.push(message.battleWin);
  }

  battleLose() {
    this.looseStrongerUnit();
    this.battleHistory.push(message.battleLose);
  }

  battleTie(civil2) {
    this.looseWeakestUnit();
    this.battleHistory.push(message.battleTie);
    civil2.looseWeakestUnit();
    civil2.battleHistory.push(message.battleTie);
  }
}

const l = new unit('lancer');
const a = new unit('archer');
const k = new unit('knight');

const c = new civilization('chinese');
const c2 = new civilization('chinese');
const e = new civilization('english');
const e2 = new civilization('english');
const b = new civilization('byzantines');
const b2 = new civilization('byzantines');
