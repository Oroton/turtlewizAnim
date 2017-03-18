var game = {
	mapXPos: 0, 
	mapYPos: 0, 
	message: '',
	plotSequence: 0, 
	itemDelay: 0, 
	splashScreen: true,
	respawnPoint: {
		x: 128,
		y: 128,
		mapX: 0,
		mapY: 0
	},
	uniqueCount: 0,
	discoveredMaps: [],
	displayMap: false,
	debugMode: {
		on: false,
		mapX: 10,
		mapY: 5,
		playerX: 368,
		playerY: 167,
		inventory: ['axe', 'fireball', 'icewand', 'map', 'hammer'],
		turnOn: function() {
			game.mapXPos = this.mapX;
			game.mapYPos = this.mapY;
			game.splashScreen = false;
			sprites.player.mapX = this.mapX;
			sprites.player.mapY = this.mapY;
			sprites.player.x = this.playerX;
			sprites.player.y = this.playerY;
			sprites.player.inventory = this.inventory;
			sprites.player.hasHeart = true;
			sprites.player.hasArmor = true;
			sprites.player.tileset = tilesets.fireproofturtle;
			eng.updateMap();
		}
	},

	fps: {
		current: 0,
		last: 0,
		lastUpdated: Date.now(),
		update: function() {
			this.current ++;
			if (Date.now() - this.lastUpdated >= 1000) {
				this.last = this.current;
				this.current = 0;
				this.lastUpdated = Date.now();
			}
		},
		draw: function() {
			ctx.font = '12pt Arial';
			ctx.fillStyle = '#fff';
			ctx.textBaseline = 'top';
			ctx.fillText(this.last + 'fps', 5, 5);
		}
	}
}

game.dungeon1 = {
	snailsKilled: 0
}

game.finaldungeon = {
	lavaShutoff: 0
}