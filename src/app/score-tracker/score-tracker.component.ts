import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-score-tracker',
  templateUrl: './score-tracker.component.html',
  styleUrls: ['./score-tracker.component.scss']
})
export class ScoreTrackerComponent implements OnInit {
  public score?: number;
  public timerDisplay = '00:00:00';
  public time: number;
  public accuracy = 100;
  private clicks = 0;
  public stopWatchObserver;
  public scoreGoal = 20;
  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {
    this.dataStoreService.scoreVal.subscribe((value) => {
      if (value) {
        this.scoreGoal = parseInt(value, 10);  // this will happen on every change
      }
   });
  }

  outputEvent(event) {
    if (event.score) {
      // this.miss = this.clicks - this.score;
      // Set the score to the calculated score until 20
      if (event.score <= this.scoreGoal) {
        this.score = event.score;
      }
      if (this.score === 1) {
        // register a click on game start
        this.clicks++;
        // If the score is 1 we start the timer
        this.stopwatch();
      } else if (this.score === this.scoreGoal) {
        // If the score is 20 we stop the timer
        this.stopWatchObserver.unsubscribe();
      }
    }
    // Register every click to calculate misses
    if (event.clicks && this.score < this.scoreGoal && this.score >= 1) {
      if (this.clicks) {
        this.clicks++;
      } else {
        this.clicks = 1;
      }
      this.setAccuracy();
    }
  }

  // Calculate the accuracy of the attempt
  setAccuracy() {
    this.accuracy = Math.round((((100 * this.score) / this.clicks) * 100) / 100);
  }
  stopwatch() {
    this.stopWatchObserver = timer(0, 10).subscribe(ec => {
      this.time = ec;
      this.timerDisplay = this.getDisplayTimer(this.time);
    });
  }
  getDisplayTimer(time: number) {
    // const hours = '0' + Math.floor(time / 3600);
    const minutes = '0' + Math.floor(time / 6000);
    const seconds = '0' + Math.floor(time % 6000 / 100);
    const milliseconds = '0' + Math.floor(time % 3600 % 100);
    /* const hours = '0' + Math.floor(time / 3600);
    const minutes = '0' + Math.floor(time % 3600 / 60);
    const seconds = '0' + Math.floor(time % 3600 % 60); */
    return minutes.slice(-2, -1) +  minutes.slice(-1) +
    ':' +
    seconds.slice(-2, -1) + seconds.slice(-1) +
    ':' +
    milliseconds.slice(-2, -1) + milliseconds.slice(-1);
    /* return {
      hours: { digit1: hours.slice(-2, -1), digit2: hours.slice(-1) },
      minutes: { digit1: minutes.slice(-2, -1), digit2: minutes.slice(-1) },
      seconds: { digit1: seconds.slice(-2, -1), digit2: seconds.slice(-1) },
    }; */
  }
}
