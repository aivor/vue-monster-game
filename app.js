new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameisRunning: false,
  },
  methods: {
    startGame: function () {
      this.gameisRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function () {
      this.monsterHealth -= this.calculateDamage(3, 10);
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
      this.playerHealth -= this.calculateDamage(5, 12);

      this.checkWin();
    },
    heal: function () {},
    giveUp: function () {},
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
