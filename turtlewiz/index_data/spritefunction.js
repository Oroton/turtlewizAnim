
function Tileset(src, tileWidth, tileHeight, solid) {
	eng.imageCount ++;
	this.image = new Image();
	this.image.onload = function() {eng.loadedImages ++;}
	this.image.src = src;
	
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	
	this.solid = solid;
}
//animation class
function Animation(frames, frameDuration) {
			this.frames = frames;
			this.currentFrame = 0;
			this.frameTimer = Date.now();
			this.frameDuration = frameDuration;
		}

function staticObj(frames) {
			this.frames = frames;
			this.currentFrame = 0;
		}


function SpriteDefinition(tileset, states, speed, health, collidesWithSolid, playerControlled, attributes, collisions) {
	this.tileset = tileset;
	this.frames = states;
	this.currentFrame = 0;
	this.animstates = states;      //changed for simplifications of variables
	this.speed = speed;
	this.health = health;
	this.collidesWithSolid = collidesWithSolid;
	this.playerControlled = playerControlled;
	this.attributes = attributes;
	this.collisions = collisions;
}

function Sprite(definition, x, y, mapX, mapY, startState, func, onDeath) {
	this.tileset = definition['tileset'];
	this.states = definition['animstates']; //changed for simplifcations of values/variables
	this.speed = definition['speed'];
	this.maxHealth = definition['health'];
	this.health = definition['health'];
	this.collidesWithSolid = definition['collidesWithSolid'];
	this.playerControlled = definition['playerControlled'];
	for (var key in definition['attributes']) {
		this[definition['attributes'][key]] = true;
	}
	this.collisions = definition['collisions'];
	this.currentHealth = this.health;
	this.currentState = startState;
	this.width = this.tileset.tileWidth;
	this.height = this.tileset.tileHeight;
	this.x = x;
	this.y = y;
	this.mapX = mapX;
	this.mapY = mapY;
	this.func = func;
	this.onDeath = onDeath;
	this.frames = definition['states'];
	this.currentFrame = 0;
	//this.frames = frames;
	//this.frameDuration = frameDuration;
}

