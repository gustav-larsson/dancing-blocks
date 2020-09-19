import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { DataStoreService } from '../data-store.service';


@Component({
  selector: 'app-score-tracker',
  templateUrl: './score-tracker.component.html',
  styleUrls: ['./score-tracker.component.scss']
})
export class ScoreTrackerComponent implements OnInit {
  public score = 0;
  public timerDisplay = '00:00:00';
  public time: number;
  public accuracy = 100;
  private clicks = 0;
  private gameStopped = false;
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
  // TODO fix the general fault in the clicks to score counter
  outputEvent(event) {
    if (event.score) {
      // this.miss = this.clicks - this.score;
      // Set the score to the calculated score until 20
      if (this.score < this.scoreGoal) {
        this.score = this.score + 1;
        this.setAccuracy();
      }
      if (this.score === 1) {
        // If the score is 1 we start the timer
        this.stopwatch();
      } else if (this.score === this.scoreGoal && !this.gameStopped) {
        // If the score is 20 we stop the timer
        this.stopWatchObserver.unsubscribe();
        this.recordHighscore();
        this.gameStopped = true;
      }
    }
    // Register every click to calculate misses
    setTimeout(() => {
      if (event.clicks && this.score < this.scoreGoal && this.score >= 0) {
        this.clicks = this.clicks + 1;
      }
    });
    // Reset the game
    if (event.reset) {
      this.score = 0;
      delete this.time;
      this.timerDisplay = '00:00:00';
      this.clicks = 0;
      this.accuracy = 100;
      this.stopWatchObserver.unsubscribe();
      this.gameStopped = false;
    }
  }
  // Fetch the highscore from storage, update it and upload it to storage
  recordHighscore() {
    let highscore: any;
    if (this.dataStoreService.highscore) {
      highscore = JSON.parse(this.dataStoreService.highscore);
      highscore.list.push({
        score: this.scoreGoal,
        time: this.timerDisplay,
        accuracy: this.accuracy
      });
      // Sort the highscore before we save it
      highscore.list.sort((a, b) => {
        if (a.time < b.time) {
          return -1;
        }
        if (a.time > b.time) {
          return 1;
        }
        return 0;
      });

    } else {
      highscore = {
        list: [
          {
            score: this.scoreGoal,
            time: this.timerDisplay,
            accuracy: this.accuracy
          }
        ]
      };
    }
    this.dataStoreService.highscore = JSON.stringify(highscore);

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
