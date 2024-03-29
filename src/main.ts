import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import {
  provideFASTDesignSystem,
  fastToolbar,
  fastButton,
  fastTextField,
  fastCard,
  fastBadge,
  fastDivider,
  fastMenu,
  fastMenuItem,
  fastSwitch,
  bodyFont,
  density,
  controlCornerRadius,
  SwatchRGB,
  PaletteRGB,
  accentPalette
} from "@microsoft/fast-components";

import {
  parseColorHexRGB
} from '@microsoft/fast-colors';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

provideFASTDesignSystem().register(
  fastToolbar(),
  fastButton(),
  fastTextField(),
  fastCard(),
  fastBadge(),
  fastDivider(),
  fastMenu(),
  fastMenuItem(),
  fastSwitch());

const color = parseColorHexRGB("#0159A0");
if (color) {
  accentPalette.setValueFor(document.body, PaletteRGB.from(SwatchRGB.from(color)));
}
bodyFont.setValueFor(document.body, "Rubik, sans-serif");
density.setValueFor(document.body, 1.25);
controlCornerRadius.setValueFor(document.body, 3);
