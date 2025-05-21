import { _decorator, Component, find, Node, screen, size, UITransform, Vec3 } from 'cc';
import { game_ctl } from './game-ctl';
const { ccclass, property } = _decorator;

@ccclass('Pines')
export class Pines extends Component {
    @property({
        type: Node,
        tooltip: "This is TopPineNote"
    })
    public topPineNode: Node;

    @property({
        type: Node,
        tooltip: "This is BottomPineNode"
    })
    public bottomPineNode: Node;

    public tempStartLocationTop: Vec3 = new Vec3(0,0,0);
    public tempStartLocationBottom: Vec3 = new Vec3(0,0,0);
    public sceneSize = screen.windowSize;

    public game: any; //Spead of Pine from GameCtl
    public pineSpeed:number; //Final speed of pine
    public tempSpeed:number; //temporary speed

    public isPass: boolean;

    onLoad() {
        this.game = find('GameCtl').getComponent("game_ctl");
        this.pineSpeed = this.game.pineSpeed;
        this.isPass = false;
        this.initPop();
    }

    initPop() {
        this.tempStartLocationTop.x =  (this.topPineNode.getComponent(UITransform).width + this.sceneSize.width);
        this.tempStartLocationBottom.x = (this.topPineNode.getComponent(UITransform).width + this.sceneSize.width);

        let gap = random(90, 100) * 3;
        let yTop = random(-100, 360);
        let yBottom = yTop - gap - 640;

        this.tempStartLocationTop.y = yTop;
        this.tempStartLocationBottom.y = yBottom;

        this.topPineNode.setPosition(this.tempStartLocationTop);
        this.bottomPineNode.setPosition(this.tempStartLocationBottom);
    }

    update(deltaTime: number) {
        let deltaX = deltaTime * this.pineSpeed;

        this.tempStartLocationTop.x -= deltaX;
        this.tempStartLocationBottom.x -= deltaX;

        this.topPineNode.setPosition(this.tempStartLocationTop);
        this.bottomPineNode.setPosition(this.tempStartLocationBottom);

        if (this.isPass == false && this.topPineNode.position.x < 0) {
            this.isPass = true;
            this.game.passPine();
        }

        if (this.topPineNode.position.x < (0 - this.sceneSize.width)) {
            this.game.createPine();
        
            this.destroy();
        }
    }
}

function random(min: number, max: number) {
    return  Math.random() * (max-min) + min;
    
}

