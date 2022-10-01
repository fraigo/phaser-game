var _DEBUG=1;
var ZOOM=1;
var BLANK='blank.png';

var score;
var stage;
var lives;
var items=[];
var images=[];
var sounds=[];
var groups=[];

function GameArea(x,y,w,h,dx,dy,sx,sy){
	
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.dx=dx;
	this.dy=dy;
	this.sx=sx;
	this.sy=sy;
	
	this.rect=function(){
		return new Phaser.Rectangle(this.x,this.y,this.w,this.h);
	}

	this.rx=function(x){
		return x*this.dx+this.sx;
	}
	
	this.ry=function(y){
		return y*this.dy+this.sy;
	}
	
	this.cx=function(x){
		return this.rx(Math.round((x-this.sx)/this.dx));
	}
	
	this.cy=function(y){
		return this.ry(Math.round((y-this.sy)/this.dy));
	}
}


function IBehavior(){

    this.stepx = 0;
	this.stepy = 0;
	this.x = 0;
	this.y = 0;
	this.anchorx = 0.5;
	this.anchory = 0.5;
	this.width = 0;
	this.height = 0;
	this.images = 0;
	this.scalex = 1;
	this.scaley = 1;
	this.velocity = 10;
	this.text = false;
	this.shoot = false;
	this.shootEvent = false;
	this.firing=0;
	
	this.config=function(item){
		
	}	
	
	this.move=function(item){
		item.x+=this.stepx*ZOOM;
		item.y+=this.stepy*ZOOM;
		if (item.text){
			item.text.x+=this.stepx*ZOOM;
			item.text.text=this.getText(item);
		}
	}
	
	this.getText=function(item){
		return (item.health);
	}
	
	this.kill=function(item){
		item.kill();	
		if (this.killSound){
			sounds[this.killSound].volume=1;		
			sounds[this.killSound].play();				
		}
		if (item.text){
			item.text.kill();
		}
		if (item.area){
			item.area.kill();
		}
		if (this.die){
			addItem(images[this.die],item.x/ZOOM,item.y/ZOOM,animationKill);			
		}
		if (this.onKill){
			this.onKill(item);
		}
	}

	this.damaged=function(item){
		if (this.damage){
			addItem(images[this.damage],item.x/ZOOM,item.y/ZOOM,animationKill);		
		}
		if (this.damageSound){
			sounds[this.damageSound].volume=1;
			sounds[this.damageSound].play();	
			sounds[this.damageSound].fadeOut(500);				
		}
	}
	
	this.fire=function(item){
		if (this.shoot && !item.firing){
			var shoot1=images[this.shoot];
			item.firing=90+Math.round(Math.random()*5);
			var shotItem=addItem(shoot1,item.x/ZOOM+(item.width/2)/ZOOM,item.y/ZOOM);
			shotItem.fired=item;
			if (this.fireSound){
				sounds[this.fireSound].volume=1;
				sounds[this.fireSound].play();	
				sounds[this.fireSound].fadeOut(500);				
			}
		}
	}
	
}



function getValue(obj,def){
	if (typeof(obj)=="undefined") return def;
	return obj;
}



function getConfig(item,id){
	if (item.config){
		return item.config;
	}
	var obj=new IBehavior();
	var parts=item.file.split(".");
	obj.name=getValue(item.name,parts[0]);

	obj.id="img"+getValue(id,"");
	obj.filename=item.file;
	
	
	obj.width=getValue(item.dim[0],0)*1;
	obj.height=getValue(item.dim[1],0)*1;
	obj.images=getValue(item.dim[2],0)*1;
	
	
	obj.x=getValue(item.x,0)*1;
	obj.y=getValue(item.y,0)*1;
	
	obj.scalex=getValue(item.scale[0],1)*1;
	obj.scaley=getValue(item.scale[1],1)*1;
	
	obj.stepx=getValue(item.step[0],obj.stepx)*1;
	obj.stepy=getValue(item.step[1],obj.stepy)*1;
	
	obj.velocity=getValue(item.vel,0)*1;
	
	if (item.group){
		obj.group=item.group;		
	}

	if (item.anchor){
	obj.anchorx=getValue(item.anchor[0],0.5)*1;
	obj.anchory=getValue(item.anchor[1],0.5)*1;
	}
	
	obj.shoot=item.shoot;
	obj.shootEvent=item.shootEvent;
	obj.area=item.area;
	obj.health=getValue(item.health,1)*1;
	obj.power=getValue(item.power,1)*1;
	obj.hasText=item.hasText;
	obj.die=item.die;
	obj.damage=item.damage;
	obj.onKill=item.onKill;
	obj.onLoop=item.onLoop;
	obj.damageSound=item.damageSound;
	obj.dieSound=item.dieSound;
	obj.fireSound=item.fireSound;
	obj.dragArea=item.dragArea;
	
	item.config=obj;
	return obj;	
}



