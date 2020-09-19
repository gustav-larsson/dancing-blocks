import { Component, OnInit, Output, Input, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sprite-generator',
  templateUrl: './sprite-generator.component.html',
  styleUrls: ['./sprite-generator.component.scss']
})
export class SpriteGeneratorComponent implements OnInit {
  private blockAmount = 33; // the number of blocks
  private spritePos: number;
  private spritePositions: Array<number>;
  private score = 0;
  @Output() public changeEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // Place the sprite in it's initialy position
    this.newSprite();
  }
  /* newSprites() {
    
  } */
  newSprite() {
    this.spritePos = this.numberGenerator();
    console.log(this.spritePos);
  }

  numberGenerator(): number {
    // A random number between 0 and the block amount, makes sure to never give the same number
    const randomNumber = Math.floor((Math.random() * this.blockAmount));
    if (randomNumber !== this.spritePos) {
      return randomNumber;
    } else {
        if (randomNumber === this.blockAmount - 1) {
          return randomNumber - 1;
        } else {
          return randomNumber + 1;
        }
    }
  }

  outputEvent(event) {
    if (event.hit) {
      // Add 1 to the score and emit the score
      //this.score++;
      this.changeEvent.emit({ score: true });
    }
    if (event.newSprites) {
      // Get a new random number for the sprite
      this.newSprite();
    } else {
      this.changeEvent.emit(event);
    }
  }
}
