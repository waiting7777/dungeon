var DunCrawl = DunCrawl || {}

DunCrawl.Board = function(state, data) {

    this.state = state
    this.game = state.game
    this.rows = data.rows
    this.cols = data.cols
    this.numCells = this.rows * this.cols
    this.tileSize = data.tileSize
    this.mapElements = state.mapElements

    var i, j, tile
    for(i = 0; i < this.rows; i++) {
        for(j = 0; j < this.cols; j++) {
            tile = new Phaser.Sprite(this.game, j * this.tileSize, i * this.tileSize, 'rockTile')
            tile.row = i
            tile.col = j
            this.state.backgroundTiles.add(tile)

            tile.inputEnabled = true
            tile.events.onInputDown.add(function(tile) {
                tile.alpha = 0.5
                console.log('row: ' + tile.row + ' col:' + tile.col)
                console.log(this.getSurrounding(tile))
            }, this)
        }
    }
}

DunCrawl.Board.prototype.getSurrounding = function(tile) {
    var adjacentTiles = []
    var relativePositions = [
        {r: 1, c: -1},
        {r: 1, c: 0},
        {r: 1, c: 1},
        {r: 0, c: -1},
        {r: 0, c: 1},
        {r: -1, c: -1},
        {r: -1, c: 0},
        {r: -1, c: 1}
    ]

    relativePositions.forEach(function(relPos) {
        relRow = tile.row + relPos.r
        relCol = tile.col + relPos.c

        if(relRow >= 0 && relRow < this.rows && relCol >= 0 && relCol < this.cols) {
            adjacentTiles.push({ row: relRow, col: relCol })
        }
    }, this)

    return adjacentTiles
}

DunCrawl.Board.prototype.getXYFromRowCol = function(cell) {
    return {
        x: cell.col * this.tileSize + this.tileSize/2,
        y: cell.row * this.tileSize + this.tileSize/2
    }
}

DunCrawl.Board.prototype.getFreeCell = function() {
    var freeCell, foundCell
    var row, col
    var len = this.mapElements.length

    while(!freeCell) {
        foundCell = false

        // try a random position
        row = this.randomBetween(0, this.rows, true)
        col = this.randomBetween(0, this.cols, true)

        //find a match for the random cell
        for(i = 0; i < len; i++)    {
            if(this.mapElements.children[i].alive && this.mapElements.children[i].row == row && this.mapElements.children[i].col == col) {
                foundCell = true
                break;
            }
        }

        //if there were no match, it means that the cell is free
        if(!foundCell) {
            freeCell = {row: row, col: col}
        }
    }

    return freeCell
}

DunCrawl.Board.prototype.randomBetween = function(a, b, isInteger) {
    var numBetween = a + Math.random() * (b - a)

    if(isInteger) {
        numBetween = Math.floor(numBetween)
    }

    return numBetween
}