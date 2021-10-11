## This is a model exercise of armys.

Each army has 3 diferent kinds of units:
-Pikeman
-Archer
-Knight
Each one has his own stats and the hability to train and transform for a price in gold(except for the knight who can't transform).

Exist 3 differents kinds civilizations that an army can be part of:
-Chinese
-English
-Byzantines

Each army has the ability to attack another army any time, even if they share civilization, with the next consequences:
-The winner gets 100 gold.
-The loser lose the 2 strongest units in his army.
-If the battle is tied both armys lose the weakest unit they posses.

## Comands:

Unit Commands:
.totalPoints() = calculate the total points of the unit.
.train() = train the unit.
.transform() = transform the unit.

Army Commands:
.totalPower() = calculate the total power of the army.
.unitTrain(unit) = active the command .train() of a unit in the army.
.unitTransform(unit) = active the command .transform() of a unit in the army.
.battle(defender) = starts a battle with the defender.