function addItem(config,newx,newy,loopFunc){
	configx=getValue(newx,config.x)*ZOOM;
	configy=getValue(newy,config.y)*ZOOM;
	loopFunc=getValue(loopFunc,config.onLoop);
	var item = game.add.sprite(configx, configy, config.name, 1);
	item._behavior=config;
	item.smoothed = false;
	item.health=config.health;
	item.power=config.power;
	item.anchor.set(config.anchorx,config.anchory);
	if (config.shootEvent=="inputDown"){
		item.inputEnabled = true;
    	item.events.onInputDown.add(function(ev){ shootEvent(item); }, this);
	}
	if (_DEBUG && config.hasText){
		var text=game.add.text(configx-config.width*ZOOM/2, configy+config.height*ZOOM/2, config.name, { fill: 'white', font : '8px Arial' });
		item.text=text;		
	}
	
	item.scale.set(config.scalex*ZOOM,config.scaley*ZOOM);
	if (config.images>0 && config.velocity>0){
		var anim = item.animations.add('walk'+config.id);
		//anim.onStart.add(animationStarted, this);
		if (loopFunc){
			anim.onLoop.add(loopFunc, this);			
		}
		//anim.onComplete.add(animationStopped, this);
		anim.play(config.velocity, true);		
	}
	if (item._behavior.dragArea){
		item.inputEnabled=true;
		item.input.enableDrag(true);
		item.startX=item.x;
		item.startY=item.y;
		item.events.onDragStart.add(function(item){ 
				console.log(item.getBounds());
			}
		,this);	
		item.events.onDragStop.add(function(sp){ 
				console.log('dragStop',sp)
				if(!sp._behavior.dragArea.rect().intersects(sp.getBounds())){
					var posItems = items.filter(function(item1){
						return item1.x==sp.startX && item1.y==sp.startY
					})
					console.log('items1',posItems[0])
					sp.x=sp.startX;
					sp.y=sp.startY;
				}else{
					var px = sp._behavior.dragArea.cx(item.x);
					var py = item.y=sp._behavior.dragArea.cy(item.y);
					var posItems = items.filter(function(item1){
						var existing = item1.x==px && item1.y==py
						if (existing){
							console.log('Existing ',item1)
						}
						return existing && item1.health>0
					})
					if (posItems && posItems.length){
						sp.x=sp.startX;
						sp.y=sp.startY;
						return;
					}
					item.x=px;
					item.y=py;
					item.startX=item.x;
					item.startY=item.y;
					sp.input.disableDrag();
					if (sp._behavior.area && !sp.area){
						sp.area=addItem(images[sp._behavior.area],(sp.x+sp.width/2)/ZOOM,sp.y/ZOOM);
						sp.area.rel=sp;
					}			
					if (item._behavior.onDrop){
						item._behavior.onDrop(item);
					}
				}
			}
		,this);	
	}
	items.push(item);
	if(config.group){
		var grp=createGroup(config.group);
		var grpObj=grp.add(item);
        grpObj.name = config.group + configx + '.' + configy;
        grpObj.body.immovable = true;
		//grpObj.body.offset=new Phaser.Point(30,0);
	}
	return item;
}



function preloadImages(config) {
	var i;
	for(i=0;i<config.length;i++){
		var cfg=getConfig(config[i],i);
		images[cfg.name]=cfg;
		if (cfg.width){
			sp=game.load.spritesheet(cfg.name, cfg.filename,cfg.width,cfg.height,cfg.images);
		}else{
			game.load.image(cfg.name, cfg.filename);
		}
		
	}

}

