var maps = [
	[
		new Map(map0x0, 
			function() {
				if (game.plotSequence == 0) {
					eng.setMessage('Arrow keys to move, Spacebar to interact and close messages.');
					game.plotSequence ++;
				}
				this.precip('rain', 35);
			}
		), 
		new Map(map0x1,
			function() {
				this.precip('rain', 35);
			}
		), 
		new Map(map0x2, 
			function() {
				if (game.plotSequence == 1) {
					eng.setMessage('AHHHHH!!! What is that thing!? Help me!!!');
					game.plotSequence ++;
				}
				this.precip('rain', 35);
			}
		),
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		new Map(map0x12)
	],
	[
		'', 
		new Map(map1x1), 
		new Map(map1x2),
		new Map(map1x3),
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		new Map(map1x12)
	],
	[
		'',
		new Map(map2x1),
		new Map(map2x2),
		new Map(map2x3),
		new Map(map2x4),
		new Map(map2x5, 
			function() {
				this.precip('snow', 25);
			}
		),
		'',
		new Map(map2x7, 
			function() {
				this.precip('snow', 25);
			}
		),
		'',
		'',
		'',
		new Map(map2x11, 
			function() {
				this.precip('sand', 100);
			}
		),
		new Map(map2x12,
			function() {
				this.precip('sand', 100);
			}
		)
	],
	[
		'',
		new Map(map3x1),
		new Map(map3x2),
		new Map(map3x3),
		'',
		new Map(map3x5, 
			function() {
				this.precip('snow', 25);
			}
		),
		new Map(map3x6, 
			function() {
				this.precip('snow', 25);
			}
		),
		new Map(map3x7, 
			function() {
				this.precip('snow', 25);
			}
		),
		new Map(map3x8, 
			function() {
				this.precip('snow', 25);
			}
		),
		'',
		'',
		new Map(map3x11, 
			function() {
				this.precip('sand', 125);
			}
		),
		new Map(map3x12, 
			function() {
				this.precip('sand', 125);
			}
		)
	],
	[
		'',
		new Map(map4x1, function() {},
			function() {
				if (sprites.player.hasArmor && typeof sprites.brownwizard3 == 'undefined') {
					sprites.brownwizard3 = new Sprite(spriteDefinitions.brownwizard, 384, 320, 4, 1, 'left', 
						function(mod) {
							if (this.collides(sprites.player) && eng.keysDown[32]) {
								eng.setMessage('I see you have gotten some armor. You are ready. Good luck young turtle. Step back through the portal.');
								sprites.portal.func = function() {
									if (this.collides(sprites.player) && eng.keysDown[32]) {
										sprites.player.mapX = 10;
										sprites.player.mapY = 0;
										sprites.player.x = 356;
										sprites.player.y = 288;
										sprites.player.currentState = 'down';
										game.mapXPos = 10;
										game.mapYPos = 0;
										eng.updateMap();
										game.respawnPoint = {
											x: 356,
											y: 288,
											mapX: 10,
											mapY: 0,
											func: function() {
												map[10][5].code = maps10x5;
												game.finaldungeon.bossSpawned = false;
											}
										}
										delete eng.keysDown[32];
									}
								}
							}
						}
					);
				}
			}
		),
		new Map(map4x2),
		'',
		'',
		'',
		'',
		new Map(map4x7, 
			function() {
				this.precip('snow', 25);
			}
		),
		new Map(map4x8, 
			function() {
				this.precip('snow', 25);
			}
		),
		'',
		'',
		new Map(map4x11,
			function() {
				this.precip('sand', 150);
			}
		),
		new Map(map4x12,
			function() {
				this.precip('sand', 150);
			}
		)
	],
	[
		'',
		'',
		new Map(map5x2),
		'',
		'',
		new Map(map5x5),
		'',
		'',
		new Map(map5x8),
		'',
		'',
		new Map(map5x11),
		new Map(map5x12)
	],
	[
		'',
		'',
		new Map(map6x2),
		new Map(map6x3),
		new Map(map6x4),
		new Map(map6x5),
		new Map(map6x6),
		new Map(map6x7),
		new Map(map6x8),
		'',
		'',
		new Map(map6x11),
		new Map(map6x12, function() {}, 
			function(mod) {
				if (
					this.code[4][3] == '1,7' &&
					this.code[5][3] == '1,7' &&
					this.code[6][3] == '1,7' &&
					this.code[7][3] == '1,7' &&
					this.code[4][4] == '1,7' &&
					this.code[5][4] == '1,7' &&
					this.code[6][4] == '1,7' &&
					this.code[7][4] == '1,7' &&
					this.code[5][5] == '1,7' &&
					this.code[6][5] == '1,7' &&
					this.code[5][6] == '1,7' &&
					this.code[6][6] == '1,7' &&
					this.code[3][3] == '2,7' &&
					this.code[3][4] == '2,7' &&
					this.code[3][5] == '2,7' &&
					this.code[4][5] == '2,7' &&
					this.code[3][6] == '2,7' &&
					this.code[4][6] == '2,7' &&
					this.code[8][3] == '2,7' &&
					this.code[8][4] == '2,7' &&
					this.code[7][5] == '2,7' &&
					this.code[8][5] == '2,7' &&
					this.code[7][6] == '2,7' &&
					this.code[8][6] == '2,7'
				) {
					if (typeof this.timer == 'undefined') {
						this.timer = Date.now()
					} else if (Date.now() - this.timer > 500) {
						this.code = map6x12CHANGED;
						eng.updateMap();
						sprites.hammeritem = new Sprite(spriteDefinitions.hammeritem, 360, 296, 6, 12, 'up');
					}
				}
			}
		)
	],
	[
		'',
		'',
		new Map(map7x2),
		'',
		'',
		'',
		new Map(map7x6),
		new Map(map7x7)
	],
	[],
	[
		'',
		new Map(map9x1),
		new Map(map9x2, function() {},
			function(mod) {
				if (sprites.finaldungeon.torches.torch5.currentState == 'lit' && maps[9][2].code == map9x2) {
					maps[9][2].code = map9x2CHANGED;
					eng.updateMap();
					game.finaldungeon.lavaShutoff ++;
				} else if (sprites.finaldungeon.torches.torch5.currentState != 'lit' && maps[9][2].code == map9x2CHANGED) {
					maps[9][2].code = map9x2;
					eng.updateMap();
					game.finaldungeon.lavaShutoff --;
				}
				if (game.finaldungeon.lavaShutoff == 2 && maps[10][2].code == map10x2) {
					maps[10][2].code = map10x2CHANGED;
				}
			}
		),
		new Map(map9x3)
	],
	[
		new Map(map10x0),
		new Map(map10x1, function() {}, 
			function() {
				if (
					sprites.finaldungeon.torches.torch1.currentState == 'lit' && 
					sprites.finaldungeon.torches.torch2.currentState == 'lit' && 
					sprites.finaldungeon.torches.torch3.currentState == 'lit' && 
					sprites.finaldungeon.torches.torch4.currentState == 'lit' 
				) {
					game.currentMap.code[10][4] = '1,9';
					game.currentMap.code[10][5] = '1,9';
					game.currentMap.code[5][4] = '1,9';
					game.currentMap.code[6][4] = '1,9';
				} else {
					game.currentMap.code[10][4] = '7,9';
					game.currentMap.code[10][5] = '7,10';
					game.currentMap.code[5][4] = '0,11';
					game.currentMap.code[6][4] = '1,11';
				}
				if (
					sprites.finaldungeon.torches.torch1.currentState == 'frozen' && 
					sprites.finaldungeon.torches.torch2.currentState == 'frozen' && 
					sprites.finaldungeon.torches.torch3.currentState == 'frozen' && 
					sprites.finaldungeon.torches.torch4.currentState == 'frozen' 
				) {
					game.currentMap.code[1][4] = '1,9';
					game.currentMap.code[1][5] = '1,9';
				} else {
					game.currentMap.code[1][4] = '6,9';
					game.currentMap.code[1][5] = '6,10';
				}
			}
		),
		new Map(map10x2),
		new Map(map10x3, function() {}, 
			function() {
				if (sprites.finaldungeon.torches.torch7.currentState == 'frozen' && sprites.finaldungeon.torches.torch8.currentState == 'frozen') {
					maps[10][3].code[5][3] = '1,9';
					maps[10][3].code[6][3] = '1,9';
					maps[10][3].code[5][6] = '1,9';
					maps[10][3].code[6][6] = '1,9';
				} else {
					maps[10][3].code[5][3] = '0,10';
					maps[10][3].code[6][3] = '1,10';
					maps[10][3].code[5][6] = '0,10';
					maps[10][3].code[6][6] = '1,10';
				}
				if (sprites.finaldungeon.torches.torch9.currentState == 'lit' && sprites.finaldungeon.torches.torch10.currentState == 'lit') {
					maps[10][3].code[5][9] = '1,9';
					maps[10][3].code[6][9] = '1,9';
				} else {
					maps[10][3].code[5][9] = '0,11';
					maps[10][3].code[6][9] = '1,11';
				}
			}
		),
		new Map(map10x4, function() {}, 
			function(mod) {
				if (game.finaldungeon.bossDead ) {
					if (this.code != map10x4CHANGED) {
						this.code = map10x4CHANGED;
						eng.updateMap();
					}
					
					sprites.player.playerControlled = false;
					
					sprites.player.moveTo(mod, 328, 128, 
						function() {
							sprites.player.currentState = 'right';
							sprites.heart = new Sprite(spriteDefinitions.heart, 352, 64, 10, 4, 'normal');
							if (typeof game.finaldungeon.messageTimer == 'undefined') {
								game.finaldungeon.messageTimer = Date.now();
							}
						}
					);
					if (typeof game.finaldungeon.messageTimer != 'undefined') {
						if (Date.now() - game.finaldungeon.messageTimer > 2500) {
							game.mapXPos = 0;
							game.mapYPos = 0;
							sprites.player.mapX = 0;
							sprites.player.mapY = 0;
							eng.updateMap();
							eng.setMessage('Thanks for playing! Check out my website for other games- samlancashire.com');
							game.respawnPoint = {
								x: 128,
								y: 128,
								mapX: 0,
								mapY: 0
							}
							sprites.player.playerControlled = true;
						}
					}
					sprites.finaldungeon.girlturtle2.currentState = 'left';
					sprites.finaldungeon.girlturtle2.speed = 125;
					sprites.finaldungeon.girlturtle2.collidesWithSolid = true;
					
					sprites.finaldungeon.girlturtle2.moveTo(mod, 384, 128);
				}
			}
		),
		new Map(map10x5, function() {},
			function(mod) {
				if (sprites.player.y > 64 && !game.finaldungeon.bossDead) {
					maps[10][5].code = map10x5CHANGED;
					eng.updateMap();
					if (typeof this.timer == 'undefined') {
						this.timer = Date.now();
					}
					if (Date.now() - this.timer > 1000 && !game.finaldungeon.bossSpawned) {
						game.finaldungeon.bossSpawned = true;
						
						sprites.dragonboss = new Sprite(spriteDefinitions.dragon, 0, sprites.player.y - 32, 10, 5, 'right',
							function(mod) {
								this.allowLiveOffScreen = true;
								if (typeof this.stage == 'undefined') {
									this.stage = 1;
								}
								
								if (typeof this.speedMultiplier == 'undefined') {
									this.speedMultiplier = 1;
								}
								
								switch (this.stage) {
									case 1:
										if (this.x < 704 - this.width) {
											this.x += this.speed * this.speedMultiplier * mod;
										} else {
											this.currentState = 'left';
											this.stage = 2;
										}
									break;
									case 2:
										this.fireAtPlayer(mod, spriteDefinitions.bigfireball, 1500);
										if (typeof this.stage2timer == 'undefined') {
											this.stage2timer = Date.now();
										}
										if (Date.now() - this.stage2timer > 4500) {
											this.stage = 3;
										}
									break;
									case 3:
										this.currentState = 'right';
										if (this.x < 800) {
											this.x += this.speed * this.speedMultiplier * mod;
										} else {
											if (typeof this.stage3timer == 'undefined') {
												this.stage3timer = Date.now();
											}
											if (Date.now() - this.stage3timer > 2500) {
												this.y = sprites.player.y - 32;
												this.stage = 4;
											}
										}
									break;
									case 4:
										if (this.x > 64) {
											this.currentState = 'left';
											this.x -= this.speed * mod;
										} else {
											this.currentState = 'right';
											this.stage = 5;
										}
									break;
									case 5:
										this.fireAtPlayer(mod, spriteDefinitions.bigfireball, 1500);
										if (typeof this.stage5timer == 'undefined') {
											this.stage5timer = Date.now();
										}
										if (Date.now() - this.stage5timer > 4500) {
											this.stage = 6;
										}
									break;
									case 6:
										if (typeof this.stage6timer == 'undefined') {
											this.stage6timer = Date.now();
										}
										this.fireAtPlayer(mod, spriteDefinitions.bigfireball, 750);
										this.speed = 100;
										if (typeof this.direction == 'undefined') {
											this.direction = 'down';
										}
										if (this.y > 576 - this.height) {
											this.direction = 'up';
										}
										if (this.y < 64) {
											this.direction = 'down';
										}
										switch (this.direction) {
											case 'up':
												this.y -= this.speed * this.speedMultiplier * mod;
											break;
											case 'down':
												this.y += this.speed * this.speedMultiplier * mod
											break;
										}
										if (Date.now() - this.stage6timer > 5000) {
											this.stage = 7;
										}
									break;
									case 7:
										this.speed = 375;
										if (this.x < 800) {
											this.x += this.speed * this.speedMultiplier * mod;
										} else {
											this.y = sprites.player.y;
											this.stage = 8;
										}
									break;
									case 8:
										this.currentState = 'left';
										this.x -= this.speed * this.speedMultiplier * mod;
										if (this.x < 0 - this.width - 50) {
											this.y = sprites.player.y;
											this.stage = 9;
										}
									break;
									case 9:
										if (this.x < 704 - this.width) {
											this.currentState = 'right';
											this.x += this.speed * this.speedMultiplier * mod;
										} else {
											this.currentState = 'left';
											this.stage = 10;
										}
									break;
									case 10:
										if (typeof this.stage10timer == 'undefined') {
											this.stage10timer = Date.now();
										}
										this.fireAtPlayer(mod, spriteDefinitions.bigfireball, 750);
										this.speed = 100;
										if (typeof this.direction == 'undefined') {
											this.direction = 'down';
										}
										if (this.y > 576 - this.height) {
											this.direction = 'up';
										}
										if (this.y < 64) {
											this.direction = 'down';
										}
										switch (this.direction) {
											case 'up':
												this.y -= this.speed * this.speedMultiplier * mod;
											break;
											case 'down':
												this.y += this.speed * this.speedMultiplier * mod
											break;
										}
										if (Date.now() - this.stage10timer > 5000) {
											this.speed = 375;
											this.speedMultiplier += .5;
											this.stage = 1;
											delete this.stage2timer;
											delete this.stage3timer;
											delete this.stage5timer;
											delete this.stage6timer;
											delete this.stage10timer;
										}
									break;
								}
								
								if (this.collides(sprites.player) && !sprites.player.invincible) {
									sprites.player.health -= 1;
									sprites.player.invincible = true;
									sprites.player.invincibleTimer = Date.now();
								}
								if (this.collides(sprites.snowflake) && this.x < canvas.width && this.y < canvas.height && this.x > 0 - this.width && this.y > 0 - this.height) {
									sprites.snowflake.kill = true;
									this.invincible = true;
									this.invincibleTimer = Date.now();
									this.health -= 2;
								}
								if (this.collides(sprites.axe)) {
									sprites.axe.kill = true;
									this.invincible = true;
									this.invincibleTimer = Date.now();
									this.health -= 1;
								}
								game.drawHealthBar = true;
								game.healthBarSprite = sprites.dragonboss;
							},
							function(mod) {
								sprites.deaddragon = new Sprite(spriteDefinitions.dragon, this.x, this.y, 10, 5, 'dead');
								maps[10][5].code = map10x5;
								
								game.finaldungeon.bossDead = true;
								
								sprites.player.health = 5;
							}
						);
					}
				}
			}
		)
	],
	[
		'',
		new Map(map11x1),
		new Map(map11x2, function() {},
			function(mod) {
				if (sprites.finaldungeon.torches.torch6.currentState == 'lit' && maps[11][2].code == map11x2) {
					maps[11][2].code = map11x2CHANGED;
					eng.updateMap();
					game.finaldungeon.lavaShutoff ++;
				} else if (sprites.finaldungeon.torches.torch6.currentState != 'lit' && maps[11][2].code == map9x2CHANGED) {
					maps[11][2].code = map11x2;
					eng.updateMap();
					game.finaldungeon.lavaShutoff --;
				}
				if (game.finaldungeon.lavaShutoff == 2 && maps[10][2].code == map10x2) {
					maps[10][2].code = map10x2CHANGED;
				}
			}
		),
		new Map(map11x3)
	]
];