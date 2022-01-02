import { Component } from '@angular/core';
import {
  baseLayerLuminance,
  StandardLuminance
} from '@fluentui/web-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  r159Body = document.getElementById("r159-body") as HTMLElement;
  darkMode = baseLayerLuminance.getValueFor(this.r159Body) < 0.5 ? true : false;

  toggleLightMode = () => {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      baseLayerLuminance.setValueFor(this.r159Body, StandardLuminance.DarkMode);
    } else {
      baseLayerLuminance.setValueFor(this.r159Body, StandardLuminance.LightMode);
    }
  };
}
