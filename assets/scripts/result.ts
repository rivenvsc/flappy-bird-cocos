import { _decorator, CCInteger, Component, Label, Node } from 'cc';

import { game_ctl } from './game-ctl';

const { ccclass, property } = _decorator;

@ccclass('result')
export class result extends Component {
    @property({
        type: Label,
        tooltip: "This is Game Score"
    })
    public currentScoreLable: Label;

    @property({
        type: Label,
        tooltip: "This is Top Score"
    })
    public topScoreLable: Label;

    @property({
        type: Label,
        tooltip: "This is Btn try again"
    })
    public tryAgainLable: Label;

    topScore: number = 0;
    currentScore: number = 0;
    
    public gameCtl = new game_ctl();

    updateScore(num: number) {
        this.currentScore = num;
        this.currentScoreLable.string = "" + num;
        if (num > this.topScore) this.topScore = num;
    }

    addScore() {
        this.currentScore +=1;

        this.showCurrentScore();
    }

    resetScore() {
        this.currentScore = 0;
        this.hideLable(this.topScoreLable);
        this.hideLable(this.tryAgainLable);
    }

    showCurrentScore() {
        this.setStringLable(this.currentScoreLable, "" + this.currentScore);

        this.showLable(this.currentScoreLable);
        this.node.active = true;
    }

    showResultNode() {
        this.updateScore(this.currentScore);

        this.setStringLable(this.topScoreLable, "Top Score: " + this.topScore);
        this.setStringLable(this.currentScoreLable, "" + this.currentScore);

        this.showLable(this.topScoreLable);
        this.showLable(this.tryAgainLable);
        this.showLable(this.currentScoreLable);
        this.node.setSiblingIndex(100);
        this.node.active = true;
    }

    hideResultNode() {
        // this.hideLable(this.topScoreLable);
        // this.hideLable(this.currentScoreLable);
        // this.hideLable(this.tryAgainLable);
        this.node.active = false;
    }

    private setStringLable(label: Label, value: string): void {
        label.string = value;
    }

    private hideLable(label: Label): void {
        label.node.active = false;
    }
    private showLable(label: Label): void {
        label.node.active = true;
    }
}

