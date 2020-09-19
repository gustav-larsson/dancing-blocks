import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  hardModeVal = new BehaviorSubject(this.hardMode);
  scoreVal = new BehaviorSubject(this.score);
  highscoreVal = new BehaviorSubject(this.highscore);
  constructor() { }
  set hardMode(value) {
    this.hardModeVal.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('hardMode', value);
  }

  get hardMode() {
    return localStorage.getItem('hardMode');
  }
  set score(value) {
    this.scoreVal.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('score', value);
  }

  get score() {
    return localStorage.getItem('score');
  }
  set highscore(value) {
    this.highscoreVal.next(value);
    localStorage.setItem('highscore', value);
  }

  get highscore() {
    return localStorage.getItem('highscore');
  }
}
