import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  baseLayerLuminance,
  StandardLuminance,
  SwatchRGB,
  PaletteRGB,
  accentPalette
} from "@microsoft/fast-components";

import {
  parseColorHexRGB
} from '@microsoft/fast-colors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  r159Body = document.getElementById("r159-body") as HTMLElement;

  // lightmode handling
  darkMode = baseLayerLuminance.getValueFor(this.r159Body) < 0.5 ? true : false;
  lightModeToggleCount = 0;
  colors = ["#ff0000", "#ff7f00", "#ffd700", "#008000", "#4d4dff", "#4b0082", "#9400d3"];
  colorsInterval: undefined | number;
  currentColor = 0;

  // menu/toast handling
  showGitMenu = false;
  showToast = false;
  developerSteps = 7;
  toastTimeout: undefined | number;

  constructor(private router: Router) {}
  
  toggleLightMode() {
    this.lightModeToggleCount++;
    this.darkMode = !this.darkMode;

    if (this.lightModeToggleCount > 7) {
      this.lightModeToggleCount = 0;
      if (this.colorsInterval) {
        window.clearInterval(this.colorsInterval);
        accentPalette.setValueFor(this.r159Body, PaletteRGB.from(SwatchRGB.from(parseColorHexRGB("#0159A0")!)));
        this.colorsInterval = undefined;
      } else {
        this.colorsInterval = window.setInterval(() => {
          accentPalette.setValueFor(this.r159Body, PaletteRGB.from(SwatchRGB.from(parseColorHexRGB(this.colors[this.currentColor])!)));
          if (this.currentColor < this.colors.length - 1) {
            this.currentColor++;
          } else {
            this.currentColor = 0;
          }
        }, 300);
      }
    }

    if (this.darkMode) {
      baseLayerLuminance.setValueFor(this.r159Body, 0.15);
    } else {
      baseLayerLuminance.setValueFor(this.r159Body, StandardLuminance.LightMode);
    }
  };

  gotoURL(url: string) {
    window.location.href = url;
  }

  gotoRoute(url: string) {
    this.router.navigate([url]);
  }

  toggleGitMenu() {
    this.showGitMenu = !this.showGitMenu;
  }

  handlePiClick(e: MouseEvent) {
    
    if (e.shiftKey && e.ctrlKey) {
			this.gotoURL('/web/net/code1.html');
		}

    this.developerSteps--;

    if (this.developerSteps < 5) {
      this.showToast = true;

      this.toastTimeout && window.clearTimeout(this.toastTimeout);

      this.toastTimeout = window.setTimeout(() => {
        this.showToast = false;
      }, 750);
    }
    
    if (this.developerSteps < 1) {
      this.router.navigate(['developer']);
    }
  }

  noContext() {
    return false;
  }
}
