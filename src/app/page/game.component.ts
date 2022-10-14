import { Component } from "@angular/core";
import { Check } from "../model/check";


interface IAttempt{
    guess: number;
    bulls: number;
    cows: number;
}

@Component({
    selector: 'game-comp',
    templateUrl: 'game.component.html',
    styleUrls: ['game.component.css']
})

export class GameComponent{
    answer: number[] = [];
    guess: number = 0;
    checkRes: Check = new Check(0,0);
    showInput: boolean = false;
    attemptArr: IAttempt[] = [];
    win: boolean = false;
    gameStarted: boolean = false;

    generateNumber(){
        while(this.answer.length < 4){
            var r = Math.floor(Math.random() * 9);
            if(this.answer.indexOf(r) === -1 && r !== 0){
                this.answer.push(r);
            }
        }
    }

    start(){
        if(this.win === true){
            this.win = false;
        }
      
        this.gameStarted = true;
        
        this.attemptArr = [];
        this.generateNumber();
        this.showInput = true;

        console.log(this.answer)
    }

    saveAttempt(){
        let iattempt: IAttempt = {
            guess: this.guess,
            bulls: this.checkRes.bulls,
            cows: this.checkRes.cows
        }
        this.attemptArr.push(iattempt);
    }

    check(){
        let guess: number[] = [];
        let num = 1000;

        while (guess.length < 4){
            guess.push(Math.floor((this.guess / num) % 10));
            num /= 10;
        }
        
        let numsChecked: number[] = [];

        guess.forEach((value, index) => {
            if(this.answer.includes(value)){
                if(this.answer[index] === value){
                    this.checkRes.bulls++;
                    numsChecked.push(value);
                }
            }
        });

        guess.forEach((value, index) => {
            if(!numsChecked.includes(value) && this.answer.includes(value)){
                this.checkRes.cows++;
                numsChecked.push(value);
            }
        });

        this.saveAttempt();

        if(this.checkRes.bulls === 4){
            this.win = true;
            this.answer = [];
            this.gameStarted = false;
        }

        numsChecked = [];
        this.checkRes.bulls = 0;
        this.checkRes.cows = 0;
    }
}
