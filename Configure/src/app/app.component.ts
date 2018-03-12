import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Settings } from './models/settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public settings = new Settings();
  messageControl = new FormControl();
  colorControl = new FormControl();

  constructor() {
    const jsonSettingsElement = document.querySelector('#JsonSettings') as HTMLInputElement;

    if (jsonSettingsElement && jsonSettingsElement.value && jsonSettingsElement.value.length > 0) {
        this.settings = JSON.parse(jsonSettingsElement.value) as Settings;
        this.colorControl.setValue(this.settings.color);
        this.messageControl.setValue(this.settings.message);
     }

    this.messageControl.valueChanges.subscribe(s => {
      this.settings.message = s;
      if (jsonSettingsElement) {
      jsonSettingsElement.value = JSON.stringify(this.settings);
      }
    });

    this.colorControl.valueChanges.subscribe(s => {
      this.settings.color = s;
      if (jsonSettingsElement) {
      jsonSettingsElement.value = JSON.stringify(this.settings);
      }
    });
  }

}
