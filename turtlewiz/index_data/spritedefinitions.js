var animations = {
	player: {
                spriteLeftAnim: new Animation(['1,1', '1,0'], 200),   //Added By Oroton
                spriteRightAnim: new Animation(['0,1', '0,0'], 200),   //Added By Oroton
                spriteUpAnim:new Animation(['2,1', '2,0'], 200),   //Added By Oroton
                spriteDownAnim: new Animation(['3,0', '3,1'], 200)   //Added By Oroton
	},
	environment: {
                 enviroRainDown:  new Animation(['3,0'], 200),   //Added By Oroton
                 enviroSnowDown:  new Animation(['2,0'], 200),   //Added By Oroton
                 enviroSandLeft:  new Animation(['5,0'], 200),   //Added By Oroton
                 enviroSandRight: new Animation(['5,0'], 200)   //Added By Oroton
       }


}


var enviroRainDown = new Animation(['3,0', '3,0'], 200);   //Added By Oroton
var enviroSnowDown = new Animation(['2,0', '2,0'], 200);   //Added By Oroton
var enviroSandLeft = new Animation(['5,0', '5,0'], 200);   //Added By Oroton
var enviroSandRight = new Animation(['5,0', '5,0'], 200);   //Added By Oroton

var mapChestAnim = new Animation(['3,0'], 200);   //Added By Oroton

var chestAnim = new staticObj(['3,0']);

