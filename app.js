new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameisRunning: false,
    turns: [],
  },
  methods: {
    startGame: function () {
      this.gameisRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function () {
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster for" + damage,
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    specialAttack: function () {
      let damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster hard for" + damage,
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    monsterAttacks: function () {
      let damage = this.calculateDamage(5, 11);
      this.playerHealth -= damage;

      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits player hard for" + " " + damage,
      });
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player heals for 10",
      });
      this.monsterAttacks();
    },
    giveUp: function () {
      this.gameisRunning = false;
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You won !! New Game??")) {
          this.startGame();
        } else {
          this.gameisRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("Sorry!! You lost New Game?")) {
          this.startGame();
        } else {
          this.gameisRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});
