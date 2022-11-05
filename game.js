function numbers(num,base){
	if (!base) base=1000000000;
	num=""+(base+num);
	num=num.substring(1);
	return num;
}

function setScore(item){
	enemyCount.text=enemyCount.text*1-1;
	var cnt=Math.round(Math.random()*(item._behavior.health/15))*10;
	setScoreValue(item._behavior.health*10,cnt);
	if (cnt==10){
		addItem(images['coinSm'],item.x,item.y,animationKill2);
	}
	if (cnt>10){
		addItem(images['coinLg'],item.x,item.y,animationKill2);
	}
	console.log(item);
	if (enemyCount.text=='0'){
		stage.text=stage.text*1+1;
		STAGE = stage.text
		NMONSTER+=1+Math.round(stage.text/2);
		NMUMMIES+=1+Math.round(stage.text/2);
		MAXX+=60;
		BOSS++;
		var num=createImages(getStage());
		createImages(getBonus());
		enemyCount.text=num;
	}
}

function checkPos(item){
	if (item.x<40){
		if (lives.text>=1){
			lives.text=(lives.text*1)-1;
		}
		if (lives.text=='0'){
			var tx1=game.add.text(game.width/2, game.height/3, 'GAME OVER', { fill: 'brown', font : '72px Arial' ,boundsAlignH:'center'});
			tx1.setTextBounds(0,0,10,10);
			var tx2=game.add.text(game.width/2+5, game.height/3+5, 'GAME OVER', { fill: 'red', font : '72px Arial' ,boundsAlignH:'center'});
			tx2.setTextBounds(0,0,10,10);
			var tryAgain=game.add.text(game.width/2, game.height/2+30, 'TRY AGAIN', { fill: 'green', font : '24px Arial' ,boundsAlignH:'center'});
			tryAgain.setTextBounds(0,0,10,10);
			tryAgain=game.add.text(game.width/2+4, game.height/2+34, 'TRY AGAIN', { fill: 'green', font : '24px Arial' ,boundsAlignH:'center'});
			tryAgain.setTextBounds(0,0,10,10);
			tryAgain=game.add.text(game.width/2+2, game.height/2+32, 'TRY AGAIN', { fill: 'white', font : '24px Arial' ,boundsAlignH:'center'});
			tryAgain.setTextBounds(0,0,10,10);
			tryAgain.inputEnabled = true;
			tryAgain.events.onInputDown.add(function(ev){ game.paused=true; document.location.reload(); }, this);
			gameOver=true;
			
		}else{
			item._behavior.kill(item);
		}
	}
}


function damageSoldier(soldier,enemy){
     soldier.health-=1;
     if (soldier.health<=0) soldier._behavior.kill(soldier);
}



function pauseGame(){
	
			var tx1=game.add.text(game.width/2, game.height/3, 'PAUSED', { fill: 'gray', font : '72px Arial' ,boundsAlignH:'center'});
			tx1.setTextBounds(0,0,10,10);
			var tx2=game.add.text(game.width/2, game.height/3, 'PAUSED', { fill: 'white', font : '72px Arial' ,boundsAlignH:'center'});
			tx2.setTextBounds(0,0,10,10);
			game.paused=true;
}

function rx(x){
		return GAREA.rx(x);
}
function ry(y){
		return GAREA.ry(y);
}


function getStage(){
	var stage1=[
		{img:'metalslug_monster',repeat:NMONSTER,minx:MINX,miny:60,dx:20,dy:50,maxx:MAXX,maxy:260},
		{img:'metalslug_mummy',repeat:NMUMMIES,minx:MINX,miny:60,dx:20,dy:50,maxx:MAXX,maxy:260},
		{img:'boss',repeat:BOSS,minx:MAXX-(80*Math.round(BOSS/3)),miny:110,dx:80,dy:50,maxx:MAXX+100,maxy:210},		
	];
	for(var key in images){
		item = images[key]
		var isEnemy = (item.group == 'enemies')
		if (isEnemy) {
			var incV = item.velocityInc || 1
			var incH = item.healthInc || 1
			if (!item.defaultHealth){
				item.defaultHealth = item.health
			}
			item.health = item.defaultHealth + STAGE*incH - incH
			if (!item.defaultVel){
				item.defaultVel = item.velocity
			}
			item.velocity = item.defaultVel + STAGE*incV - incV
		}
	}
	return stage1;	
}

