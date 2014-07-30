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


var MainLayer = function () {
    this.initX = 9;
    this.initY = 300;
    this.cellSize = 162;
    this.cellSpace = 18;
    this.totalScore = 0;
    this.scoreLabel = {};

    this.back = {};
    this.title = {};
};

MainLayer.prototype.onDidLoadFromCCB = function () {
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

MainLayer.prototype.getPosition = function (i, j) {
    var px = this.initX + this.cellSize / 2 + i * (this.cellSize + this.cellSpace);
    var py = this.initY + this.cellSize / 2 + j * (this.cellSize + this.cellSpace);
    return cc.p(px, py);
}

MainLayer.prototype.onEnter = function () {
    //version
    this.versionNum = indexVersions;
    this.indexVersion = VERSIONS[this.versionNum];
    this.title.setString(this.indexVersion.name + "目标：" + this.indexVersion.array[this.indexVersion.array.length - 1] + "");

    var random1 = getRandom(4);
    var random2 = getRandom(4);
    while (random1 == random2) {
        random2 = getRandom(4);
    }

    var random11 = getRandom(4);
    var random22 = getRandom(4);

    this.tables = new Array(4);
    for (var i = 0; i < 4; i++) {
        var sprites = new Array(4);
        for (var j = 0; j < 4; j++) {
            if (i == random1 && j == random11) {
                sprites[j] = this.newNumber(i, j, 1);
            } else if (i == random2 && j == random22) {
                sprites[j] = this.newNumber(i, j, 1);
            } else {
                sprites[j] = this.newNumber(i, j, 0);
            }
        }
        this.tables[i] = sprites;
    }

    this.totalScore = 0;

};


MainLayer.prototype.newNumber = function (i, j, num) {
    var cell = cc.MySprite.create(this.rootNode, "5.png", this.getPosition(i, j), 1);
    var cellLabel = cc.MySprite.createLabel(cell, "");
    if (num < 3) {
//        cellLabel.setColor(cc.c3b(255, 255, 255));
    }


    if (num > 0) {
        cell.setColor(COLOR[num]);
        cellLabel.setVisible(true);
        cellLabel.setString(this.indexVersion.array[num]);
        cellLabel.setFontSize(this.indexVersion.labelFontSize);
    } else {
        cell.setColor(COLOR[num]);
        cellLabel.setVisible(false);
    }
    cell.data = {col: i, row: j, numberLabel: cellLabel, number: num};
    return cell;
};

//direction left
MainLayer.prototype.leftCombineNumber = function () {
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            var cell = this.tables[i][j];
            if (cell.data.number != 0) {
                var k = i + 1;
                while (k < 4) {
                    var nextCell = this.tables[k][j];
                    if (nextCell.data.number != 0) {
                        if (cell.data.number == nextCell.data.number) {
                            cell.data.number += 1;
                            nextCell.data.number = 0;
                            this.totalScore += SCORES[cell.data.number];
                        }
                        k = 4;
                        break;
                    }
                    k++;
                }
            }
        }
    }

    for (j = 0; j < 4; j++) {
        for (i = 0; i < 4; i++) {
            cell = this.tables[i][j];
            if (cell.data.number == 0) {
                k = i + 1;
                while (k < 4) {
                    nextCell = this.tables[k][j];
                    if (nextCell.data.number != 0) {
                        cell.data.number = nextCell.data.number;
                        nextCell.data.number = 0;
                        k = 4;
                    }
                    k++;
                }
            }
        }
    }

    this.refreshNumber();
};

//direction right
MainLayer.prototype.rightCombineNumber = function () {
    for (var j = 0; j < 4; j++) {
        for (var i = 3; i >= 0; i--) {
            var cell = this.tables[i][j];
            if (cell.data.number != 0) {
                var k = i - 1;
                while (k >= 0) {
                    var nextCell = this.tables[k][j];
                    if (nextCell.data.number != 0) {
                        if (cell.data.number == nextCell.data.number) {
                            cell.data.number += 1;
                            nextCell.data.number = 0;
                            this.totalScore += SCORES[cell.data.number];
                        }
                        k = -1;
                        break;
                    }
                    k--;
                }
            }
        }
    }

    for (j = 0; j < 4; j++) {
        for (i = 3; i >= 0; i--) {
            cell = this.tables[i][j];
            if (cell.data.number == 0) {
                k = i - 1;
                while (k >= 0) {
                    nextCell = this.tables[k][j];
                    if (nextCell.data.number != 0) {
                        cell.data.number = nextCell.data.number;
                        nextCell.data.number = 0;
                        k = -1;
                    }
                    k--;
                }
            }
        }
    }

    this.refreshNumber();
};

MainLayer.prototype.downCombineNumber = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var cell = this.tables[i][j];
            if (cell.data.number != 0) {
                var k = j + 1;
                while (k < 4) {
                    var nextCell = this.tables[i][k];
                    if (nextCell.data.number != 0) {
                        if (cell.data.number == nextCell.data.number) {
                            cell.data.number += 1;
                            nextCell.data.number = 0;
                            this.totalScore += SCORES[cell.data.number];
                        }
                        k = 4;
                        break;
                    }
                    k++;
                }
            }
        }
    }

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            cell = this.tables[i][j];
            if (cell.data.number == 0) {
                k = j + 1;
                while (k < 4) {
                    nextCell = this.tables[i][k];
                    if (nextCell.data.number != 0) {
                        cell.data.number = nextCell.data.number;
                        nextCell.data.number = 0;
                        k = 4;
                    }
                    k++;
                }
            }
        }
    }

    this.refreshNumber();
};

