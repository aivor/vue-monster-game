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
    },
    attack: function () {
      let damage = this.calculateDamage;
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
      this.monsterHealth -= this.calculateDamage(10, 20);
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    monsterAttacks: function () {
      let damage = this.calculateDamage;
      this.playerHealth -= damage;

      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits player for" + damage,
      });
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }

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
