import { Component, Inject, OnInit } from '@angular/core';
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
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // lightmode and color handling
  darkMode = false;
  lightModeToggleCount = 0;
  colors = ["#ff0000", "#ff7f00", "#ffd700", "#008000", "#4d4dff", "#4b0082", "#9400d3"];
  colorsInterval: undefined | number;
  currentColor = 0;

  // menu/toast handling
  showGitMenu = false;
  showToast = false;
  developerSteps = 7;
  toastTimeout: undefined | number;

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {
    window.onkeydown = (event) => {
      if (event.key === 'Escape') { this.showGitMenu = false; }
    };
  }

  ngOnInit() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      this.darkMode = false;
      baseLayerLuminance.setValueFor(document.body, StandardLuminance.LightMode);
    } else {
      this.darkMode = true;
      baseLayerLuminance.setValueFor(document.body, 0.15);
    }
  }
  
  toggleLightMode() {
    this.lightModeToggleCount++;
    this.darkMode = !this.darkMode;

    if (this.lightModeToggleCount > 7) {
      this.lightModeToggleCount = 0;
      if (this.colorsInterval) {
        window.clearInterval(this.colorsInterval);
        const color = parseColorHexRGB("#0159A0");
        if (color) {
          accentPalette.setValueFor(this.document.body, PaletteRGB.from(SwatchRGB.from(color)));
        }
        this.colorsInterval = undefined;
      } else {
        this.colorsInterval = window.setInterval(() => {
          const color = parseColorHexRGB(this.colors[this.currentColor]);
          if (color) {
            accentPalette.setValueFor(this.document.body, PaletteRGB.from(SwatchRGB.from(color)));
            this.currentColor < this.colors.length - 1 ? this.currentColor++ : this.currentColor = 0;
          }
        }, 300);
      }
    }

    const baseLuminance = this.darkMode ? 0.15 : StandardLuminance.LightMode;
    baseLayerLuminance.setValueFor(this.document.body, baseLuminance);
  }

  gotoURL(e: KeyboardEvent | MouseEvent, url: string) {
    if (e.type === 'keydown') {
      if ((e as KeyboardEvent).key !== 'Enter' && (e as KeyboardEvent).key !== ' ') {
        return;
      }
    }

    window.location.href = url;
  }

  gotoRoute(url: string) {
    this.router.navigate([url]);
  }

  toggleGitMenu() {
    this.showGitMenu = !this.showGitMenu;
  }

  handlePiClick(e: MouseEvent) {
    e.preventDefault();
    
    if (e.shiftKey && e.ctrlKey) {
			window.location.href = 'http://racer159.net/net/code1.htm';
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