var spriteDefinitions = {
	turtle: new SpriteDefinition(
		tilesets.turtle,
		{
                        'left':  animations.player.spriteLeftAnim,
                        'right': animations.player.spriteRightAnim,
                        'down':  animations.player.spriteDownAnim,
                        'up':    animations.player.spriteUpAnim
                }, //Added by Oroton,
		300, //200?
		5,
		true,
		true
	),
	chest: new SpriteDefinition(
		tilesets.maptiles,
		{
                  down: new staticObj(['3,0'])
                }
	),
	girlturtle: new SpriteDefinition(
		tilesets.girlturtle,
		{
			right: new staticObj(['0,0']),
			left: new staticObj(['1,0']),
			up: new staticObj(['2,0']),
			down: new staticObj(['3,0'])
		},
		375,
		1,
		false,
		false
	),
	dragon: new SpriteDefinition(
		tilesets.dragon,
		{
			right: new staticObj(['0,0']),
			left: new staticObj(['1,0']),
			dead: '2,0'
		},
		375,
		40
	),
	hedgehog: new SpriteDefinition(
		tilesets.hedgehog,
		{
			left: new staticObj(['0,0']),
			right: new staticObj(['1,0'])
		},
		100
	),
	axe: new SpriteDefinition(
		tilesets.axe,
		{
			up: new staticObj(['0,0']),
			right: new staticObj(['1,0']),
			down: new staticObj(['2,0']),
			left: new staticObj(['3,0'])
		}
	),
	ogre: new SpriteDefinition(
		tilesets.ogre,
		{
			down: new staticObj(['0,0'])
		}
	),
	fireball: new SpriteDefinition(
		tilesets.fireball,
		{
			left: new staticObj(['2,0']),
			up: new staticObj(['3,0']),
			right: new staticObj(['0,0']),
			down: new staticObj(['1,0'])
		},
		1200,
		1,
		false,
		false,
		['projectile']
	),
	brownwizard: new SpriteDefinition(
		tilesets.brownwizard,
		{
			left: new staticObj(['0,0']),
			right: new staticObj(['1,0'])
		},
		100
	),
	lavasnail: new SpriteDefinition(
		tilesets.lavasnail,
		{
			left: new staticObj(['0,0']),
			right: new staticObj(['1,0']),
			down: new staticObj(['2,0']),
			up: new staticObj(['3,0'])
		},
		50,
		2,
		true,
		false,
		[],
		function(mod) {
			if (this.collides(sprites.player) && !sprites.player.invincible) {
				this.bumpPlayer(this.currentState, 50);
				sprites.player.health -= 1;
				sprites.player.invincible = true;
				sprites.player.invincibleTimer = Date.now();
			}
			if (this.collides(sprites.fireball)) {
				if (this.speed < 200) {
					this.speed += 25;
				}
				sprites.fireball.kill = true;
				this.bump(sprites.fireball.currentState, 50);
				this.invincible = true;
				this.invincibleTimer = Date.now();
			}
			if (this.collides(sprites.axe)) {
				this.health -= 1;
				this.bump(sprites.axe.currentState, 50);
				this.invincible = true;
				this.invincibleTimer = Date.now();
				sprites.axe.kill = true;
			}
		}
	),
	torch: new SpriteDefinition(
		tilesets.maptiles,
		{
			unlit: new staticObj(['2,4']),
			lit: new staticObj(['3,4'])
		},
		0,
		1,
		false,
		false,
		[],
		function(mod) {
			if (this.collides(sprites.fireball)) {
				this.currentState = 'lit';
			}
		}
	),
	lavaspitter: new SpriteDefinition(
		tilesets.lavaspitter,
		{
			down: new staticObj(['0,0'])
		},
		25,
		3,
		false,
		false,
		[],
		function(mod) {
			
		}
	),
	lavaspitterball: new SpriteDefinition(
		tilesets.projectiles,
		{
			left: new staticObj(['0,0']),
			up: new staticObj(['0,0']),
			right: new staticObj(['0,0']),
			down: new staticObj(['0,0'])
		},
		450,
		1,
		false,
		false,
		['projectile'],
		function(mod) {
			if (this.collides(sprites.player) && !sprites.player.invincible) {
				sprites.player.health -= 1;
				sprites.player.invincible = true;
				sprites.player.invincibleTimer = Date.now();
				this.kill = true;
			}
			if (this.mapX != game.mapXPos) {
				this.kill = true;
			}
		}
	),
	lavasnake: new SpriteDefinition(
		tilesets.lavasnake,
		{
			grey: new staticObj(['1,0']),
			left: new staticObj(['0,0']),
			up: new staticObj(['0,0']),
			right: new staticObj(['0,0']),
			down: new staticObj(['0,0'])
		},
		100,
		7,
		true,
		false,
		[],
		function(mod) {
			
		}
	),
	lavasnakeminion: new SpriteDefinition(
		tilesets.lavasnakeminion,
		{
			left: new staticObj(['0,0']),
			up: new staticObj(['0,0']),
			right: new staticObj(['0,0']),
			down: new staticObj(['0,0'])
		},
		150,
		1,
		true,
		false,
		[],
		function(mod) {
			if (this.collides(sprites.axe)) {
				this.health -= 1;
				this.invincible = true;
				this.invincibleTimer = Date.now();
				sprites.axe.kill = true;
			}
			if (this.collides(sprites.player)) {
				sprites.player.health -= 1;
				sprites.player.invincible = true;
				sprites.player.invincibleTimer = Date.now();
				this.bumpPlayer(sprites.player.oppositeDirection(), 50);
			}
		}
	),
	snowflake: new SpriteDefinition(
		tilesets.projectiles,
		{
			left: new staticObj(['1,0']),
			up: new staticObj(['1,0']),
			right: new staticObj(['1,0']),
			down: new staticObj(['1,0'])
		},
		1200,
		1,
		false,
		false,
		['projectile']
		
	),
	whale: new SpriteDefinition(
		tilesets.whale,
		{
			left: new staticObj(['0,0'])
		},
		50
	),

	environment: {
		raindrop: new SpriteDefinition(
			tilesets.projectiles,
			{
				down: animations.environment.enviroRainDown
			},
			300,
			1,
			false,
			false,
			['projectile', 'precip']
		),
		snowflake: new SpriteDefinition(
			tilesets.projectiles,
			{
				down: animations.environment.enviroSnowDown
			},
			75,
			1,
			false,
			false,
			['projectile', 'precip']
		),
		sandgrain: new SpriteDefinition(
			tilesets.projectiles,
			{
				left:  animations.environment.enviroSandLeft,
				right: animations.environment.enviroSandRight
			},
			250,
			1,
			false,
			false,
			['projectile', 'precip']
		)
	},
	purplespell: new SpriteDefinition(
		tilesets.projectiles,
		{
			left: new staticObj(['4,0']),
			up: new staticObj(['4,0']),
			right: new staticObj(['4,0']),
			down: new staticObj(['4,0'])
		},
		1200,
		1,
		false,
		false,
		['projectile']
	),
	portal: new SpriteDefinition(
		tilesets.maptiles,
		{
			active: new staticObj(['4,5']),
			sand: new staticObj(['0,8'])
		},
		1
	),
	smash: new SpriteDefinition(
		tilesets.smash,
		{
			down: new staticObj(['0,0'])
		}
	),
	chicken: new SpriteDefinition(
		tilesets.chicken,
		{
			left: new staticObj(['0,0']),
			right: new staticObj(['1,0'])
		},
		50
	),
	brownchicken: new SpriteDefinition(
		tilesets.chicken,
		{
			left: new staticObj(['2,0']),
			right: new staticObj(['3,0'])
		},
		50
	),
	scorpion: new SpriteDefinition(
		tilesets.scorpion,
		{
			left: new staticObj(['0,0']),
			right: new staticObj(['1,0'])
		},
		75,
		5,
		true,
		false,
		[],
		function(mod) {
			if (this.collides(sprites.fireball)) {
				this.health -= 2;
				this.invincible = true;
				this.invincibleTimer = Date.now();
				sprites.fireball.kill = true;
			}
			if (this.collides(sprites.snowflake)) {
				this.health -= 1;
				this.invincible = true;
				this.invincibleTimer = Date.now();
				sprites.snowflake.kill = true;
			}
			if (this.collides(sprites.axe)) {
				this.health -= 1;
				this.invincible = true;
				this.invincibleTimer = Date.now();
				sprites.axe.kill = true;
			}
			if (this.collides(sprites.player)) {
				sprites.player.health -= 1;
				sprites.player.invincible = true;
				sprites.player.invincibleTimer = Date.now();
				this.bumpPlayer(sprites.player.oppositeDirection(), 50);
			}
		}
	),
	poisonspit: new SpriteDefinition(
		tilesets.projectiles,
		{
			left: new staticObj(['6,0']),
			up: new staticObj(['6,0']),
			right: new staticObj(['6,0']),
			down: new staticObj(['6,0'])
		},
		400,
		1,
		false,
		false,
		['projectile'],
		function(mod) {
			if (this.collides(sprites.snowflake)) {
				this.kill = true;
				sprites.snowflake.kill = true;
			}
			if (this.collides(sprites.fireball)) {
				this.kill = true;
				sprites.fireball.kill = true;
			}
			if (this.collides(sprites.player) && !sprites.player.invincible) {
				sprites.player.health -= 1;
				sprites.player.invincible = true;
				sprites.player.invincibleTimer = Date.now();
				this.kill = true;
			}
		}
	),
	hammeritem: new SpriteDefinition(
		tilesets.hammer,
		{
			up: new staticObj(['0,0'])
		},
		1,
		1,
		false,
		false,
		[],
		function(mod) {
			if (this.collides(sprites.player) && eng.keysDown[32]) {
				this.kill = true;
				sprites.player.inventory.push('hammer');
				eng.setMessage('Player got the hammer!');
			}
		}
	),
	hammer: new SpriteDefinition(
		tilesets.hammer, 
		{
		 up: new staticObj(['0,0']),
		 right: new staticObj(['1,0']),
		 down: new staticObj(['2,0']),
		 left: new staticObj(['3,0'])
		}
	),
	scorpionboss: new SpriteDefinition(
		tilesets.scorpionboss,
		{
			left: new staticObj(['0,0']),
			right: new staticObj(['1,0'])
		},
		200,
		10,
		false,
		false,
		[],
		function(mod) {
			if (this.collides(sprites.player) && !sprites.player.invincible) {
				sprites.player.invincible = true;
				sprites.player.invincibleTimer = Date.now();
				sprites.player.health -= 1;
			}
			if (this.collides(sprites.fireball) && !this.invincible) {
				sprites.fireball.kill = true;
				this.health -= 1;
				this.invincible = true;
				this.invincibleTimer = Date.now();
			}
		}
	),
	rock: new SpriteDefinition(
		tilesets.rock,
		{
			left: new staticObj(['0,0']),
			up: new staticObj(['0,0']),
			right: new staticObj(['0,0']),
			down: new staticObj(['0,0'])
		},
		80,
		1,
		false,
		false,
		['projectile'],
		function(mod) {
			if (typeof this.timer == 'undefined') {
				this.timer = Date.now();
				this.lifeSpan = Math.random() * 2000 + 1200;
			}
			if (Date.now() - this.timer > this.lifeSpan) {
				this.kill = true;
				var x = Math.round(this.x / tilesets.maptiles.tileWidth);
				var y = Math.round(this.y / tilesets.maptiles.tileHeight);
				if (x != 0 && x != 11 && y != 0 && y != 9 && game.currentMap.code[x][y] != '3,6') {
					game.currentMap.code[x][y] = '0,6';
				}
				
			}
			if (this.collides(sprites.player) && !sprites.player.invincible) {
				this.kill = true;
				sprites.player.health -= 1;
				sprites.player.invincible = true;
				sprites.player.invincibleTimer = Date.now();
			}
			if (this.collides(sprites.hammer)) {
				this.kill = true;
				sprites.hammer.kill = true;
			}
			if (this.collides(sprites.fireball)) {
				sprites.fireball.kill = true;
			}
		}
	),
	dragontorch: new SpriteDefinition(
		tilesets.maptiles,
		{
			unlit: new staticObj(['5,8']),
			lit: new staticObj(['7,8']),
			frozen: new staticObj(['6,8'])
		},
		0,
		1,
		false,
		false,
		[],
		function(mod) {
			if (this.collides(sprites.fireball)) {
				this.currentState = 'lit';
				//this.timer = Date.now();
				//this.timerSet = true;
			}
			//if (this.currentState == 'lit' && Date.now() - this.timer > 3000) {
			//	this.currentState = 'unlit';
			//}
			if (this.collides(sprites.snowflake)) {
				this.currentState = 'frozen';
			}
		}
	),
	bigfireball: new SpriteDefinition(
		tilesets.bigfireball,
		{
			left: new staticObj(['1,0']),
			right: new staticObj(['0,0'])
		},
		100,
		1,
		false,
		false,
		['projectile'],
		function(mod) {
			this.speed += 250 * mod;
			if (this.collides(sprites.snowflake)) {
				sprites.snowflake.kill = true;
				this.kill = true;
				var x = Math.round(this.x / tilesets.maptiles.tileWidth);
				var y = Math.round(this.y / tilesets.maptiles.tileHeight);
				if (
					x != 0 && x != 11 && y != 0 && y != 9 &&
					game.currentMap.code[x][y] == '1,9'
				) {
					game.currentMap.code[x][y] = '2,11';
				}
			}
			if (this.collides(sprites.player)) {
				this.kill = true;
				if (!sprites.player.invincible) {
					sprites.player.invincible = true;
					sprites.player.invincibleTimer = Date.now();
					sprites.player.health -= 1;
				}
			}
		}
	),
	heart: new SpriteDefinition(
		tilesets.heart,
		{
			normal: new staticObj(['5,0'])
		}
	),
	zombieturtle: new SpriteDefinition(
		tilesets.zombieturtle,
		{
			right: new staticObj(['0,0']),
			left: new staticObj(['1,0']),
			shell: '2,0'
		},
		500,
		5,
		false,
		false,
		[],
		function(mod) {
			if (this.collides(sprites.fireball)) {
				if (this.currentState != 'shell') {
					this.revertState = this.currentState;
				}
				this.currentState = 'shell';
				this.shellTimer = Date.now();
				
			} 
			if (this.currentState == 'shell') {
				if (Date.now() - this.shellTimer > 1000) {
					this.currentState = this.revertState;
				}
			} else {
				this.pace(mod, 'horizontal', 200);
			}
			if (this.collides(sprites.player) && this.currentState != 'shell' && !sprites.player.invincible) {
				sprites.player.health -= 1;
				sprites.player.invincible = true;
				sprites.player.invincibleTimer = Date.now();
			}
		}    
	)
}