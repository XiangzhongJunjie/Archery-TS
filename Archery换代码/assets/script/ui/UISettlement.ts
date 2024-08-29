import { _decorator, Component, Node, director } from 'cc';
import { PlayerController } from '../actor/PlayerController';
import { ActorManager } from '../level/ActorManager';
import { Setting } from '../config/Setting';
const { ccclass, property } = _decorator;

/**
 * 结算面板
 */
@ccclass('UISettlement')
export class UISettlement extends Component {

    start() {
        //let btnStart = this.node.getChildByName("BtnStart");
        //btnStart.on(Button.EventType.CLICK, this.onClickEnterGame, this);

        Setting.instance.load();
    }
    
    resStartGame() {
        director.loadScene("game");
        this.node.active = false;
    }

}

