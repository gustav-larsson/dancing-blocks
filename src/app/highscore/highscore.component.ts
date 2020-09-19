import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';

export interface Highscore {
  list: Array<{
    score: number;
    time: string;
    accuracy: string;
  }>;
}
@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {
  public highscores: Array<any>;
  public highscoreDisplay: string;
  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {
    this.dataStoreService.highscoreVal.subscribe((value) => {
      delete this.highscoreDisplay;
      if (value) {
        this.highscores = JSON.parse(value).list;
        this.setHighscoreDisplay();
      } else {
        delete this.highscores;
      }
      console.log('new Highscore', value);
      console.log('new Highscores', this.highscores);
    });
  }
  // turn the score into a string to manage the css gradient
  setHighscoreDisplay() {
    this.highscores.forEach((element, index) => {
      if (this.highscoreDisplay) {
        this.highscoreDisplay = this.highscoreDisplay +
        '\n' +
        'Score goal: ' +
        element.score +
        '  Time: ' +
        element.time +
        ' Accuracy: ' +
        element.accuracy + '%';
      } else {
        this.highscoreDisplay = 'Score goal: ' +
        element.score +
        '  Time: ' +
        element.time +
        ' Accuracy: ' +
        element.accuracy + '%';
      }
    });
  }

  clearHighscore() {
    this.dataStoreService.highscore = '';
  }
}
