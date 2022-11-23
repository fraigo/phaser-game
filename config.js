
var NMONSTER=2;
var NMUMMIES=2;
var LIVES = 3;
var STAGE = 1;
var MINX=700;
var MAXX=900;
var BOSS=1;
var GAREA=new GameArea(40,50,600,210,40,50,50,60);




var config = [
  {
    file: "img/background1.png",
    name: "back01",
    dim: [],
    scale: [0.75, 0.75],
    step: [0, 0],
    vel: 0,
    anchor: [0, 0],
  },
  {
    file: "img/coin.png",
    name: "coinLg",
    dim: [32, 32, 6],
    scale: [1, 1],
    step: [0, -1],
    vel: 12,
    anchor: [0.5, 0.5],
  },
  {
    file: "img/coin.png",
    name: "coinSm",
    dim: [32, 32, 6],
    scale: [0.5, 0.5],
    step: [0, -1],
    vel: 12,
    anchor: [0.5, 0.5],
  },
  {
    file: "img/coin.png",
    name: "coin0",
    dim: [32, 32, 6],
    scale: [0.5, 0.5],
    step: [0, 0],
    vel: 6,
    anchor: [0.5, 0.5],
  },
  {
    file: BLANK,
    name: "blank01",
    dim: [],
    scale: [1.0, 0.1],
    step: [0],
    vel: 0,
    anchor: [0, 0.5],
    group: "players",
  },
  {
    file: BLANK,
    name: "blank02",
    dim: [],
    scale: [2.5, 0.2],
    step: [0],
    vel: 0,
    anchor: [0, 0.5],
    group: "players",
  },
  {
    file: "img/bullet.png",
    name: "bullet01",
    dim: [54, 17, 1],
    scale: [0.5, 0.5],
    step: [2],
    vel: 1,
    group: "shoots",
    power: 3,
    die: "boom03",
    onLoop: killOnExit,
  },
  {
    file: "img/arrow2.png",
    name: "arrow01",
    dim: [88, 41, 4],
    scale: [-0.5, 0.5],
    step: [2.5],
    vel: 8,
    group: "shoots",
    power: 8,
    die: "boom02",
    onLoop: killOnExit,
  },
  {
    file: "img/magical.png",
    name: "magical",
    dim: [34, 38, 15],
    scale: [-0.5, 0.5],
    step: [2.5],
    vel: 10,
    group: "shoots",
    power: 8,
    die: "boom02",
    onLoop: killOnExit,
  },
  {
    file: "img/fire1.png",
    name: "fire1",
    dim: [32, 32, 4],
    scale: [0.75, 0.75],
    step: [1.6],
    vel: 2,
    group: "shoots",
    power: 12,
    onLoop: killOnExit,
  },
  {
    file: "img/rock1.png",
    name: "rock1",
    dim: [50, 50, 1],
    scale: [0.4, 0.4],
    step: [1.6],
    vel: 2,
    group: "shoots",
    power: 10,
    rotation: 0.1,
    onLoop: killOnExit,
  },
  {
    file: "img/bomb.png",
    name: "boom01",
    dim: [50, 100, 14],
    scale: [0.5, 0.5],
    step: [0.3],
    vel: 12,
  },
  {
    file: "img/boom32wh12.png",
    name: "boom02",
    dim: [32, 32, 12],
    scale: [1, 1],
    step: [0.3],
    vel: 12,
  },
  {
    file: "img/boom32wh12.png",
    name: "boom03",
    dim: [32, 32, 12],
    scale: [0.5, 0.5],
    step: [0.2],
    vel: 12,
  },
  {
    file: "img/soldier1.png",
    name: "soldier01",
    price: 30,
    dim: [32, 48, 4],
    scale: [0.8, 0.8],
    step: [0],
    vel: [4],
    health: 200,
    group: "soldiers",
    hasText: true,
    shoot: "bullet01",
    area: "blank02",
    dragArea: GAREA,
    shootEvent: "xinputDown",
  },
  {
    file: "img/archer1.png",
    name: "archer01",
    price: 100,
    dim: [32, 48, 4],
    scale: [0.8, 0.8],
    step: [0],
    vel: [4],
    health: 200,
    group: "soldiers",
    hasText: true,
    shoot: "arrow01",
    area: "blank01",
    dragArea: GAREA,
    shootEvent: "xinputDown",
  },
  {
    file: "img/wizard.png",
    name: "wizard",
    price: 150,
    dim: [32, 32, 3],
    scale: [0.8, 0.8],
    step: [0],
    vel: [4],
    health: 300,
    group: "soldiers",
    hasText: false,
    shoot: "magical",
    area: "blank02",
    dragArea: GAREA,
    shootEvent: "xinputDown",
  },
  {
    file: "img/wizard2.png",
    name: "wizard2",
    price: 200,
    dim: [32, 48, 12],
    frames: [8,9,10,11],
    scale: [0.75, 0.75],
    step: [0],
    vel: [3],
    health: 400,
    group: "soldiers",
    hasText: false,
    shoot: "fire1",
    area: "blank02",
    dragArea: GAREA,
    dropEvent: function(item){
      console.log('dropEvent', item);
    },
    shootEvent: "xinputDown",
  },
  {
    file: "img/alien.png",
    name: "alien",
    price: 150,
    dim: [64, 64, 273],
    frames: [143,144,145,146,147,148,149,150,151],
    scale: [0.666, 0.666],
    step: [0],
    vel: [9],
    health: 400,
    group: "soldiers",
    hasText: false,
    shoot: "rock1",
    area: "blank02",
    dragArea: GAREA,
    dropEvent: function(item){
      console.log('dropEvent', item);
    },
    shootEvent: "xinputDown",
  },
  {
    file: "img/metalslug_monster.png",
    dim: [39, 40, 16],
    scale: [-1, 1],
    step: [-0.4],
    health: 20,
    vel: [12],
    velocityInc: 1,
    healthInc: 2,
    hasText: true,
    group: "enemies",
    die: "boom03",
    damageSound: "damage",
    dieSound: "damage",
    onKill: function (item) {
      setScore(item);
    },
    onLoop: function (item) {
      checkPos(item);
    },
  },
  {
    file: "img/metalslug_mummy.png",
    dim: [38, 46, 18],
    scale: [-1, 1],
    step: [-0.3],
    health: 30,
    vel: [10],
    hasText: true,
    velocityInc: 1,
    healthInc: 2,
    group: "enemies",
    die: "boom03",
    damageSound: "damage",
    dieSound: "damage",
    onKill: function (item) {
      setScore(item);
    },
    onLoop: function (item) {
      checkPos(item);
    },
  },
  {
    file: "img/metalslug_monster.png",
    name: "boss",
    dim: [39, 40, 16],
    scale: [-4, 4],
    step: [-0.2],
    health: 100,
    vel: [4],
    hasText: true,
    velocityInc: 3,
    healthInc: 10,
    group: "enemies",
    die: "boom01",
    damageSound: "damage",
    dieSound: "damage",
    onKill: function (item) {
      setScore(item);
    },
    onLoop: function (item) {
      checkPos(item);
    },
  },
];

var audio = [
  { file: "sound/lazer.wav", name: "shoot1" },
  { file: "sound/hit.wav", name: "shoot2" },
  { file: "sound/burn.wav", name: "damage" },
  { file: "sound/burn.wav", name: "damage2" },
];

var stage = [{ img: "back01", x: 0, y: 0 }];

var players = {}

for (var idx1 in config){
  var cfg1 = config[idx1]
  if (cfg1.price && cfg1.group=='soldiers'){
    players[cfg1.name.toUpperCase()] = cfg1.name
  }
}

for(var key in players){
  window[key] = false
}
