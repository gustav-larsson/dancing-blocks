import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss', './settings.component-theme.scss']
})
export class SettingsComponent implements OnInit {
  public checked: boolean;
  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {
    // Subscribe to the itemvalue to see if we have entered hardmode in a previous session
    this.dataStoreService.hardModeVal.
    subscribe((value) => {
      this.setChecked(value);  // this will happen on every change
    });
  }
  setHardMode(toggleEvent: MatSlideToggleChange) {
    if (toggleEvent) {
      this.dataStoreService.hardMode = toggleEvent.checked.toString();
    }
  }
  setChecked(value) {
    if (value === 'true') {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

  setScore(event) {
    // Add the new value to the dataStore
    this.dataStoreService.score = event.target.value;
  }
}
