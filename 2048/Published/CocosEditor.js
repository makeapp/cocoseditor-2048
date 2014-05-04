/**
 * @GameName :
 * common function
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
 * http://blog.makeapp.co/      （官方博客）
 * http://www.cocoseditor.com/   （建设中官网）
 *
 * @Contact
 * 邮箱：zuowen@makeapp.co
 * qq群：232361142
 *
 */

cc.debug = function (msg) {
    cc.log(msg);
};

cc.Animate.createWithName = function (name) {
    return cc.Animate.create(cc.AnimationCache.getInstance().getAnimation(name));
};

cc.Animate.createWithTime = function (that, name, time) {
    var cache = that.animationCache.getAnimation(name);
    cache.setDelayPerUnit(time);
    return cc.Animate.create(cache);
};

cc.CleanUp = {};
cc.CleanUp.create = function (sprite) {
    return cc.CallFunc.create(function () {
        sprite.cleanuped = true;
        sprite.removeFromParent(true);
    });
};


cc.TurnLeft = {};
cc.TurnLeft.create = function (sprite) {
    return cc.CallFunc.create(function () {
        var camera = sprite.getCamera();
        camera.setEye(0, 0, 1);
    });
};

cc.TurnRight = {};
cc.TurnRight.create = function (sprite) {
    return cc.CallFunc.create(function () {
        var camera = sprite.getCamera();
        camera.setEye(0, 0, -1);
    });
};

cc.Toast = {};
cc.Toast.create = function (node, message, delay) {
    var director = cc.Director.getInstance();
    var size = director.getWinSize();
    var label = cc.LabelTTF.create(message, "Arial", 40);
    label.setPosition(size.width / 2, size.height / 2 + 410);
    label.setColor(cc.c3b(0, 0, 0));
    label.setZOrder(10000);
    node.addChild(label);
    label.runAction(cc.Sequence.create(cc.DelayTime.create(delay), cc.CleanUp.create(label)));
    return label;
};


cc.MySprite = {};
cc.MySprite.create = function (node, frameName, position, ZOrder) {
    var sprite = cc.Sprite.createWithSpriteFrameName(frameName);
    sprite.setPosition(position);
    sprite.setZOrder(ZOrder)
    sprite.setAnchorPoint(cc.p(0.5, 0.5));
    node.addChild(sprite);
    return sprite;
};

cc.MySprite.createLabel = function (node, number) {
    var label = cc.LabelTTF.create(number, "Arial", 50);
    label.setPosition(81, 81);
    label.setColor(cc.c3b(0, 0, 0));
    node.addChild(label);
    return label;
};

cc.rectCreate = function (p, area) {
    return  cc.rect(p.x - area[0], p.y - area[1], area[0] * 2, area[1] * 2);
}

//get index score
sys.localStorage.getScore = function (name, index) {
    var score = sys.localStorage.getItem(name);
    if (score != null && score != undefined && score != "") {
        score = Number(score);
    }
    else {
        score = index;
    }
    return score;
};

//set level score and open next level
sys.localStorage.setLevelScore = function (name, curLevel, curScore) {
    var localCurLevel = sys.localStorage.getItem(name + "_current_level");
    cc.log("localCurLevel==" + localCurLevel);
    localCurLevel = Number(localCurLevel);
    if (curLevel >= localCurLevel) {
        var newCurLevel = curLevel + 1;
        sys.localStorage.setItem(name + "_current_level", newCurLevel);
    }

    var currentLevelScore = sys.localStorage.getItem(name + "_level_" + curLevel);
    if (curScore > currentLevelScore) {
        sys.localStorage.setItem(name + "_level_" + curLevel, curScore);
    }
};


cc.BuilderReader.replaceScene = function (path, ccbName) {
    var scene = cc.BuilderReader.loadAsSceneFrom(path, ccbName);
    cc.Director.getInstance().replaceScene(scene);
    return scene;
};

cc.BuilderReader.loadAsScene = function (file, owner, parentSize) {
    var node = cc.BuilderReader.load(file, owner, parentSize);
    var scene = cc.Scene.create();
    scene.addChild(node);
    return scene;
};


cc.BuilderReader.loadAsSceneFrom = function (path, ccbName) {
    if (path && path.length > 0) {
        cc.BuilderReader.setResourcePath(path + "/");
        return cc.BuilderReader.loadAsScene(path + "/" + ccbName);
    }
    else {
        return cc.BuilderReader.loadAsScene(ccbName);
    }
};