Sprite.prototype.update = function(mod) {
	
	if (this.x > canvas.width || this.x < 0 - this.width || this.y > canvas.height || this.y < 0 - this.height) {
		if (!this.allowLiveOffScreen) {
			this.kill = true;
			if (typeof this.onDeath != 'undefined')  {
				this.onDeath(mod);
			}
		}
	}
	if (this.playerControlled && !this.beingBumped) {
		this.targetX = this.x; 
		this.targetY = this.y;
		if (eng.keysDown[37] || eng.keysDown[39]) {
			if (eng.keysDown[37] && !eng.keysDown[39]) { //left
				this.currentState = 'left';
				this.targetX -= this.speed * mod;
                                updateAnimation(this.states[this.currentState]);

			}
			if (eng.keysDown[39] && !eng.keysDown[37]) { //right
				this.currentState = 'right';
				this.targetX += this.speed * mod;
                                updateAnimation(this.states[this.currentState]);
			}
		} else {
			if (eng.keysDown[38] && !eng.keysDown[40]) { //up
				this.currentState = 'up';
				this.targetY -= this.speed * mod;
                                updateAnimation(this.states[this.currentState]);
			}
			if (eng.keysDown[40] && !eng.keysDown[38]) { //down
				this.currentState = 'down';
				this.targetY += this.speed * mod;
                                updateAnimation(this.states[this.currentState]);
			}
		}
		if (this.targetX < 0) { //off map left
			game.mapXPos -= 1;
			eng.updateMap();
			this.targetX = canvas.width - this.width;
			this.mapX -= 1;
		} else if (this.targetY < 0) { //off map up
			game.mapYPos -= 1;
			eng.updateMap();
			this.targetY = canvas.height - this.height;
			this.mapY -= 1;
		} else if (this.targetX + this.width > canvas.width) { //off map right
			game.mapXPos += 1;
			eng.updateMap();
			this.targetX = 0;
			this.mapX += 1;
		} else if (this.targetY + this.height > canvas.height) { //off map down
			game.mapYPos += 1;
			eng.updateMap();
			this.targetY = 0;
			this.mapY += 1;
		}
	} else if (this.beingBumped) {
		if (this.targetX < 0) { 
			this.targetX = 0;
		} else if (this.targetY < 0) { 
			this.targetY = 0;
		} else if (this.targetX + this.width > canvas.width) { 
			this.targetX = canvas.width - this.width;
		} else if (this.targetY + this.height > canvas.height) { 
			this.targetY = canvas.height - this.height;
		}
		if (Date.now() - this.bumpTimer > 200) {
			this.beingBumped = false;
		}
	}
	if (this.invincible) {
		if (Date.now() - this.invincibleTimer > 500) {
			this.invincible = false;
		} else {
			if (this.flashing) {
				if (Date.now() - this.flashTimer > 500) {
					this.flashing = false;
					this.flashOn = false;
				} else {
					if (this.flashOn) {
						if (Date.now() - this.flashOnTimer > 50) {
							this.flashOn = false;
							this.flashOnTimer = Date.now();
						}
					} else {
						if (Date.now() - this.flashOnTimer > 50) {
							this.flashOn = true;
							this.flashOnTimer = Date.now();
						}
					}
				}
			} else {
				this.flashing = true;
				this.flashTimer = Date.now();
				this.flashOnTimer = Date.now();
				this.flashOn = true;
			}
		}
	} else {
		this.flashOn = false;
	}
	
	if (this.collidesWithSolid) {
		if (this.targetX < this.x) { //horizontal solid collision
			if ( //left
				!eng.inArray(game.currentMap.code[Math.floor((this.targetX + 1) / tilesets.maptiles.tileWidth)][Math.floor(this.targetY / tilesets.maptiles.tileHeight)], tilesets.maptiles.solid) &&
				!eng.inArray(game.currentMap.code[Math.floor((this.targetX + 1) / tilesets.maptiles.tileWidth)][Math.floor((this.targetY + this.height - 1) / tilesets.maptiles.tileHeight)], tilesets.maptiles.solid)
			) {
				this.x = this.targetX;
			} else {
				this.x = Math.ceil(this.targetX / tilesets.maptiles.tileWidth) * tilesets.maptiles.tileWidth;
			}
		} else if (this.targetX > this.x) { 
			if ( //right
				!eng.inArray(game.currentMap.code[Math.floor((this.targetX + this.width - 1) / tilesets.maptiles.tileWidth)][Math.floor(this.targetY / tilesets.maptiles.tileHeight)], tilesets.maptiles.solid) &&
				!eng.inArray(game.currentMap.code[Math.floor((this.targetX + this.width - 1) / tilesets.maptiles.tileWidth)][Math.floor((this.targetY + this.height - 1) / tilesets.maptiles.tileHeight)], tilesets.maptiles.solid)
			) {
				this.x = this.targetX;
			} else {
				this.x = Math.floor(this.targetX / tilesets.maptiles.tileWidth) * tilesets.maptiles.tileWidth + tilesets.maptiles.tileWidth - this.width;
			}
		}
			
		if (this.targetY < this.y) { //vertical solid collision
			if ( //up
				!eng.inArray(game.currentMap.code[Math.floor((this.targetX + 1) / tilesets.maptiles.tileWidth)][Math.floor((this.targetY + 1) / tilesets.maptiles.tileHeight)], tilesets.maptiles.solid) &&
				!eng.inArray(game.currentMap.code[Math.floor((this.targetX + this.width - 1) / tilesets.maptiles.tileWidth)][Math.floor((this.targetY + 1) / tilesets.maptiles.tileHeight)], tilesets.maptiles.solid)
			) {
				this.y = this.targetY;
			} else {
				this.y = Math.ceil(this.targetY / tilesets.maptiles.tileHeight) * tilesets.maptiles.tileHeight;
			}
		} else if (this.targetY > this.y) {
			if ( //down
				!eng.inArray(game.currentMap.code[Math.floor((this.targetX + 1) / tilesets.maptiles.tileWidth)][Math.floor((this.targetY + this.height - 1) / tilesets.maptiles.tileHeight)], tilesets.maptiles.solid) &&
				!eng.inArray(game.currentMap.code[Math.floor((this.targetX + this.width - 1) / tilesets.maptiles.tileWidth)][Math.floor((this.targetY + this.height - 1) / tilesets.maptiles.tileHeight)], tilesets.maptiles.solid)
			) {
				this.y = this.targetY;
			} else {
				this.y = Math.floor(this.targetY / tilesets.maptiles.tileHeight) * tilesets.maptiles.tileHeight + tilesets.maptiles.tileHeight - this.height;
			}
		}
	}
	
	
	if (typeof this.func != 'undefined') {
		this.func(mod);
	}
	
	if (typeof this.collisions != 'undefined') {
		this.collisions(mod);
	}
	
	if (this.health <= 0) { //dying
		if (this.playerControlled) {
			this.mapX = game.respawnPoint.mapX;
			this.mapY = game.respawnPoint.mapY;
			game.mapXPos = game.respawnPoint.mapX;
			game.mapYPos = game.respawnPoint.mapY;
			this.health = 5;
			eng.updateMap();
			this.x = game.respawnPoint.x;
			this.y = game.respawnPoint.y;
			this.targetX = game.respawnPoint.x;
			this.targetY = game.respawnPoint.y;
			if (typeof game.respawnPoint.func != 'undefined') {
				game.respawnPoint.func();
			}
		} else {
			if (typeof this.onDeath != 'undefined')  {
				this.onDeath(mod);
			}
			this.kill = true;
		}
	}
}

