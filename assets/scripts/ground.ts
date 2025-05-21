import { _decorator, Component, game, Node, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import { game_ctl } from './game-ctl';

@ccclass('ground')
export class ground extends Component {
    @property({
        type:Node,
        tooltip: "This is Ground 1"
    })
    public ground1: Node;

    @property({
        type:Node,
        tooltip: "This is Ground 2"
    })
    public ground2: Node;

    @property({
        type:Node,
        tooltip: "This is Ground 3"
    })
    public ground3: Node;

    //Init variable
    public groundWidth1: number;
    public groundWidth2: number;
    public groundWidth3: number;

    public tempStartLocation1: Vec3;
    public tempStartLocation2: Vec3;
    public tempStartLocation3: Vec3;

    public gameCtl = new game_ctl();
    public gameSpeed: number;

    //Run program
    onLoad() {
        this.startUp();
    }

    startUp() {
        //Lấy giá trị width của các ComponentGround
        this.groundWidth1  = this.ground1.getComponent(UITransform).width;
        this.groundWidth2  = this.ground2.getComponent(UITransform).width;
        this.groundWidth3  = this.ground3.getComponent(UITransform).width;

        //Set vị trí ban đầu của các ground
        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.tempStartLocation1)
        this.ground2.setPosition(this.tempStartLocation2)
        this.ground3.setPosition(this.tempStartLocation3)
    }

    update(deltaTime: number) {
        this.gameSpeed = this.gameCtl.speed;

        this.tempStartLocation1 = this.ground1.position;
        this.tempStartLocation2 = this.ground2.position;
        this.tempStartLocation3 = this.ground3.position;

        let deltaWidth = deltaTime * this.gameSpeed;

        this.tempStartLocation1.x -= deltaWidth;
        this.tempStartLocation2.x -= deltaWidth;
        this.tempStartLocation3.x -= deltaWidth;

        //If move over size, reset to init position
        if (this.tempStartLocation1.x <= (0-this.groundWidth1)){
            this.tempStartLocation1.x = 0;
            this.tempStartLocation2.x = this.groundWidth1;
            this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;
        }

        this.ground1.setPosition(this.tempStartLocation1)
        this.ground2.setPosition(this.tempStartLocation2)
        this.ground3.setPosition(this.tempStartLocation3)
    }
}

