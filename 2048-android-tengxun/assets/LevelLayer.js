/**
 * @GameName :
 * 2048
 *
 * @DevelopTool:
 * Cocos2d-x Editor (CocosEditor)
 *
 * @time
 * 2014-04-04 pm
 *
 * @Licensed:
 * This showcase is licensed under GPL.
 *
 * @Authors:
 * Programmer: touchSnow
 *
 * @Links:
 * http://www.cocos2d-x.com/ (cocos官方)
 * https://github.com/makeapp      （github）
 * http://blog.csdn.net/touchsnow (csdn博客)
 * http://blog.makeapp.co/ （官方博客）
 * http://www.cocoseditor.com/ （建设中官网）
 *
 * @Contact
 * 邮箱：zuowen@makeapp.co
 * qq群：232361142
 *
 */


var LevelLayer = function () {
    cc.log("LevelLayer")
};

LevelLayer.prototype.onDidLoadFromCCB = function () {
    if (sys.platform == 'browser') {
        this.onEnter();
    }
    else {
        this.rootNode.onEnter = function () {
            this.controller.onEnter();
        };
    }


    this.rootNode.onTouchesBegan = function (touches, event) {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };

    this.rootNode.onTouchesMoved = function (touches, event) {
        this.controller.onTouchesMoved(touches, event);
        return true;
    };
    this.rootNode.onTouchesEnded = function (touches, event) {
        this.controller.onTouchesEnded(touches, event);
        return true;
    };

    this.rootNode.setTouchEnabled(true);

};

LevelLayer.prototype.onEnter = function () {
    cc.SpriteFrameCache.getInstance().addSpriteFrames("res/main.plist");

    this.initX = 9;
    this.initY = 850;
    this.cellSize = 162;
    this.cellSpace = 18;

    this.tables = new Array(4);
    for (var j = 0; j < 4; j++) {
        var sprites = new Array(4);
        for (var i = 0; i < 4; i++) {
            var px = this.initX + this.cellSize / 2 + i * (this.cellSize + this.cellSpace);
            var py = this.initY + this.cellSize / 2 - j * (this.cellSize + this.cellSpace);
            var cell = cc.MySprite.create(this.rootNode, "5.png", cc.p(px, py), 1);
            var num = 4 * j + i;
            if (num < VERSIONS.length) {
                var cellLabel = cc.MySprite.createLabel(cell, VERSIONS[num].name);
                cellLabel.setFontSize(30);
            }

            if (num == 15) {
                /*cell.runAction(cc.RepeatForever.create(cc.Sequence.create(
                 cc.ScaleTo.create(0.2, 0.9), cc.ScaleTo.create(0.2, 1)
                 )));*/
                var cellLabel = cc.MySprite.createLabel(cell, "");
                cellLabel.setFontSize(30);
            }
            sprites[i] = cell;
        }
        this.tables[j] = sprites;
    }

};

LevelLayer.prototype.onTouchesBegan = function (touches, event) {
    cc.log("onTouchesBegan");
    var loc = touches[0].getLocation();

    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            var sprite = this.tables[j][i];
            if (cc.rectContainsPoint(sprite.getBoundingBox(), loc)) {
                var num = 4 * j + i;
                cc.log("num==" + num);
                if (num < VERSIONS.length) {
                    indexVersions = num;
                    cc.BuilderReader.runScene("", "MainLayer");
                }

                if (num == 15) {
                    sprite.setScale(1);
                    sprite.stopAllActions();
                    sys.localStorage.setItem("ad", "1");
                }
            }
        }
    }

};

LevelLayer.prototype.onTouchesMoved = function (touches, event) {
};

LevelLayer.prototype.onTouchesEnded = function (touches, event) {

};