Sprite.prototype.draw = function() {
	if (!this.flashOn) {
		ctx.drawImage(
			this.tileset.image,           /*         Obscure everthing below this           */          //Added by Oroton
			//this.states[this.currentState].split(',')[0] * this.tileset.tileWidth,
			//this.states[this.currentState].split(',')[1] * this.tileset.tileHeight,
			this.states[this.currentState].frames[this.states[this.currentState].currentFrame].split(',')[0] * this.tileset.tileWidth,
			this.states[this.currentState].frames[this.states[this.currentState].currentFrame].split(',')[1] * this.tileset.tileHeight,
                        this.tileset.tileWidth,       /*         Obscure everthing above this           */          //Added by Oroton
			this.tileset.tileHeight,      //.frames[sprite.stateAnimations[sprite.currentState].currentFrame]
			Math.round(this.x),
			Math.round(this.y),
			this.width,
			this.height
		);
	}
}



//Added by Oroton   Start
		function updateAnimation(anim) {
			if (Date.now() - anim.frameTimer > anim.frameDuration) {
				if (anim.currentFrame < anim.frames.length - 1) anim.currentFrame ++;
				else anim.currentFrame = 0;
				anim.frameTimer = Date.now();
			}
		}
//Added by Oroton   End

Sprite.prototype.bump = function(direction, distance) {
	switch (direction) {
		case 'left':
			this.targetX = this.x - distance;
		break;
		case 'up':
			this.targetY = this.y - distance;
		break;
		case 'right':
			this.targetX = this.x + distance;
		break;
		case 'down':
			this.targetY = this.y + distance;
		break;
	}
}

Sprite.prototype.bumpPlayer = function(direction, distance) {
	switch (direction) {
		case 'left':
			sprites.player.targetX = sprites.player.x - distance;
		break;
		case 'up':
			sprites.player.targetY = sprites.player.y - distance;
		break;
		case 'right':
			sprites.player.targetX = sprites.player.x + distance;
		break;
		case 'down':
			sprites.player.targetY = sprites.player.y + distance;
		break;
	}
	sprites.player.beingBumped = true;
	sprites.player.bumpTimer = Date.now();
}

