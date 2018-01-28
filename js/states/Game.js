var DunCrawl = DunCrawl || {}

DunCrawl.GameState = {
    init: function(data) {

        this.ROWS = 8
        this.COLS = 6
        this.TILE_SIZE = 60

        data = data || {}
        this.currentLevel = data.currentLevel || 1

        this.playerStats = data.playerStats || {
            health: 25,
            attack: 2,
            defense: 1,
            gold: 0,
            hasKey: false
        }
    },
    create: function() {
        //tiles groups
        this.backgroundTiles = this.add.group()

        //map elements
        this.mapElements = this.add.group()

        //board
        this.board = new DunCrawl.Board(this, {
            rows: this.ROWS,
            cols: this.COLS,
            tileSize: this.TILE_SIZE
        })

        //item

        this.item = new DunCrawl.Item(this, {
            row: 3,
            col: 2,
            asset: 'sword',
            type: 'consumable',
            health: 10,
            attack: 0,
            defense: 1,
            gold: 100
        })

        this.mapElements.add(this.item)

    },
    gameOver: function() {
        this.game.state.start('Game')
    },
    nextLevel: function() {
        this.game.state.start('Game', true, false, { currentLevel: this.currentLevel + 1, playerStats: this.playerStats })
    }
}