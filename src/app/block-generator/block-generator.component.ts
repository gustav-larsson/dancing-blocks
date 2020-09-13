import { Component, OnInit, Renderer2, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { isUndefined } from 'util';
interface Block {
  id: number;
}

@Component({
  selector: 'app-block-generator',
  templateUrl: './block-generator.component.html',
  styleUrls: ['./block-generator.component.scss']
})


export class BlockGeneratorComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public blockAmount: number;
  @Input() public spritePos: number;
  @Output() public changeEvent = new EventEmitter();
  private clicks = 0;
  private sprite: number;
  private blocks = new Array<Block>();
  globalListenFunc: any;
  private activateId: number;
  private keyboardKeys = {
    KeyQ: 0, KeyW: 1, KeyE: 2, KeyR: 3, KeyT: 4, KeyY: 5, KeyU: 6, KeyI: 7, KeyO: 8, KeyP: 9, BracketLeft: 10,
    KeyA: 11, KeyS: 12, KeyD: 13, KeyF: 14, KeyG: 15, KeyH: 16, KeyJ: 17, KeyK: 18, KeyL: 19, Semicolon: 20, Quote: 21,
    IntlBackslash: 22, KeyZ: 23, KeyX: 24, KeyC: 25, KeyV: 26, KeyB: 27, KeyN: 28, KeyM: 29, Comma: 30, Period: 31, Slash: 32
  };


  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Global key listener to listen to every key press
    this.globalListenFunc = this.renderer.listen('document', 'keypress', e => {
      this.activateBlock(e.code);
      this.clicks++;
      this.changeEvent.emit({ clicks: this.clicks });
    });
    // create all the dancing blocks
    this.createBlocks();
  }
  ngOnChanges(changes) {
    if (changes.spritePos) {
      this.sprite = changes.spritePos.currentValue;
    }
  }
  ngOnDestroy() {
    // remove listener
    this.globalListenFunc();
  }
  outputEvent(event) {
    this.changeEvent.emit(event);
  }
  // when I press a key light up a block
  activateBlock(code: string) {
    if (!isUndefined(this.keyboardKeys[code])) {
      this.activateId = this.keyboardKeys[code];
      const audio = new Audio('./assets/keyTap3.mp3');
      audio.play();
      setTimeout(() => {
        this.activateId = null;
      }, 300);
    }
  }

  /** calculate what class to use
   *
   * @param i is the index of the block
   */
  calculateClasses(i: number) {
    if (i === this.activateId) {
      return true;
    } else {
      return false;
    }
  }
 // setup the amount of blocks for the grid
 createBlocks() {
    for (let i = 0; i < this.blockAmount; i++) {
      this.blocks.push({id: i});
    }
  }
}