function preloadAudio(config) {
	var i;
	for(i=0;i<config.length;i++){
		var cfg=(config[i]);
		if (true){
			game.load.audio(cfg.name, cfg.file);
		}
	}

}



function createGroup(name){
	var grp;
	if (groups[name]){
		return groups[name];
	}
	grp = game.add.group();
    grp.enableBody = true;
    grp.physicsBodyType = Phaser.Physics.ARCADE;
	groups[name]=grp;
	return grp;
}

function posArray(e,value,result){
	var totalpos=((e.maxx-e.minx)/e.dx)*((e.maxy-e.miny)/e.dy);
	var maxp=e.repeat/(totalpos);
			
	var mx=0;
	var my=0;
	var total=0;
	var used=0;
	var prob=false;
	if (!result){
		result=new Array();		
	}
	while(used<e.repeat){
		for(my=e.miny;my<=e.maxy;my+=e.dy){
			for(mx=e.minx;mx<=e.maxx;mx+=e.dx){
				prob=(Math.random()<maxp);
				if(prob && !result[my*10000+mx]){
					result[my*10000+mx]=value;
					used++;
				}
				if(typeof(result[my*10000+mx])=="undefined"){
					result[my*10000+mx]=false;
				}
				total++;
				if(used>=e.repeat){
					break;
				}
			}
			if(used>=e.repeat){
				break;
			}
		}
	}
	//console.log(result);
	return result;
}

function createImages(stage) {

	var i;
	var item;
	var count=0;
	
	for(i=0;i<stage.length;i++){
		var e=stage[i];
		if (e.repeat>0){
			
			var pos=posArray(e,e.img);
			for(my=e.miny;my<=e.maxy;my+=e.dy){
				for(mx=e.minx;mx<=e.maxx;mx+=e.dx){
					if (pos[my*10000+mx]==e.img){
						addItem(images[e.img],mx,my);
						count++;
					}
				}
			}
			console.log(e.repeat+" "+count);
			/*
			var n=0;
			for(n=0;n<e.repeat;n++){
				var mx=Math.round(((e.maxx-e.minx)/e.dx)*Math.random())*e.dx+e.minx;
				var my=Math.round(((e.maxy-e.miny)/e.dy)*Math.random())*e.dy+e.miny;
				addItem(images[e.img],mx,my);
			}
			*/
		}else{ 
			addItem(images[e.img],e.x,e.y);
			count++;
		}
	}
	return count;

}

function createAudio(config) {
	var i;
	for(i=0;i<config.length;i++){
		var cfg=(config[i]);
		if (true){
			var snd=game.add.audio(cfg.name);
			//snd.allowMultiple=false;
			sounds[cfg.name]=snd;
		}
	}

}



function handleCollisions(group1,group2,handler){
	if (handler==null) handler=killHandler;
	game.physics.arcade.overlap(groups[group1], groups[group2], handler, collisionChecker, this);
}

function collisionChecker(src,tgt){
	var b1=(src.getBounds());
	var b2=(tgt.getBounds());
	if (b1.x+b1.width<b2.x+b2.width/3) return false;
	return true;
}

function killHandler(src,tgt) {
	src._behavior.kill(src);
    tgt._behavior.kill(tgt);
}

function attackHandler(src,tgt) {
	if (tgt.health>0){
		tgt.health-=src.power;
	}
	src._behavior.kill(src);
	if (tgt.health<=0){
		tgt.health=0;
		tgt._behavior.kill(tgt);
	}else{
		tgt._behavior.damaged(tgt);
	}
}

function handleMoves(){
	
	for(i=0;i<items.length;i++){
		items[i]._behavior.move(items[i]);	
		if (items[i].firing) items[i].firing--;		
	}
}

function shootEvent(item) {
	item._behavior.fire(item);	
}

function shootZone(item) {
	if (item.rel)
    item.rel._behavior.fire(item.rel);
}

function animationKill(sprite,anim){
	if (anim.loopCount==1){
		sprite._behavior.kill(sprite);		
	}
}

function animationKill2(sprite,anim){
	if (anim.loopCount==2){
		sprite.kill();		
	}
}

function killOnExit(sprite,anim){
	if (sprite.x>game.world.bounds.width-100){
		sprite.kill();
	}
}