Sprite.prototype.chasePlayer = function(mod) {
	if (this.x + this.width < sprites.player.x) {
		this.targetX = this.x + this.speed * mod;
		if (typeof this.states['right'] != 'undefined') {
			this.currentState = 'right';
		}
	} else if (this.x > sprites.player.x + sprites.player.width) {
		this.targetX = this.x - this.speed * mod;
		if (typeof this.states['left'] != 'undefined') {
			this.currentState = 'left';
		}
	} else {
		this.targetX = this.x;
	}
	if (this.y + this.height < sprites.player.y) {
		this.targetY = this.y + this.speed * mod;
		if (typeof this.states['down'] != 'undefined') {
			this.currentState = 'down';
		}
	} else if (this.y > sprites.player.y + sprites.player.height) {
		this.targetY = this.y - this.speed * mod;
		if (typeof this.states['up'] != 'undefined') {
			this.currentState = 'up';
		}
	} else {
		this.targetY = this.y;
	}
}

Sprite.prototype.fireAtPlayer = function(mod, def, interval, random, offset) {
	if (typeof this.fireTimer == 'undefined') {
		if (typeof offset == 'undefined') {
			offset = 0;
		}
		this.fireTimer = Date.now() + offset;
		if (random) {
			this.multiplier = Math.random() + 0.5;
		} else {
			this.multiplier = 1;
		}
	} else {
		if (Date.now() - this.fireTimer > interval * this.multiplier) {
			game.uniqueCount ++;
			sprites['projectile' + game.uniqueCount] = new Sprite(def, this.x + this.width / 2 - (def.tileset.tileWidth / 2), this.y + this.height / 2 - (def.tileset.tileHeight / 2), this.mapX, this.mapY, this.currentState, 
				function(mod) {
					if (typeof this.xTraj == 'undefined') {
						this.trajLength = Math.sqrt(Math.pow((sprites.player.x + sprites.player.width / 2 - def.tileset.tileWidth / 2 - this.x), 2) + Math.pow((sprites.player.y + sprites.player.height / 2 - def.tileset.tileHeight / 2 - this.y), 2));
						this.xTraj = (sprites.player.x + sprites.player.width / 2 - this.x) / this.trajLength;
						this.yTraj = (sprites.player.y + sprites.player.height / 2 - this.y) / this.trajLength;
					} else {
						this.x += this.xTraj * this.speed * mod;
						this.y += this.yTraj * this.speed * mod;
					}
				},
				function(mod) {
				
				}
			);
			this.fireTimer = Date.now();
			if (random) {
				this.multiplier = Math.random();
			}
		}
	}
}

Sprite.prototype.collides = function(colliderSprite, xOffset, yOffset) {
	if (typeof colliderSprite != 'undefined') {
		if (typeof xOffset == 'undefined') {
			xOffset = 0;
		}
		if (typeof yOffset == 'undefined') {
			yOffset = 0;
		}
		return this.x + xOffset < colliderSprite.x + colliderSprite.width &&
			this.x + xOffset + this.width > colliderSprite.x &&
			this.y + yOffset < colliderSprite.y + colliderSprite.height &&
			this.y + yOffset + this.height > colliderSprite.y;
	}
}

