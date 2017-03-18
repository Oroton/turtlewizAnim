var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');

canvas.width = 768;
canvas.height = 640;

var eng = {
	imageCount: 0,
	loadedImages: 0,
	keysDown: [],
	fps: {
		lastUpdated: Date.now(),
		current: 0,
		display: 0,
		update: function() {
			if (Date.now() - this.lastUpdated < 1000) {
				this.current ++;
			} else {
				this.display = this.current;
				this.current = 0;
				this.lastUpdated = Date.now();
			}
		},
		draw: function() {
			ctx.font = '12pt visitor';
			ctx.fillStyle = '#fff';
			ctx.textBaseline = 'top';
			ctx.fillText(this.display + ' fps', 10, 5);
		}
	},
	clearCanvas: function() {
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	},
	inArray: function(needle, haystack, returnKey) {
		for (var key in haystack) {
			if (needle == haystack[key]) {
				if (returnKey) {
					return parseInt(key);
				} else {
					return true;
				}
			}
		}
		return false;
	},
	isSolid: function(tileX, tileY) {
		if (inArray(game.currentMap.code[tileX][tileY], tilesets.maptiles.solid)) {
			return true;
		} else {
			return false;
		}
	
	},
	updateSprites: function(obj, mod) {
		for (var key in obj) {
			if (typeof obj[key].update == 'undefined') {
				eng.updateSprites(obj[key], mod);
			} else {
				if (obj[key].mapX == game.mapXPos && obj[key].mapY == game.mapYPos) {
					if (obj[key].kill) {
						delete obj[key];
					} else {
						obj[key].update(mod);
					}
				} else if (obj[key].projectile && !obj[key].precip){
					delete obj[key];
				}
			}
		}
	},
	drawSprites: function(obj) {
		for (var key in obj) {
			if (typeof obj[key].update == 'undefined') {
				eng.drawSprites(obj[key]);
			} else {
				if (obj[key].mapX == game.mapXPos && obj[key].mapY == game.mapYPos && !obj[key].playerControlled && !obj[key].projectile) { //draw sprites
					obj[key].draw();
				}
			}
		}
		if (sprites.player.mapX == game.mapXPos && sprites.player.mapY == game.mapYPos) { //draw player
			sprites.player.draw();
		}
		for (var key in obj) {
			if (typeof obj[key].update == 'undefined') {
				eng.drawSprites(obj[key]);
			} else {
				if (obj[key].mapX == game.mapXPos && obj[key].mapY == game.mapYPos && obj[key].projectile) { //draw projectiles
					obj[key].draw();
				}
			}
		}
	},
	updateMap: function() {
		game.currentMap = maps[game.mapXPos][game.mapYPos];
		if (!eng.inArray(game.mapXPos + ',' + game.mapYPos, game.discoveredMaps)) {
			game.discoveredMaps.push(game.mapXPos + ',' + game.mapYPos);
		}
		if (typeof game.currentMap.onload != 'undefined') {
			game.currentMap.onload();
		}
	},
	setMessage: function(message) {
		game.message = message;
		delete eng.keysDown[32];
	},
	drawMessage: function(message) {
		ctx.font = '15pt visitor';
		ctx.textBaseline = 'top';
		
		var textArray = [], textBox = {width: 0};
		message = message.split(' ');
		var numberOfLines = Math.ceil(message.length / 5);
		
		for (line = 0; line < numberOfLines; line ++) {
			if (typeof textArray[line] == 'undefined') textArray[line] = [];
			for (word = 0; word < 5; word ++) {
				textArray[line].push(message[line * 5 + word]);
			}
			if (ctx.measureText(textArray[line].join(' ')).width > textBox.width) textBox.width = ctx.measureText(textArray[line].join(' ')).width;
		}
		
		textBox.height = numberOfLines * 17;
		
		ctx.fillStyle = '#000';
		ctx.fillRect(canvas.width / 2 - textBox.width / 2 - 10, canvas.height / 2 - textBox.height / 2 - 5, textBox.width + 20, textBox.height + 15);
		
		ctx.fillStyle = '#fff';
		for (line in textArray) {
			ctx.fillText(textArray[line].join(' '), Math.floor(canvas.width / 2 - textBox.width / 2), Math.floor(canvas.height / 2 - textBox.height / 2 + line * 17));
		}
	},
	drawHeart: function() {
		ctx.fillStyle = 'rgba(0, 0, 0, .5)';
			ctx.fillRect(16, canvas.height - 80, 64, 64);
			ctx.save();
			ctx.globalAlpha = .75;
		ctx.drawImage(tilesets.heart.image, sprites.player.health * tilesets.heart.tileWidth, 0, tilesets.heart.tileWidth, tilesets.heart.tileHeight, 16, canvas.height - 16 - tilesets.heart.tileHeight, tilesets.heart.tileWidth, tilesets.heart.tileHeight);
		ctx.restore();
	},
	useItem: function() {
		if (Date.now() - game.itemDelay > 500) {
			game.itemDelay = Date.now();
			switch (sprites.player.inventory[game.selectedItem]) {
				case 'axe':
					var axeX, axeY, axeDirection;
					switch (sprites.player.currentState) {
						case 'left':
							axeX = sprites.player.x - tilesets.axe.tileWidth;
							axeY = sprites.player.y;
							axeDirection = 'left';
						break;
						case 'up':
							axeX = sprites.player.x;
							axeY = sprites.player.y - tilesets.axe.tileHeight;
							axeDirection = 'up';
						break;
						case 'right':
							axeX = sprites.player.x + sprites.player.width;
							axeY = sprites.player.y;
							axeDirection = 'right';
						break;
						case 'down':
							axeX = sprites.player.x;
							axeY = sprites.player.y + sprites.player.height;
							axeDirection = 'down';
						break;
					}
					sprites.axe = new Sprite(spriteDefinitions.axe, axeX, axeY, game.mapXPos, game.mapYPos, axeDirection,
						function() {
							if (typeof this.timer == 'undefined') {
								this.timer = Date.now();
							} else {
								if (Date.now() - this.timer > 75) {
									this.kill = true;
								}
							}
							if (this.collidesTile('1,0')) { //cut bramble
								for (var x in game.currentMap.code) {
									for (var y in game.currentMap.code[x]) {
										if (this.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight}) && game.currentMap.code[x][y] == '1,0') {
											game.currentMap.code[x][y] = '2,0';
										}
									}
								}
							}
						}
					);
				break;
				case 'fireball':
					var fireballX, fireballY, fireballDirection;
					switch (sprites.player.currentState) {
						case 'left':
							fireballX = sprites.player.x - tilesets.fireball.tileWidth;
							fireballY = sprites.player.y + 12;
							fireballDirection = 'left';
						break;
						case 'up':
							fireballX = sprites.player.x + 12;
							fireballY = sprites.player.y - tilesets.fireball.tileHeight;
							fireballDirection = 'up';
						break;
						case 'right':
							fireballX = sprites.player.x + sprites.player.width;
							fireballY = sprites.player.y + 12;
							fireballDirection = 'right';
						break;
						case 'down':
							fireballX = sprites.player.x + 12;
							fireballY = sprites.player.y + sprites.player.height;
							fireballDirection = 'down';
						break;
					}
					sprites.fireball = new Sprite(spriteDefinitions.fireball, fireballX, fireballY, game.mapXPos, game.mapYPos, fireballDirection, 
						function(mod) {
							if (typeof this.timer == 'undefined') {
								this.timer = Date.now();
							} else {
								if (Date.now() - this.timer > 500) {
									this.kill = true;
								}
							}
							if (this.collidesTile('6,1')) { // light camp fire
								for (var x in game.currentMap.code) {
									for (var y in game.currentMap.code[x]) {
										if (this.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight}) && game.currentMap.code[x][y] == '6,1') {
											game.currentMap.code[x][y] = '7,1';
											if (game.plotSequence == 2) {
												game.plotSequence = 3;
											}
										}
									}
								}
							}
							if (this.collidesTile('4,4')) { // melt ice
								for (var x in game.currentMap.code) {
									for (var y in game.currentMap.code[x]) {
										if (this.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight}) && game.currentMap.code[x][y] == '4,4') {
											if (x != 0 && x != 11 && y != 0 && y != 9) {
												if (!sprites.player.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight})) {
													game.currentMap.code[x][y] = '0,1';
												}
											}
										}
									}
								}
							}
							if (this.collidesTile('2,7')) { // ignite cactus
								for (var x in game.currentMap.code) {
									for (var y in game.currentMap.code[x]) {
										if (this.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight}) && game.currentMap.code[x][y] == '2,7') {
											if (x != 0 && x != 11 && y != 0 && y != 9) {
												if (!sprites.player.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight})) {
													game.currentMap.code[x][y] = '1,7';
												}
											}
										}
									}
								}
							}
							if (this.collidesTile('3,7')) { // ignite other cactus
								for (var x in game.currentMap.code) {
									for (var y in game.currentMap.code[x]) {
										if (this.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight}) && game.currentMap.code[x][y] == '3,7') {
											if (x != 0 && x != 11 && y != 0 && y != 9) {
												if (!sprites.player.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight})) {
													game.currentMap.code[x][y] = '0,7';
												}
											}
										}
									}
								}
							}
							if (this.collidesTile('0,6') || this.collidesTile('3,6') || this.collidesTile('2,11')) { //delete if hits rock/brick
								this.kill = true;
							}
							switch (this.currentState) {
								case 'left':
									this.x -= this.speed * mod;
								break
								case 'up':
									this.y -= this.speed * mod;
								break
								case 'right':
									this.x += this.speed * mod;
								break
								case 'down':
									this.y += this.speed * mod;
								break
							}
						}
					);
				break;
				case 'potion':
					if (sprites.player.health < 5) {
						sprites.player.health = 5;
						eng.deleteFromInv(sprites.player.inventory[game.selectedItem], 1);
						eng.scrollItem();
					}
				break;
				case 'icewand':
					sprites.snowflake = new Sprite(spriteDefinitions.snowflake, sprites.player.x + sprites.player.width / 2 - 12, sprites.player.y + sprites.player.height / 2 - 12, game.mapXPos, game.mapYPos, sprites.player.currentState, 
						function(mod) {
							if (typeof this.timer == 'undefined') {
								this.timer = Date.now();
							} else {
								if (Date.now() - this.timer > 500) {
									this.kill = true;
								}
							}
							if (this.collidesTile('0,1')) { // freeze water
								for (var x in game.currentMap.code) {
									for (var y in game.currentMap.code[x]) {
										if (this.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight}) && game.currentMap.code[x][y] == '0,1') {
											if (x != 0 && x != 11 && y != 0 && y != 9) {
												game.currentMap.code[x][y] = '4,4';
											}
										}
									}
								}
							}
							if (this.collidesTile('1,7')) { // put out cactus
								for (var x in game.currentMap.code) {
									for (var y in game.currentMap.code[x]) {
										if (this.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight}) && game.currentMap.code[x][y] == '1,7') {
											if (x != 0 && x != 11 && y != 0 && y != 9) {
												if (!sprites.player.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight})) {
													game.currentMap.code[x][y] = '2,7';
												}
											}
										}
									}
								}
							}
							if (this.collidesTile('0,7')) { // put out other cactus
								for (var x in game.currentMap.code) {
									for (var y in game.currentMap.code[x]) {
										if (this.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight}) && game.currentMap.code[x][y] == '0,7') {
											if (x != 0 && x != 11 && y != 0 && y != 9) {
												if (!sprites.player.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight})) {
													game.currentMap.code[x][y] = '3,7';
												}
											}
										}
									}
								}
							}
							if (this.collidesTile('0,6') || this.collidesTile('3,6') || this.collidesTile('2,11')) { //delete if hits rock
								this.kill = true;
							}
							switch (this.currentState) {
								case 'left':
									this.x -= this.speed * mod;
								break
								case 'up':
									this.y -= this.speed * mod;
								break
								case 'right':
									this.x += this.speed * mod;
								break
								case 'down':
									this.y += this.speed * mod;
								break
							}
						}
					);
				break;
				case 'map':
					if (game.displayMap) {
						game.displayMap = false;
					} else {
						game.displayMap = true;
					}
				break;
				case 'hammer':
					var hammerX, hammerY, hammerDirection;
					switch (sprites.player.currentState) {
						case 'left':
							hammerX = sprites.player.x - tilesets.hammer.tileWidth;
							hammerY = sprites.player.y;
							hammerDirection = 'left';
						break;
						case 'up':
							hammerX = sprites.player.x;
							hammerY = sprites.player.y - tilesets.hammer.tileHeight;
							hammerDirection = 'up';
						break;
						case 'right':
							hammerX = sprites.player.x + sprites.player.width;
							hammerY = sprites.player.y;
							hammerDirection = 'right';
						break;
						case 'down':
							hammerX = sprites.player.x;
							hammerY = sprites.player.y + sprites.player.height;
							hammerDirection = 'down';
						break;
					}
					sprites.hammer = new Sprite(spriteDefinitions.hammer, hammerX, hammerY, game.mapXPos, game.mapYPos, hammerDirection,
						function() {
							if (typeof this.timer == 'undefined') {
								this.timer = Date.now();
							} else {
								if (Date.now() - this.timer > 75) {
									this.kill = true;
								}
							}
							if (this.collidesTile('0,6')) { //smash rocks
								for (var x in game.currentMap.code) {
									for (var y in game.currentMap.code[x]) {
										if (this.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight}) && game.currentMap.code[x][y] == '0,6') {
											game.currentMap.code[x][y] = '2,6';
										}
									}
								}
							}
							if (this.collidesTile('2,11')) { //smash bricks
								for (var x in game.currentMap.code) {
									for (var y in game.currentMap.code[x]) {
										if (this.collides({x: x * tilesets.maptiles.tileWidth, y: y * tilesets.maptiles.tileHeight, width: tilesets.maptiles.tileWidth, height: tilesets.maptiles.tileHeight}) && game.currentMap.code[x][y] == '2,11') {
											game.currentMap.code[x][y] = '1,9';
										}
									}
								}
							}
						}
					);
				break;
				case 'chicken':
					if (sprites.player.collides(sprites.smash)) {
						sprites.smash.message = 'Smash thanks you.';
						eng.deleteFromInv('chicken', 1);
						eng.setMessage('You found Smash\'s Chicken? Smash grateful. Take this armor. Player got the fireproof armor!');
						sprites.brownchicken = new Sprite(spriteDefinitions.brownchicken, 256, 320, 1, 12, 'left', 
							function(mod) {
								this.pace(mod, 'horizontal', 50);
							}
						);
						sprites.player.tileset = tilesets.fireproofturtle;
						sprites.player.hasArmor = true;
					}
				break;
			}
		}
	},
	scrollItem: function() {
		if (typeof sprites.player.inventory[game.selectedItem + 1] == 'undefined') {
			game.selectedItem = 0;
		} else {
			game.selectedItem += 1;
		}
	},
	drawItem: function() {
		if (typeof sprites.player.inventory[game.selectedItem] != 'undefined') {
			ctx.fillStyle = 'rgba(0, 0, 0, .5)';
			ctx.fillRect(canvas.width - 80, canvas.height - 80, 64, 64);
			ctx.save();
			ctx.globalAlpha = .75;
			switch (sprites.player.inventory[game.selectedItem]) {
				case 'axe':
					ctx.drawImage(tilesets.axe.image, 0, 0, tilesets.axe.tileWidth, tilesets.axe.tileHeight, canvas.width - 80, canvas.height - 80, tilesets.axe.tileWidth, tilesets.axe.tileHeight);
				break;
				case 'fireball':
					ctx.drawImage(tilesets.fireball.image, 0, 0, tilesets.fireball.tileWidth, tilesets.fireball.tileHeight, canvas.width - 68, canvas.height - 68, tilesets.fireball.tileWidth, tilesets.fireball.tileHeight);
				break;
				case 'potion':
					ctx.drawImage(tilesets.potion.image, 0, 0, tilesets.potion.tileWidth, tilesets.potion.tileHeight, canvas.width - 76, canvas.height - 80, tilesets.potion.tileWidth, tilesets.potion.tileHeight);
				break;
				case 'key':
					ctx.drawImage(tilesets.keys.image, 0, 0, tilesets.keys.tileWidth, tilesets.keys.tileHeight, canvas.width - 80, canvas.height - 80, tilesets.keys.tileWidth, tilesets.keys.tileHeight);
				break;
				case 'icewand':
					ctx.drawImage(tilesets.icewand.image, 0, 0, tilesets.icewand.tileWidth, tilesets.icewand.tileHeight, canvas.width - 80, canvas.height - 80, tilesets.icewand.tileWidth, tilesets.icewand.tileHeight);
				break;
				case 'map':
					ctx.drawImage(tilesets.mapitem.image, 0, 0, tilesets.mapitem.tileWidth, tilesets.mapitem.tileHeight, canvas.width - 72, canvas.height - 72, tilesets.mapitem.tileWidth, tilesets.mapitem.tileHeight);
				break;
				case 'hammer':
					ctx.drawImage(tilesets.hammer.image, 0, 0, tilesets.hammer.tileWidth, tilesets.hammer.tileHeight, canvas.width - 80, canvas.height - 80, tilesets.hammer.tileWidth, tilesets.hammer.tileHeight);
				break;
				case 'chicken':
					ctx.drawImage(tilesets.chicken.image, 168, 0, tilesets.chicken.tileWidth, tilesets.chicken.tileHeight, canvas.width - 76, canvas.height - 68, tilesets.chicken.tileWidth, tilesets.chicken.tileHeight);
				break;
			}
			ctx.restore();
		}
	},
	deleteFromInv: function(item, quantity) {
		for (i = quantity; i > 0; i --) {
			var returnKey = eng.inArray(item, sprites.player.inventory, true);
			if (returnKey !== false) {
				sprites.player.inventory.splice(returnKey, 1);
				eng.scrollItem();
				
			} else {
				return false;
			}
		}
	},
	drawMap: function() {
		if (sprites.player.inventory[game.selectedItem] != 'map') {
			game.displayMap = false;
		}
		var drawX = Math.floor(canvas.width / 2 - tilesets.gamemap.tileWidth / 2), drawY = Math.floor(canvas.height / 2 - tilesets.gamemap.tileHeight / 2);
		ctx.drawImage(tilesets.gamemap.image, 0, 0, tilesets.gamemap.tileWidth, tilesets.gamemap.tileHeight, drawX, drawY, tilesets.gamemap.tileWidth, tilesets.gamemap.tileHeight);
		for (var x = 0; x < tilesets.gamemap.tileWidth; x += 40) {
			for (var y = 0; y < tilesets.gamemap.tileHeight; y += 40) {
				if (!eng.inArray(x / 40 + ',' + y / 40, game.discoveredMaps)) {
					ctx.fillStyle = '#000';
					ctx.fillRect(x + drawX, y + drawY, 40, 40);
				}
			}		
		}
		if (typeof game.mapTurtleHeadFlash == 'undefined') {
			game.mapTurtleHeadFlash = true;
			game.mapTurtleHeadFlashTimer = Date.now();
		}
		if (game.mapTurtleHeadFlash) {
			ctx.drawImage(tilesets.turtlehead.image, 0, 0, tilesets.turtlehead.tileWidth, tilesets.turtlehead.tileHeight, game.mapXPos * 40 + drawX + 8, game.mapYPos * 40 + drawY + 8, tilesets.turtlehead.tileWidth, tilesets.turtlehead.tileHeight);
		}
		if (Date.now() - game.mapTurtleHeadFlashTimer > 300){
			game.mapTurtleHeadFlash = !game.mapTurtleHeadFlash;
			game.mapTurtleHeadFlashTimer = Date.now();
		}
		
	},
	drawHealthBar: function(sprite) {
		if (game.mapXPos == sprite.mapX && game.mapYPos == sprite.mapY && sprite.health > 0) {
			ctx.fillStyle = '#000';
			ctx.fillRect(192, 576, 384, 32);
			ctx.fillStyle = '#600';
			ctx.fillRect(200, 584, Math.floor(sprite.health / sprite.maxHealth * 368), 16);
		}
	}
}