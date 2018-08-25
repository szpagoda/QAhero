// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        button: cc.Node,
        label: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad() {},

    init() {
        this.button.color = new cc.Color(255, 255, 255)
        this.button.on('click', () => {
            this.game.progressBar.getComponent('ProgressBar').stop = true
            for (const option of this.game.options) {
                option.getComponent('Button').button.off('click')
            }
            if (this.correct) {
                this.button.color = new cc.Color(0, 255, 0)
                this.game.gainScore()
                this.scheduleOnce(() => {
                    this.game.destroyOptions()
                    this.game.renderQuestion()
                    this.game.startCountDown(30 - Math.floor(this.game.score / 25) * 5)
                }, 1)
            } else {
                this.button.color = new cc.Color(255, 0, 0)
                this.game.showCorrectOption()
                this.scheduleOnce(() => {
                    this.game.gameOver()
                }, 1)
            }
        })
    },

    start() {

    },

    // update(dt) {},
});
