var DunCrawl = DunCrawl || {}

DunCrawl.BootState = {
    init: function() {
        this.game.stage.backgroundColor = '#FFF'

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

        this.scale.pageAlignHorizontally = true
        this.scale.pageAlignVertically = true
    },
    preload: function() {
        this.load.image('bar', 'assets/images/preloader-bar.png')
    },
    create: function() {
        this.state.start('Preload')
    }
}