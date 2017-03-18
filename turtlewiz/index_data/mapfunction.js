
function Map(code, onload, runFunction) {
	this.code = code;
	this.onload = onload;
	this.runFunction = runFunction;
}

Map.prototype.draw = function() {
	for (var x in this.code) {
		for (var y in this.code[x]) {
			ctx.drawImage(tilesets.maptiles.image, this.code[x][y].toString().split(',')[0] * tilesets.maptiles.tileWidth, this.code[x][y].toString().split(',')[1] * tilesets.maptiles.tileHeight, tilesets.maptiles.tileWidth, tilesets.maptiles.tileHeight, x * tilesets.maptiles.tileWidth, y * tilesets.maptiles.tileHeight, tilesets.maptiles.tileWidth, tilesets.maptiles.tileHeight);
		}
	} 
}

Map.prototype.precip = function(type, intensity) {
	switch (type) {
		case 'rain':
			if (typeof this.raindropCount == 'undefined') {
				this.raindropCount = 0;
			} 
			while (this.raindropCount < intensity) {
				this.createRainDrop(Math.random() * canvas.width, Math.random() * canvas.height);
			}
		break;
		case 'snow':
			if (typeof this.snowflakeCount == 'undefined') {
				this.snowflakeCount = 0;
			} 
			while (this.snowflakeCount < intensity) {
				this.createSnowFlake(Math.random() * canvas.width, Math.random() * canvas.height);
			}
		break;
		case 'sand':
			if (typeof this.sandgrainCount == 'undefined') {
				this.sandgrainCount = 0;
			} 
			while (this.sandgrainCount < intensity) {
				this.createSandGrain(Math.random() * canvas.width, Math.random() * canvas.height);
			}
		break;
	}
}

Map.prototype.createSnowFlake = function(x, y) {
	sprites['snowflake' + game.uniqueCount] = new Sprite(spriteDefinitions.environment.snowflake, x, y, game.mapXPos, game.mapYPos, 'down',
		function(mod) {
			this.y += this.speed * mod;
		},
		function() {
			game.currentMap.snowflakeCount --;
			game.currentMap.createSnowFlake(Math.random() * canvas.width, 0);
		}
	);
	game.uniqueCount ++;
	this.snowflakeCount ++;
}

Map.prototype.createRainDrop = function(x, y) {
	sprites['raindrop' + game.uniqueCount] = new Sprite(spriteDefinitions.environment.raindrop, x, y, game.mapXPos, game.mapYPos, 'down',
		function(mod) {
			this.y += this.speed * mod;
			if (this.mapX != game.mapXPos || this.mapY != game.mapYPos) {
				this.kill = true;
			}
		},
		function() {
			game.currentMap.raindropCount --;
			game.currentMap.createRainDrop(Math.random() * canvas.width, 0);
		}
	);
	game.uniqueCount ++;
	this.raindropCount ++;
}

Map.prototype.createSandGrain = function(x, y) {
	sprites['sandgrain' + game.uniqueCount] = new Sprite(spriteDefinitions.environment.sandgrain, x, y, game.mapXPos, game.mapYPos, 'right',
		function(mod) {
			this.x += this.speed * mod;
			if (this.mapX != game.mapXPos || this.mapY != game.mapYPos) {
				this.kill = true;
			}
		},
		function() {
			game.currentMap.sandgrainCount --;
			game.currentMap.createSandGrain(0, Math.random() * canvas.height);
		}
	);
	game.uniqueCount ++;
	this.sandgrainCount ++;
}