import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import {
  provideFluentDesignSystem,
  fluentToolbar,
  fluentButton,
  fluentCard,
  fluentBadge,
  fluentDivider,
  bodyFont,
  baseLayerLuminance,
  StandardLuminance,
  density,
  controlCornerRadius,
  layerCornerRadius,
  SwatchRGB,
  accentBaseColor
} from '@fluentui/web-components';

import {
  parseColorHexRGB
} from '@microsoft/fast-colors';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

provideFluentDesignSystem().register(
  fluentToolbar(),
  fluentButton(),
  fluentCard(),
  fluentBadge(),
  fluentDivider());

const r159Body = document.getElementById("r159-body") as HTMLElement;

accentBaseColor.setValueFor(r159Body, SwatchRGB.from(parseColorHexRGB("#0159A0")!));
bodyFont.setValueFor(r159Body, "SegoeUI, Arial, Helvetica, sans-serif");
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  baseLayerLuminance.setValueFor(r159Body, StandardLuminance.LightMode);
} else {
  baseLayerLuminance.setValueFor(r159Body, StandardLuminance.DarkMode);
}
density.setValueFor(r159Body, 1.25);
controlCornerRadius.setValueFor(r159Body, 3);
layerCornerRadius.setValueFor(r159Body, 5);
