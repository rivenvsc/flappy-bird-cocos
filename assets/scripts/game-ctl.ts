import { _decorator, CCFloat, CCInteger, Collider2D, Component, Contact2DType, director, EventKeyboard, Input, input, IPhysics2DContact, KeyCode, log, Node } from 'cc';
const { ccclass, property } = _decorator;

import { ground } from './ground';
import { result } from './result';
import { bird } from './bird';
import { PinePool } from './PinePool';
import { BirdAudio } from './BirdAudio';

@ccclass('game_ctl')
export class game_ctl extends Component {
    @property({
        type: CCInteger,
        tooltip: "This is Speadgame"
    })
    public speed: number = 300;

    @property({
        type: ground,
        tooltip: "This is ground Class"
    })
    public ground: ground;

    @property({
        type: result,
        tooltip: "This is Result Screan"
    })
    public result: result;

    @property({
        type: bird,
        tooltip: "This is Result Screan"
    })
    public bird: bird;

    @property({
        type: BirdAudio,
        tooltip: "This is BirdAudio"
    })
    public birdAudio: BirdAudio;
    

    @property({
        type: PinePool,
        tooltip: "This is Result Screan"
    })
    public pineQueue: PinePool;

    @property({
        type: CCInteger,
        tooltip: "This is Pine Spead"
    })
    public pineSpeed: number = 200;
    public isOver: boolean;

    onLoad() {
        this.initListener();
        this.result.hideResultNode();
        this.isOver = false;
    }

    update() {
        if (!this.isOver) {
            this.birdStruct();
        } 
    }

    onStartGame() {
        this.result.resetScore();
        this.result.hideResultNode();
        director.resume();
    }

    onResetGame() {
        this.bird.resetBird();
        this.pineQueue.reset();
        this.isOver = false;
    }

    onGameOver() {
        this.result.showResultNode();
        this.isOver = true;
        this.birdAudio.onAudioQueue(3);
        director.pause();
    }

    initListener() {
        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isOver) {
                this.onResetGame();
                this.onStartGame();
            } else {
                this.bird.fly();
                this.birdAudio.onAudioQueue(0);
            }
        })
    }

    passPine() {
        this.result.addScore();
        this.birdAudio.onAudioQueue(1);
    }

    createPine() {
        this.pineQueue.addPool();
    }

    birdStruct() {
        this.onContactGround();

        if (this.bird.hitSomething) {
            this.onGameOver();
        }
    }

    onContactGround() {
        let collider = this.bird.getComponent(Collider2D);
        
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.handleContactGround, this);
        }
    }

    handleContactGround(selfCollider: Collider2D, otherCollider: Collider2D, contact2dType: IPhysics2DContact | null) {
        this.bird.hitSomething =  true;
        this.birdAudio.onAudioQueue(2);
    }
}

