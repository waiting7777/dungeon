var DunCrawl = DunCrawl || {}

DunCrawl.Enemy = function(state, data) {

    var position = state.board.getXYFromRowCol(data)

    Phaser.Sprite.call(this, state.game, position.x, position.y, data.asset)

    this.game = state.game
    this.state = state
    this.board = state.board
    this.row = data.row
    this.col = data.col
    this.data = data
    this.data.type = 'enemy'

    this.anchor.setTo(0.5)

    //show enemy stats
    var x = 0
    var y = -4

    //stats panel
    var bitmapRect = this.game.add.bitmapData(28, 32)
    bitmapRect.ctx.fillStyle = '#0000FF'
    bitmapRect.ctx.fillRect(0, 0, 28, 32)

    //sprite for the enemy stats
    this.panel = new Phaser.Sprite(this.game, x - 2, y - 2, bitmapRect)
    this.panel.alpha = 0.6
    this.addChild(this.panel)

    var style = {
        font: '7px Prstart',
        fill: '#FFF',
        align: 'left'
    }

    //health
    this.healthIcon = new Phaser.Sprite(this.game, x, y, 'heart')
    this.healthIcon.scale.setTo(0.3)
    this.addChild(this.healthIcon)

    this.healthLabel = new Phaser.Text(this.game, x + 10, y, '', style)
    this.addChild(this.healthLabel)

    //attack
    this.attackIcon = new Phaser.Sprite(this.game, x, y + 10, 'attack')
    this.attackIcon.scale.setTo(0.35)
    this.addChild(this.attackIcon)

    this.attackLabel = new Phaser.Text(this.game, x + 10, y + 10, '', style)
    this.addChild(this.attackLabel)

    //defense
    this.defenseIcon = new Phaser.Sprite(this.game, x, y + 20, 'shield')
    this.defenseIcon.scale.setTo(0.2)
    this.addChild(this.defenseIcon)

    this.defenseLabel = new Phaser.Text(this.game, x + 10, y + 20, '', style)
    this.addChild(this.defenseLabel)

    this.refreshStats()
}

DunCrawl.Enemy.prototype = Object.create(Phaser.Sprite.prototype)
DunCrawl.Enemy.prototype.constructor = DunCrawl.Unit

DunCrawl.Enemy.prototype.refreshStats = function() {
    this.healthLabel.text = Math.ceil(this.data.health)
    this.attackLabel.text = Math.ceil(this.data.attack)
    this.defenseLabel.text = Math.ceil(this.data.defense)
}