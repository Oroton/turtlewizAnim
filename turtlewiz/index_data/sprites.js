
 var sprites = {
	player: new Sprite(spriteDefinitions.turtle, 128, 128, 0, 0, 'down',
		function(mod) {
			
		}
	),
	chest1: new Sprite(spriteDefinitions.chest, 512, 320, 0, 1, 'down',
		function(mod) {
			if (this.collides(sprites.player) && eng.keysDown[32]) {
				this.kill = true;
				sprites.player.inventory.push('fireball');
				eng.setMessage('Player got the fireball spell! Press X to switch between items.');
			}
		}
	),
	girlturtle: new Sprite(spriteDefinitions.girlturtle, 448, 256, 0, 2, 'left',
		function(mod) {
			if (this.collides(sprites.dragon, 64)) {
				this.x += this.speed * mod;
			}
		}
	),
	dragon: new Sprite(spriteDefinitions.dragon, 0, 200, 0, 2, 'right', 
		function(mod) {
			this.x += this.speed * mod;
		}
	),
	hedgehog: new Sprite(spriteDefinitions.hedgehog, 640, 256, 1, 2, 'left',  
		function(mod) {
			if (this.collides(sprites.player) && game.plotSequence == 2 && eng.keysDown[32] && game.message == '') {
				eng.setMessage('Did you see that giant red beast in the sky? It was the evil dragon Algernon. He must be heading back east to his lair in the Chasm of Nightmares.');
				delete eng.keysDown[32];
			}
		}
	),
	axeItem: new Sprite(spriteDefinitions.axe, 512, 256, 2, 2, 'up', 
		function(mod) {
			if (this.collides(sprites.player) && eng.keysDown[32]) {
				sprites.player.inventory.push('axe');
				game.selectedItem = 0;
				this.kill = true;
				eng.setMessage('Axe added to inventory. Press Z to use.');
			}
		}
	),
	ogre: new Sprite(spriteDefinitions.ogre, 640, 256, 3, 2, 'down',
		function(mod) {
			if (this.collides(sprites.player) && eng.keysDown[32]) {
				if (game.plotSequence == 2) {
					eng.setMessage('My camp fire out... Grugga sad...');
				} else if (game.plotSequence == 3) {
					eng.setMessage('Funny lizard fix Grugga\'s camp fire! Grugga happy! Grugga smash these rocks for funny lizard.');
					game.currentMap.code[11][5] = '7,0';
					game.currentMap.code[11][6] = '7,0';
					game.plotSequence = 4;
				}
			}
		}
	),
	brownwizard: new Sprite(spriteDefinitions.brownwizard, 448, 384, 4, 2, 'left', 
		function(mod) {
			if (this.collides(sprites.player)) {
				eng.setMessage('What is a young turtle like yourself doing way out here? It\'s dangerous. Take this. Good luck, I must go! ... Player got a heart!');
				this.kill = true;
				sprites.player.hasHeart = true;
			}
		}
	),
	lavasnail1: new Sprite(spriteDefinitions.lavasnail, 384, 320, 5, 2, 'left', 
		function(mod) {
			this.chasePlayer(mod);
		}
	),
	chest2: new Sprite(spriteDefinitions.chest, 512, 128, 7, 2, 'down', 
		function(mod) {
			if (this.collides(sprites.player) && eng.keysDown[32]) {
				this.kill = true;
				sprites.player.inventory.push('potion');
				eng.setMessage('Player got a health potion!');
			}
		}
	),
	dungeon1: {
		torch1: new Sprite(spriteDefinitions.torch, 64, 512, 6, 4, 'unlit'),
		torch2: new Sprite(spriteDefinitions.torch, 640, 512, 6, 4, 'unlit', 
			function(mod) {
				if (this.currentState == 'lit' && sprites.dungeon1.torch1.currentState == 'lit' && maps[6][4].code[5][9] != '1,3') {
					maps[6][4].code[5][9] = '1,3'; //open doors 
					maps[6][4].code[6][9] = '1,3'; 
					eng.updateMap();
					game.respawnPoint = {
						x: 352,
						y: 256,
						mapX: 6,
						mapY: 4,
					}
				}
			}
		),
		snail1: new Sprite(spriteDefinitions.lavasnail, 576, 256, 6, 5, 'left', 
			function(mod) {
				this.chasePlayer(mod);
			},
			function(mod) {
				game.dungeon1.snailsKilled ++;
				if (game.dungeon1.snailsKilled == 2) {
					maps[6][5].code[5][9] = '1,3';
					maps[6][5].code[6][9] = '1,3';
					eng.updateMap();
				}
			}
		),
		snail2: new Sprite(spriteDefinitions.lavasnail, 128, 256, 6, 5, 'right', 
			function(mod) {
				this.chasePlayer(mod);
			},
			function(mod) {
				game.dungeon1.snailsKilled ++;
				if (game.dungeon1.snailsKilled == 2) {
					maps[6][5].code[5][9] = '1,3';
					maps[6][5].code[6][9] = '1,3';
					eng.updateMap();
				}
			}
		),
		lavasnakeminion1: new Sprite(spriteDefinitions.lavasnakeminion, 64, 512, 6, 6, 'down',
			function(mod) {
				this.fireAtPlayer(mod, spriteDefinitions.lavaspitterball, 1500);
			}
		),
		snail3: new Sprite(spriteDefinitions.lavasnail, 576, 256, 6, 7, 'left', 
			function(mod) {
				this.chasePlayer(mod);
			},
			function(mod) {
				game.dungeon1.snailsKilled ++;
				if (game.dungeon1.snailsKilled == 4) {
					maps[6][7].code[11][4] = '1,3';
					maps[6][7].code[11][5] = '1,3';
				}
			}
		),
		snail4: new Sprite(spriteDefinitions.lavasnail, 128, 256, 6, 7, 'right', 
			function(mod) {
				this.chasePlayer(mod);
			},
			function(mod) {
				game.dungeon1.snailsKilled ++;
				if (game.dungeon1.snailsKilled == 4) {
					maps[6][7].code[11][4] = '1,3';
					maps[6][7].code[11][5] = '1,3';
				}
			}
		),
		torch3: new Sprite(spriteDefinitions.torch, 384, 256, 7, 7, 'unlit',
			function(mod) {
				if (this.currentState == 'lit' && !game.dungeon1.chest1Opened) {
					sprites.dungeon1['chest1'] = new Sprite(spriteDefinitions.chest, 320, 256, 7, 7, 'down',
						function(mod) {
							if (this.collides(sprites.player) && eng.keysDown[32]) {
								this.kill = true;
								sprites.player.inventory.push('potion');
								eng.setMessage('Player got a health potion!');
								game.dungeon1.chest1Opened = true;
							}
						}
					);
				}
			}
		),
		lavasnakeboss: new Sprite(spriteDefinitions.lavasnake, 336, 128, 7, 6, 'grey',
			function(mod) {
				if (this.currentState == 'grey' && this.collides(sprites.fireball)) {
					this.currentState = 'down';
					this.chaseTimer = Date.now();
					this.spawnTimer = Date.now();
					sprites.fireball.kill = true;
				}
				if (this.currentState != 'grey') {
					if (Date.now() - this.chaseTimer < 5000) {
						this.chasePlayer(mod);
					} else {
						this.currentState = 'grey';
					}
					if (this.collides(sprites.player) && !sprites.player.invincible) {
						this.bumpPlayer(this.currentState, 50);
						sprites.player.health -= 1;
						sprites.player.invincible = true;
						sprites.player.invincibleTimer = Date.now();
						if (sprites.player.health <= 0) {
							this.health = 7;
						}
					}
					if (Date.now() - this.spawnTimer > 3000) {
						game.uniqueCount ++;
						sprites['lavasnakeminion' + game.uniqueCount] = new Sprite(spriteDefinitions.lavasnakeminion, this.x, this.y, 7, 6, 'down',
							function(mod) {
								this.fireAtPlayer(mod, spriteDefinitions.lavaspitterball, 4000);
							}
						);
						this.spawnTimer = Date.now();
					}
					if (this.collides(sprites.axe)) {
						this.health -= 1;
						this.invincible = true;
						this.invincibleTimer = Date.now();
						sprites.axe.kill = true;
					}
				}
			},
			function(mod) {
				sprites.dungeon1['chest2'] = new Sprite(spriteDefinitions.chest, this.x, this.y, 7, 6, 'down',
					function(mod) {
						if (this.collides(sprites.player) && eng.keysDown[32]) {
							this.kill = true;
							sprites.player.inventory.push('key');
							eng.setMessage('Player got a key!');
							game.dungeon1.chest2Opened = true;
						}
					}
				);
				game.respawnPoint = {
					x: 128,
					y: 128,
					mapX: 0,
					mapY: 0
				};
				delete sprites.dungeon1.lavasnakeminion1;
			}
		),
		chest3: new Sprite(spriteDefinitions.chest, 128, 64, 5, 5, 'down',
			function(mod) {
				if (this.collides(sprites.player) && eng.keysDown[32] ) {
					if (sprites.player.inventory[game.selectedItem] == 'key') {
						this.kill = true;
						sprites.player.inventory.push('icewand');
						eng.setMessage('Player got the Ice Wand!');
						game.dungeon1.chest3Opened = true;
						eng.deleteFromInv('key', 1);
					} else {
						eng.setMessage('It\'s locked...');
					}
				}
			}
		)
	},
	whale: new Sprite(spriteDefinitions.whale, 290, 290, 2, 7, 'left',
		function(mod) {
			if (this.collides(sprites.player) && eng.keysDown[32] && game.message == '') {
				eng.setMessage('Please help me... *wheez*');
			}
			if (!this.collidesTile('4,4') && !this.free) {
				eng.setMessage('Thank you turtle. Please, take this. Player got the map!');
				sprites.player.inventory.push('map');
				this.free = true;
			}
			if (this.free) {
				this.x -= this.speed * mod;
			}
		}
	),
	brownwizard2: new Sprite(spriteDefinitions.brownwizard, 384, 320, 4, 1, 'left', 
		function(mod) {
			if (this.collides(sprites.player) && eng.keysDown[32] && game.message == '') {
				eng.setMessage('In order to defeat Algernon you will need fire proof armor. Such armor can only be smithed by an ogre named Smash who lives in the far south. I will teleport you there to help your cause.');
				sprites.purplespell = new Sprite(spriteDefinitions.purplespell, this.x, this.y, 4, 1, 'left', 
					function(mod) {
						if (typeof this.distanceTravelled == 'undefined') {
							this.distanceTravelled = 0;
						}
						if (this.distanceTravelled >= 256) {
							this.kill = true;
							sprites.portal = new Sprite(spriteDefinitions.portal, 128, 300, 4, 1, 'active',
								function(mod) {
									if (this.collides(sprites.player) && eng.keysDown[32]) {
										sprites.player.mapX = 0;
										sprites.player.mapY = 12;
										sprites.player.x = 256;
										sprites.player.y = 320;
										game.mapXPos = 0;
										game.mapYPos = 12;
										eng.updateMap();
										game.respawnPoint = {
											x: 256,
											y: 320,
											mapX: 0,
											mapY: 12
										}
										delete eng.keysDown[32];
									}
								}
							)
						} else {
							this.x -= this.speed * mod;
							this.distanceTravelled += this.speed * mod;
						}
					}
				);
				this.kill = true;
			}
		}
	),
	smash: new Sprite(spriteDefinitions.smash, 384, 320, 1, 12, 'down',
		function(mod) {
			if (typeof this.message == 'undefined') {
				this.message = 'What? You want armor? Smash not making any armor till his favorite chicken comes back.';
			}
			if (this.collides(sprites.player) && eng.keysDown[32]) {
				eng.setMessage(this.message);
			}
		}
	),
	chickens: {
		1: new Sprite(spriteDefinitions.chicken, 192, 192, 1, 12, 'left',
			function(mod) {
				this.pace(mod, 'horizontal', 75);
			}
		),
		2: new Sprite(spriteDefinitions.chicken, 576, 320, 1, 12, 'left',
			function(mod) {
				this.pace(mod, 'horizontal', 60);
			}
		),
		3: new Sprite(spriteDefinitions.chicken, 192, 512, 1, 12, 'right',
			function(mod) {
				this.pace(mod, 'horizontal', 100);
			}
		),
		4: new Sprite(spriteDefinitions.chicken, 448, 192, 1, 12, 'right',
			function(mod) {
				this.pace(mod, 'horizontal', 120);
			}
		),
		5: new Sprite(spriteDefinitions.chicken, 80, 320, 1, 12, 'left',
			function(mod) {
				this.pace(mod, 'horizontal', 80);
			}
		),
		6: new Sprite(spriteDefinitions.chicken, 448, 448, 1, 12, 'right',
			function(mod) {
				this.pace(mod, 'horizontal', 60);
			}
		)
	},
	scorpions: {
		1: new Sprite(spriteDefinitions.scorpion, 279, 389, 2, 11, 'left',
			function(mod) {
				this.pace(mod, 'horizontal', 50);
				this.fireAtPlayer(mod, spriteDefinitions.poisonspit, 2500);
			}
		),
		2: new Sprite(spriteDefinitions.scorpion, 256, 192, 3, 11, 'left',
			function(mod) {
				this.pace(mod, 'horizontal', 200);
				this.fireAtPlayer(mod, spriteDefinitions.poisonspit, 2500);
			}
		),
		3: new Sprite(spriteDefinitions.scorpion, 448, 384, 3, 11, 'left',
			function(mod) {
				this.pace(mod, 'horizontal', 200);
				this.fireAtPlayer(mod, spriteDefinitions.poisonspit, 2500, false, 1250);
			}
		),
		4: new Sprite(spriteDefinitions.scorpion, 256, 320, 4, 11, 'left',
			function(mod) {
				this.pace(mod, 'horizontal', 400);
				this.fireAtPlayer(mod, spriteDefinitions.poisonspit, 2500, false, 1250);
			}
		),
		5: new Sprite(spriteDefinitions.scorpion, 320, 512, 4, 11, 'left',
			function(mod) {
				this.pace(mod, 'horizontal', 350);
				this.fireAtPlayer(mod, spriteDefinitions.poisonspit, 2500);
			}
		),
		6: new Sprite(spriteDefinitions.scorpion, 128, 128, 4, 12, 'left',
			function(mod) {
				this.pace(mod, 'horizontal', 200);
				this.fireAtPlayer(mod, spriteDefinitions.poisonspit, 2500);
			}
		),
		7: new Sprite(spriteDefinitions.scorpion, 320, 256, 3, 12, 'left',
			function(mod) {
				this.pace(mod, 'horizontal', 200);
				this.fireAtPlayer(mod, spriteDefinitions.poisonspit, 2500);
			}
		)
	},
	scorpionboss: new Sprite(spriteDefinitions.scorpionboss, 320, 458, 5, 12, 'left',
		function(mod) {
			this.pace(mod, 'horizontal', 400);
			this.fireAtPlayer(mod, spriteDefinitions.rock, 1500);
		},
		function(mod) {
			sprites.brownchicken = new Sprite(spriteDefinitions.brownchicken, this.x, this.y, 5, 12, this.currentState, 
				function(mod) {
					this.pace(mod, 'horizontal', 50);
					if (this.collides(sprites.player) && eng.keysDown[32]) {
						this.kill = true;
						sprites.player.inventory.push('chicken');
						eng.setMessage('Player got the chicken!');
					}
				}
			);
		}
	),
	portal2: new Sprite(spriteDefinitions.portal, 256, 320, 0, 12, 'sand',
		function(mod) {
			if (this.collides(sprites.player) && eng.keysDown[32]) {
				sprites.player.mapX = 4;
				sprites.player.mapY = 1;
				sprites.player.x = 128;
				sprites.player.y = 300;
				game.mapXPos = 4;
				game.mapYPos = 1;
				eng.updateMap();
				game.respawnPoint = {
					x: 128,
					y: 128,
					mapX: 0,
					mapY: 0
				}
				delete eng.keysDown[32];
			}
		}
	),
	finaldungeon: {
		torches: {
			torch1: new Sprite(spriteDefinitions.dragontorch, 128, 128, 10, 1, 'unlit',
				function(mod) {
				
				}
			),
			torch2: new Sprite(spriteDefinitions.dragontorch, 128, 448, 10, 1, 'unlit',
				function(mod) {
				
				}
			),
			torch3: new Sprite(spriteDefinitions.dragontorch, 576, 128, 10, 1, 'unlit',
				function(mod) {
				
				}
			),
			torch4: new Sprite(spriteDefinitions.dragontorch, 576, 448, 10, 1, 'unlit',
				function(mod) {
				
				}
			),
			torch5: new Sprite(spriteDefinitions.dragontorch, 64, 192, 9, 2, 'unlit', //left lava
				function(mod) {
				
				}
			),
			torch6: new Sprite(spriteDefinitions.dragontorch, 640, 384, 11, 2, 'unlit', //right lava
				function(mod) {
				
				}
			),
			torch7: new Sprite(spriteDefinitions.dragontorch, 64, 64, 10, 3, 'unlit', //blue
				function(mod) {
				
				}
			),
			torch8: new Sprite(spriteDefinitions.dragontorch, 640, 64, 10, 3, 'unlit', //blue
				function(mod) {
				
				}
			),
			torch9: new Sprite(spriteDefinitions.dragontorch, 64, 512, 10, 3, 'unlit', //red
				function(mod) {
				
				}
			),
			torch10: new Sprite(spriteDefinitions.dragontorch, 640, 512, 10, 3, 'unlit', //red
				function(mod) {
				
				}
			)
		},
		chest: new Sprite(spriteDefinitions.chest, 128, 128, 10, 4, 'down',
			function(mod) {
				if (this.collides(sprites.player) && eng.keysDown[32]) {
					this.kill = true;
					sprites.player.inventory.push('potion');
					eng.setMessage('Player got a potion!');
				}
			}
		),
		girlturtle2: new Sprite(spriteDefinitions.girlturtle, 576, 128, 10, 4, 'left',
			function(mod) {
				if (sprites.player.y > this.y + this.height) {
					this.currentState = 'down';
				} else {
					this.currentState = 'left';
				}
			}
		),
		zombieturtle1: new Sprite(spriteDefinitions.zombieturtle, 350, 423, 9, 1, 'left'),
		zombieturtle2: new Sprite(spriteDefinitions.zombieturtle, 380, 423, 11, 1, 'left'),
	}    
}

sprites.player.hasHeart = false; //false
sprites.player.inventory = []; //empty