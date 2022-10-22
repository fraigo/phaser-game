
var NMONSTER=2;
var NMUMMIES=2;
var LIVES = 3;
var STAGE = 1;
var MINX=700;
var MAXX=900;
var BOSS=1;
var GAREA=new GameArea(40,50,600,210,40,50,50,60);

var ARCHER=false;
var SOLDIER=false;


var config = [
  {
    file: "background1.png",
    name: "back01",
    dim: [],
    scale: [0.75, 0.75],
    step: [0, 0],
    vel: 0,
    anchor: [0, 0],
  },
  {
    file: "coin.png",
    name: "coinLg",
    dim: [32, 32, 6],
    scale: [1, 1],
    step: [0, -1],
    vel: 12,
    anchor: [0.5, 0.5],
  },
  {
    file: "coin.png",
    name: "coinSm",
    dim: [32, 32, 6],
    scale: [0.5, 0.5],
    step: [0, -1],
    vel: 12,
    anchor: [0.5, 0.5],
  },
  {
    file: "coin.png",
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
    file: "bullet.png",
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
    file: "arrow2.png",
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
    file: "magical.png",
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
    file: "bomb.png",
    name: "boom01",
    dim: [50, 100, 14],
    scale: [0.5, 0.5],
    step: [0.3],
    vel: 12,
  },
  {
    file: "boom32wh12.png",
    name: "boom02",
    dim: [32, 32, 12],
    scale: [1, 1],
    step: [0.3],
    vel: 12,
  },
  {
    file: "boom32wh12.png",
    name: "boom03",
    dim: [32, 32, 12],
    scale: [0.5, 0.5],
    step: [0.2],
    vel: 12,
  },
  {
    file: "archer1.png",
    name: "archer01",
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
    file: "soldier1.png",
    name: "soldier01",
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
    file: "wizard.png",
    name: "wizard",
    dim: [32, 32, 3],
    scale: [0.8, 0.8],
    step: [0],
    vel: [4],
    health: 200,
    group: "soldiers",
    hasText: true,
    shoot: "magical",
    area: "blank02",
    dragArea: GAREA,
    shootEvent: "xinputDown",
  },
  {
    file: "metalslug_monster.png",
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
    file: "metalslug_mummy.png",
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
    file: "metalslug_monster.png",
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
  { file: "lazer.wav", name: "shoot1" },
  { file: "hit.wav", name: "shoot2" },
  { file: "burn.wav", name: "damage" },
  { file: "burn.wav", name: "damage2" },
];

var stage = [{ img: "back01", x: 0, y: 0 }];