//touch up
MainLayer.prototype.upCombineNumber = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j >= 0; j--) {
            var cell = this.tables[i][j];
            if (cell.data.number != 0) {
                var k = j - 1;
                while (k >= 0) {
                    var nextCell = this.tables[i][k];
                    if (nextCell.data.number != 0) {
                        if (cell.data.number == nextCell.data.number) {
                            cell.data.number += 1;
                            nextCell.data.number = 0;
                            this.totalScore += SCORES[cell.data.number];
                        }
                        k = -1;
                        break;
                    }
                    k--;
                }
            }
        }
    }

    for (i = 0; i < 4; i++) {
        for (j = 3; j >= 0; j--) {
            cell = this.tables[i][j];
            if (cell.data.number == 0) {
                k = j - 1;
                while (k >= 0) {
                    nextCell = this.tables[i][k];
                    if (nextCell.data.number != 0) {
                        cell.data.number = nextCell.data.number;
                        nextCell.data.number = 0;
                        k = -1;
                    }
                    k--;
                }
            }
        }
    }

    this.refreshNumber();
};

MainLayer.prototype.refreshNumber = function () {
    var emptyCellList = [];
    for (var i = 0; i < 4; i++) {
        var numbers = " ";
        for (var j = 0; j < 4; j++) {
            var cell = this.tables[i][j];
            var label = cell.data.numberLabel;
            var cellNumber = cell.data.number;
            if (cellNumber != 0) {
                cell.setColor(COLOR[cellNumber]);
                label.setString(this.indexVersion.array[cellNumber] + " ");
                label.setFontSize(this.indexVersion.labelFontSize);
                label.setVisible(true);
                if (cellNumber == (this.indexVersion.array.length - 1)) {
                    //check success
                    var toast = cc.Toast.create(this.rootNode, "成功到达：" + this.indexVersion.array[cellNumber], 2);
                    toast.setColor(cc.c3b(255, 0, 0));
                    this.rootNode.scheduleOnce(function () {
                        cc.BuilderReader.runScene("", "MainLayer");
                    }, 2)
                }
            } else {
                cell.setColor(COLOR[cellNumber]);
                label.setVisible(false);
                emptyCellList.push(cell);
            }
            numbers += "  " + cellNumber;
        }
        cc.log("numbers==" + numbers);
    }


    //score
    this.scoreLabel.setString("分数：" + this.totalScore);

    if (emptyCellList.length < 1) {
        //check fail
        var toast = cc.Toast.create(this.rootNode, "失败！", 2);
        toast.setColor(cc.c3b(255, 0, 0));
        this.rootNode.scheduleOnce(function () {
            cc.BuilderReader.runScene("", "MainLayer");
        }, 2)
    } else {
        //create random cell
        var randomCell = emptyCellList[getRandom(emptyCellList.length)];
        randomCell.data.number = 1;
        randomCell.data.numberLabel.setVisible(true);
        randomCell.data.numberLabel.setString(VERSIONS[this.versionNum].array[1] + "");
        randomCell.data.numberLabel.setFontSize(this.indexVersion.labelFontSize);
        randomCell.setColor(COLOR[1]);
        randomCell.runAction(cc.Sequence.create(cc.ScaleTo.create(0, 0.8), cc.ScaleTo.create(0.5, 1)));

    }

};

MainLayer.prototype.onRefreshClicked = function () {
    cc.BuilderReader.runScene("", "MainLayer");
};

MainLayer.prototype.onTouchesBegan = function (touches, event) {
    this.pBegan = touches[0].getLocation();

    //back
    var backRect = cc.rectCreate(this.back.getPosition(), [50, 30]);
    if (cc.rectContainsPoint(backRect, this.pBegan)) {
        this.back.runAction(cc.Sequence.create(cc.ScaleTo.create(0.2, 1.1),
            cc.CallFunc.create(function () {
                cc.AudioEngine.getInstance().stopAllEffects();
                cc.BuilderReader.runScene("", "LevelLayer");
            })
        ));
    }
};

MainLayer.prototype.onTouchesMoved = function (touches, event) {
};

MainLayer.prototype.onTouchesEnded = function (touches, event) {
    this.pEnded = touches[0].getLocation();

//    if (this.pBegan) {
//        if (this.pEnded.x - this.pBegan.x > 20) {
//            this.rightCombineNumber();
//        }
//
//        else if (this.pEnded.x - this.pBegan.x < -20) {
//            this.leftCombineNumber();
//        }
//
//        else if (this.pEnded.y - this.pBegan.y > 20) {
//            this.upCombineNumber();
//        }
//
//        else if (this.pEnded.y - this.pBegan.y < -20) {
//            this.downCombineNumber();
//        }
//    }

    if (this.pBegan) {
        var direction = getTouchDirection(this.pBegan, this.pEnded);
        if (direction == 1) {
            this.leftCombineNumber();
        } else if (direction == 2) {
            this.rightCombineNumber();
        } else if (direction == 3) {
            this.upCombineNumber();
        } else if (direction == 4) {
            this.downCombineNumber();
        }
    }

};








