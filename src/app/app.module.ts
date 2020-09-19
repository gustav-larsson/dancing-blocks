import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockGeneratorComponent } from './block-generator/block-generator.component';
import { DancingBlockComponent } from './dancing-block/dancing-block.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TypingFieldComponent } from './typing-field/typing-field.component';
import { SpriteGeneratorComponent } from './sprite-generator/sprite-generator.component';
import { ScoreTrackerComponent } from './score-tracker/score-tracker.component';
import { SettingsComponent } from './settings/settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HighscoreComponent } from './highscore/highscore.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    BlockGeneratorComponent,
    DancingBlockComponent,
    TypingFieldComponent,
    SpriteGeneratorComponent,
    ScoreTrackerComponent,
    SettingsComponent,
    HighscoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
