import { Component, OnInit, OnDestroy, Renderer2, Input, OnChanges, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-dancing-block',
  templateUrl: './dancing-block.component.html',
  styleUrls: ['./dancing-block.component.scss', './dancing-block.component-theme.scss']
})
export class DancingBlockComponent implements OnInit, OnChanges {
    public keyboardKeys = [
      'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å',
      'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä',
      '<', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-'
    ];
    public hardmode = false;
    @Input() public myStyle: boolean;
    @Input() public spritePos: number;
    @Input() public index: number;
    @Output() public changeEvent = new EventEmitter();
    @ViewChild('block', { static: true }) block;
    private iGotTheSprite?: boolean;
    constructor(private renderer: Renderer2, private el: ElementRef, private dataStoreService: DataStoreService) { }

    ngOnInit() {
      const hardmode = localStorage.getItem('hardMode');
      if (hardmode === 'true') {
        this.hardmode = true;
      }
      // Subscribe to the hardmode to see if we have entered hardmode
      this.dataStoreService.hardModeVal.
      subscribe((value) => {
        this.setHardMode(value);  // this will happen on every change
     });
    }

    ngOnChanges(change) {
      // When the current value is set to true start the animation
      if (change.myStyle && change.myStyle.currentValue === true) {
        this.setClass('active', true);
      }
      // When the sprite position is the same as this index set the sprite class to show the sprite;
      /* if (change.spritePos && change.spritePos.currentValue === this.index) {
        this.iGotTheSprite = true;
        this.setClass('sprite', false);
      } */
      // Try at having 5 sprites activate
      if (change.spritePos && change.spritePos.currentValue < (this.index + 3) && change.spritePos.currentValue > (this.index - 2)) {
        this.iGotTheSprite = true;
        this.setClass('sprite', false);
      }
    }
    /**
     * @remove if we automatically remove the class after adding it
     * @cssClass the name of the class to be added
     * add the class to animate the lift of of the block and then remove it after 300ms
     */
    setClass(cssClass: string, remove: boolean) {
      this.renderer.addClass(this.block.nativeElement, cssClass);
      if (remove) {
        setTimeout(() => {
          if (this.iGotTheSprite) {
            this.renderer.removeClass(this.block.nativeElement, 'sprite');
            this.changeEvent.emit({ hit: true });
            this.iGotTheSprite = false;
          }
          this.renderer.removeClass(this.block.nativeElement, cssClass);
        }, 300);
      }
    }

    setHardMode(active: string) {
      if (active === 'true') {
        this.hardmode = true;
      } else {
        this.hardmode = false;
      }
    }
}
