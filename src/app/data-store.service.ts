import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  hardModeVal = new BehaviorSubject(this.hardMode);
  scoreVal = new BehaviorSubject(this.score);
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
}