cc.BuilderReader.loadAsNodeFrom = function (path, ccbName, owner) {
    if (path && path.length > 0) {
        cc.BuilderReader.setResourcePath(path + "/");
        return cc.BuilderReader.load(path + "/" + ccbName, owner);
    }
    else {
        return cc.BuilderReader.load(ccbName, owner);
    }
};

cc.BuilderReader.runScene = function (module, name) {
    var director = cc.Director.getInstance();
    var scene = cc.BuilderReader.loadAsSceneFrom(module, name);
    var runningScene = director.getRunningScene();
    if (runningScene === null) {
        cc.log("runWithScene");
        director.runWithScene(scene);
    }
    else {
        cc.log("replaceScene");
        director.replaceScene(scene);
    }
};

cc.getRandomFromMax = function (maxSize) {
    return Math.floor(Math.random() * maxSize) % maxSize;
};

//get index score
sys.localStorage.getScore = function (name, index) {
    var score = sys.localStorage.getItem(name);
    if (score != null && score != undefined && score != "") {
        score = Number(score);
    }
    else {
        score = index;
    }
    return score;
};

//set level score and open next level
sys.localStorage.setLevelScore = function (name, curLevel, curScore) {
    var localCurLevel = sys.localStorage.getItem(name + "_current_level");
    cc.log("localCurLevel==" + localCurLevel);
    localCurLevel = Number(localCurLevel);
    if (curLevel >= localCurLevel) {
        var newCurLevel = curLevel + 1;
        sys.localStorage.setItem(name + "_current_level", newCurLevel);
    }

    var currentLevelScore = sys.localStorage.getItem(name + "_level_" + curLevel);
    if (curScore > currentLevelScore) {
        sys.localStorage.setItem(name + "_level_" + curLevel, curScore);
    }
};

function getRandom(maxSize) {
    return Math.floor(Math.random() * maxSize) % maxSize;
}

String.prototype.isValid = function () {
    if (this == undefined || this == null) {
        return false;
    }
    else {
        return true;
    }
};

Array.prototype.contains = function (value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) {
            return true;
        }
    }
    return false;
}

Array.prototype.position = function (value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) {
            return i;
        }
    }
    return -1;
}

getTimeFormat = function (time) {
    if (time <= 9) {
        return "0" + time;
    }
    else {
        return "" + time;
    }
};

function getHourRemainTime(time) {
    var t = time.split(/[- :]/);
    var expireDate = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
    var nowDate = new Date();
    var seconds = (expireDate.getTime() - nowDate.getTime()) / 1000;
    var iHour = Math.floor(seconds / 3600);
    var iMin = Math.floor((seconds - iHour * 3600) / 60);
    var iSen = Math.floor(seconds - iHour * 3600 - iMin * 60);
    var remainTime = getTimeFormat(iHour) + ":" + getTimeFormat(iMin) + ":" + getTimeFormat(iSen);
    return  remainTime;
}

function getMinuteRemainTime(time) {
    var t = time.split(/[- :]/);
    var expireDate = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
    var nowDate = new Date();
    var seconds = (expireDate.getTime() - nowDate.getTime()) / 1000;
    var iHour = Math.floor(seconds / 3600);
    var iMin = Math.floor((seconds - iHour * 3600) / 60);
    var iSen = Math.floor(seconds - iHour * 3600 - iMin * 60);
    var remainTime = getTimeFormat(iMin) + ":" + getTimeFormat(iSen);
    return  remainTime;
}

cc.Button = {};
cc.Button.standardButtonWithTitle = function (normal, select, title) {
    /** Creates and return a button with a default background and title color. */
    var backgroundButton = cc.Scale9Sprite.create(normal);
    backgroundButton.setPreferredSize(cc.size(200, 200));
    var backgroundHighlightedButton = cc.Scale9Sprite.create(select);
    backgroundHighlightedButton.setPreferredSize(cc.size(200, 200));
    var titleButton = cc.LabelTTF.create(title, "Marker Felt", 30);
    titleButton.setColor(cc.c3b(159, 168, 176));

    var button = cc.ControlButton.create(titleButton, backgroundButton);
    button.setBackgroundSpriteForState(backgroundHighlightedButton, cc.CONTROL_STATE_NORMAL);
    button.setTitleColorForState(cc.WHITE, cc.CONTROL_STATE_NORMAL);
    return button;
}
