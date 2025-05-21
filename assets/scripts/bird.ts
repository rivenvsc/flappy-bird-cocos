import { _decorator, Animation, CCFloat, Component, easing, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bird')
export class bird extends Component {
    @property({
        type: CCFloat,
        tooltip: "How many distance I can jump?"
    })
    public jumpHeight: number = 200;

    @property({
        type: CCFloat,
        tooltip: "How many distance I can Duration?"
    })
    public jumpDuration: number = 0.3;

    public birdAnimation: Animation;
    public birdLocation: Vec3;
    public hitSomething: boolean;

    onLoad() {
        this.resetBird();
        this.birdAnimation = this.getComponent(Animation);
    }

    resetBird() {
        this.birdLocation = new Vec3(0,0,0);
        this.node.setPosition(this.birdLocation);
        this.hitSomething = false;
    }

    fly() {
        this.birdAnimation.stop();

        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), {
                easing: "smooth",
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
            }).start();

        this.birdAnimation.play();
    }
}