function getBonus(){
	var stage1=[
	];
	return stage1;	
}
var game;
function loadGame(){
	ZOOM1=Math.round(document.body.clientWidth*10/550-1)/10;
	//alert(ZOOM1);
	//var style = { font: '14px Arial', fill: '#ff0044', wordWrap: true, wordWrapWidth: sprite.width, align: 'center' };
	game = new Phaser.Game(600*ZOOM, 340*ZOOM, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
}



function preload() {
	
	preloadImages(config);
	preloadAudio(audio);
}


function create() {
	game.scale.maxWidth = 600*ZOOM1;
    game.scale.maxHeight = 340*ZOOM1;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //game.scale.setScreenSize();
	createAudio(audio);
	createImages(stage);
	
	var ttop=1;
	
	tenemyCount=game.add.text(40, ttop, 'Enemies', { fill: 'white', font : '16px Arial' });
	enemyCount=game.add.text(110, ttop, '1', { fill: 'yellow', font : '16px Arial' });
	
	tstage=game.add.text(140, ttop, 'Level', { fill: 'white', font : '16px Arial' });
	stage=game.add.text(190, ttop, STAGE, { fill: '#FF40FF', font : '16px Arial' });
	
	tlives=game.add.text(220, ttop, 'Lives', { fill: 'white', font : '16px Arial' });
	lives=game.add.text(260, ttop, LIVES, { fill: '#40FFFF', font : '16px Arial' });
	
	tscore=game.add.text(game.width-160, ttop, 'Score', { fill: 'yellow', font : '16px Arial' });
	score0=game.add.text(game.width-100+2, ttop+2, "", { fill: '#404040', font : '16px Arial' });
	score=game.add.text(game.width-100, ttop, "", { fill: '#FFFF40', font : '16px Arial' });
	
	var posx = 60;
	for(var key1 in players){
		var value = players[key1]
		game.add.text(posx, 300, ""+images[value].price, { fill: '#FFFF40', font : '12px Arial' });
		posx+=50
	}
	
	var coin=images['coin0'];
	addItem(coin,game.width-250,ttop+9);
	coins=game.add.text(game.width-230, ttop, "0000", { fill: '#FFFF40', font : '16px Arial' });
	coins.value=200;
	score.value=0;
	setScoreValue(0,0);

	var num=createImages(getStage());
	createImages(getBonus());
	enemyCount.text=num;
	
}

function setScoreValue(point,coin){
	console.log(score.value);
	score.value+=point;
	coins.value+=coin;
	console.log(score.value);
	score0.text=numbers(score.value);
	score.text=numbers(score.value);	
	coins.text=numbers(coins.value,1000);	
	
	
	var posx = 50;
	for(var key1 in players){
		var value1 = players[key1]
		if (!window[key1] && coins.value>=images[value1].price	){
			images[value1].onDrop=function(item){ 
				var key = item.key.toUpperCase();
				var cfgItem = window[key]
				console.log('drop', key, item.dropEvent)
				window[key]=false; 
				setScoreValue(0,-images[item.key].price); 
				if (cfgItem.dropEvent){
					cfgItem.dropEvent(item)
				}
			};
			window[key1]=addItem(images[value1],posx,315);

		}
		if (window[key1] && coins.value<images[value1].price){
			window[key1].kill();
			window[key1]=false;
		}
		posx+=50;
	}
	

}

var gameOver=false;
function update() {
	if (!gameOver){
		handleMoves();
		handleCollisions('shoots','enemies',attackHandler);
		handleCollisions('players','enemies',shootZone);
		handleCollisions('soldiers','enemies',damageSoldier);
		
	}
}


function render(){
	if (false &&  _DEBUG)
	for(i=0;i<items.length;i++){
		if (items[i].exists && items[i]._behavior.group)
		game.debug.geom(items[i].getBounds());		
	}
}	