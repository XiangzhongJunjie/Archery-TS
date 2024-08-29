import { _decorator, CCFloat, Component, EventTouch, input,Input, Node,math, Vec3, v3,Sprite } from 'cc';
import { VirtualInput } from '../input/VirtualInput';
const { ccclass, property } = _decorator;

/**
 * 摇杆控制器
 */
@ccclass('UIJoystick')
export class UIJoystick extends Component {

    /**
     * 摇杆的背景
     */
    @property(Node)
    stickBg:Node = null;
    
    /**
     * 手指部分
     */
    @property(Node)
    thumbnail:Node = null;

    /**
     * 摇杆的半径
     */
    @property({type:CCFloat})
    radius: number = 130;

    /**
     * 摇杆初始化的位置
     */
    ininPostion : Vec3 = v3();
    start() {
        input.on(Input.EventType.TOUCH_START,this.onTouchStart,this);
        input.on(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);
        input.on(Input.EventType.TOUCH_END,this.onTouchEnd,this);
        input.on(Input.EventType.TOUCH_CANCEL,this.onTouchEnd,this);

        this.ininPostion = this.stickBg.worldPosition.clone();
    }

    

    onTouchStart(eventTouch:EventTouch){
        let x = eventTouch.touch.getUILocationX();
        let y = eventTouch.touch.getUILocationY();
        this.stickBg.setWorldPosition(x,y,0);
    }

    /**
     * 触摸移动
     * @param touchEvent 
     */
    onTouchMove(eventTouch:EventTouch){
        // 获取摇杆在 UI 的位置
        let x = eventTouch.touch.getUILocationX();
        let y = eventTouch.touch.getUILocationY();

        let worldPosition = v3(x,y,0);
        let localPosition = v3();

        // 转化摇杆的位置到背景图的本地坐标
        this.stickBg.inverseTransformPoint(localPosition,worldPosition);
        let len = localPosition.length();
        localPosition.normalize();

        localPosition.multiplyScalar(math.clamp(len,0,this.radius));
        this.thumbnail.setPosition(localPosition);

        // 将计算的结果赋予给 Input
        VirtualInput.horizontal = this.thumbnail.position.x/this.radius;
        VirtualInput.vertical = this.thumbnail.position.y/this.radius;
    }

    /**
     * 触摸结束
     * @param touchEvent 
     */
    onTouchEnd(){

        this.stickBg.setWorldPosition(this.ininPostion);
        this.thumbnail.setPosition(Vec3.ZERO);

        VirtualInput.vertical = 0;
        VirtualInput.horizontal = 0;
    }
}