Sprite.prototype.collidesTile = function(tile) {
	if (this.x + this.width > canvas.width && this.x < canvas.width) { //partially off map right
		return game.currentMap.code[Math.floor(this.x / tilesets.maptiles.tileWidth)][Math.floor(this.y / tilesets.maptiles.tileHeight)] == tile ||
			game.currentMap.code[Math.floor(this.x / tilesets.maptiles.tileWidth)][Math.floor((this.y + this.height) / tilesets.maptiles.tileHeight)] == tile;
	} else if (this.y + this.height > canvas.height && this.y < canvas.height) { //partially off map bottom
		return game.currentMap.code[Math.floor(this.x / tilesets.maptiles.tileWidth)][Math.floor(this.y / tilesets.maptiles.tileHeight)] == tile ||
			game.currentMap.code[Math.floor((this.x + this.width) / tilesets.maptiles.tileWidth)][Math.floor(this.y / tilesets.maptiles.tileHeight)] == tile;
	} else if (this.x < 0 && this.x + this.width > 0) { //partially off map left
		return game.currentMap.code[Math.floor((this.x + this.width) / tilesets.maptiles.tileWidth)][Math.floor(this.y / tilesets.maptiles.tileHeight)] == tile ||
			game.currentMap.code[Math.floor((this.x + this.width) / tilesets.maptiles.tileWidth)][Math.floor((this.y + this.width) / tilesets.maptiles.tileHeight)] == tile;
	} else if (this.y < 0 && this.y + this.height > 0) { //partially off map top
		return game.currentMap.code[Math.floor(this.x / tilesets.maptiles.tileWidth)][Math.floor((this.y + this.height) / tilesets.maptiles.tileHeight)] == tile ||
			game.currentMap.code[Math.floor((this.x + this.width) / tilesets.maptiles.tileWidth)][Math.floor((this.y + this.height) / tilesets.maptiles.tileHeight)] == tile;
	} else if (this.x > 0 && this.x + this.width < canvas.width && this.y > 0 && this.y + this.height < canvas.height) { //if totally in canvas
		return game.currentMap.code[Math.floor(this.x / tilesets.maptiles.tileWidth)][Math.floor(this.y / tilesets.maptiles.tileHeight)] == tile ||
			game.currentMap.code[Math.floor((this.x + this.width) / tilesets.maptiles.tileWidth)][Math.floor(this.y / tilesets.maptiles.tileHeight)] == tile ||
			game.currentMap.code[Math.floor(this.x / tilesets.maptiles.tileWidth)][Math.floor((this.y + this.height) / tilesets.maptiles.tileHeight)] == tile ||
			game.currentMap.code[Math.floor((this.x + this.width) / tilesets.maptiles.tileWidth)][Math.floor((this.y + this.height) / tilesets.maptiles.tileHeight)] == tile;
	} else { //if totally off canvas
		return false;
	}
	
}

Sprite.prototype.oppositeDirection = function() {
	switch (this.currentState) {
		case 'up':
			return 'down';
		break;
		case 'right':
			return 'left';
		break;
		case 'down':
			return 'up';
		break;
		case 'left':
			return 'right';
		break;
	}
}

Sprite.prototype.pace = function(mod, direction, range) {
	if (typeof this.startingX == 'undefined') {
		this.startingX = this.x;
		this.startingY = this.y;
	}
	switch (direction) {
		case 'horizontal':
			switch (this.currentState) {
				case 'left':
					if (this.startingX - this.x > range / 2) {
						this.currentState = 'right';
					}
				break;
				case 'right':
					if (this.x - this.startingX > range / 2) {
						this.currentState = 'left';
					}
				break;
			}
		break;
		case 'vertical':
			case 'up':
				if (this.startingY - this.y > range / 2) {
					this.currentState = 'down';
				}
			break;
			case 'down':
				if (this.y - this.startingY > range / 2) {
					this.currentState = 'up';
				}
			break;
		break;
	}
	switch (this.currentState) {
		case 'left': 
			this.x -= this.speed * mod;
		break;
		case 'up':
			this.y -= this.speed * mod;
		break;
		case 'right':
			this.x += this.speed * mod;
		break;
		case 'down':
			this.y += this.speed * mod;
		break;
	}
}

Sprite.prototype.moveTo = function(mod, x, y, callback) {
	if (this.x == x && this.y == y) {
		if (typeof callback != 'undefined') {
			callback(mod);
		}
	} else {
		if (this.x < x) {
			this.targetX = Math.round(this.x + this.speed * mod);
			if (this.targetX > x) this.targetX = x;
		}
		if (this.x > x) {
			this.targetX = Math.round(this.x - this.speed * mod);
			if (this.targetX < x) this.targetX = x;
		}
		if (this.y < y) {
			this.targetY = Math.round(this.y + this.speed * mod);
			if (this.targetY > y) this.targetY = y;
		}
		if (this.y > y) {
			this.targetY = Math.round(this.y - this.speed * mod);
			if (this.targetY < y) this.targetY = y;
		}
	}
}