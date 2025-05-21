import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { Pines } from './Pines';

@ccclass('PinePool')
export class PinePool extends Component {
    @property({
        type: Prefab,
        tooltip: "This is PinePool"
    })
    public perfabPines = null;

    @property({
        type: Node,
        tooltip: "This is PineHome"
    })
    public pinePoolHome;

    public newPool = new NodePool;
    public createPine;

    initPool() {
        let initPineCount =  3;

        for (let i = 0; i < initPineCount; i++) {
            this.createPine = instantiate(this.perfabPines);

            if (i == 0) {
                this.pinePoolHome.addChild(this.createPine);
            } else {
                this.newPool.put(this.createPine);
            }
        }

    }

    addPool() {
        if (this.newPool.size() > 0) {
            this.createPine = this.newPool.get();
        } else {
            this.createPine = instantiate(this.perfabPines);
        }

        this.pinePoolHome.addChild(this.createPine);
    }

    reset() {
        this.pinePoolHome.removeAllChildren();
        this.newPool.clear();

        this.initPool();
    }
}

