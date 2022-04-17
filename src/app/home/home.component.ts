import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('r159HomeExperience') r159HomeExperience: ElementRef<HTMLDivElement> | undefined;

  mode = '';

  experienceScrollData = {
    scrollLeft: 0,
    scrollWidth: 2,
    offsetWidth: 1
  };
  updateTimeout: number | undefined;
  scrolling: undefined | number;
  scrollTo = 0;

  constructor(private _Activatedroute: ActivatedRoute) {
    this._Activatedroute.queryParams.subscribe(params => {
      const current = new Date();
      const today = (current.getMonth() + 1) + '-' + current.getDate();
      const eas = this.getEaster(current.getFullYear());

      this.mode = params['mode'] ? params['mode'] : 'ua';

      if (this.mode === '') {
        if (today === '4-9') {
          this.mode = atob('dW4=');
        } else if (today === '7-4') {
          this.mode = atob('dXM=');
        } else if (today === eas[0] + '-' + eas[1]) {
          this.mode = atob('ZWE=');
        }
      }
    });
  }

  scrollExperience(direction: string) {
    if (this.r159HomeExperience && this.r159HomeExperience.nativeElement.children.length > 0) {
      // gather width offset and scroll constants
      const cardWidth = this.r159HomeExperience.nativeElement.children[0].clientWidth;
      const cardGap = 16;
      const offset = this.r159HomeExperience.nativeElement.offsetWidth;
      const scroll = this.r159HomeExperience.nativeElement.scrollLeft;

      // determine the next card and the previous card
      const nextCard = Math.floor((scroll + offset + 16) / (cardWidth + cardGap));
      const prevCard = Math.floor((scroll - 1) / (cardWidth + cardGap));

      // if we are scrolling scroll past the current card
      if (this.scrolling) {
        window.clearInterval(this.scrolling);
        if (direction === 'right') {
          this.scrollTo++;
        } else if (direction === 'left') {
          this.scrollTo--;
        }
      } else {
        if (direction === 'right') {
          this.scrollTo = nextCard;
        } else if (direction === 'left') {
          this.scrollTo = prevCard;
        }
      }
      
      // rebound scrollTo to the card list
      this.scrollTo = this.scrollTo > -1 ? this.scrollTo : 0;
      this.scrollTo = this.scrollTo < this.r159HomeExperience.nativeElement.children.length ? this.scrollTo : this.r159HomeExperience.nativeElement.children.length - 1;

      // calculate the leftmost pixel of the card to scrollTo
      let left = (this.scrollTo * (cardWidth + cardGap));
      if (direction === 'right') {
        left = left - offset + cardWidth; 
      }

      // scroll to the card
      this.r159HomeExperience.nativeElement.scroll({behavior:'smooth', left});

      // set a timeout that we started a scroll event
      this.scrolling = window.setTimeout(() => {
        this.scrolling = undefined;
      },  600);
    }
  }

  @HostListener('window:resize')
  updateExperienceScrollData() {
    const update = () => {
      if (this.r159HomeExperience) {
        this.experienceScrollData = {
          scrollLeft: this.r159HomeExperience.nativeElement.scrollLeft,
          scrollWidth: this.r159HomeExperience.nativeElement.scrollWidth,
          offsetWidth: this.r159HomeExperience.nativeElement.offsetWidth
        };
      }
    };

    clearTimeout(this.updateTimeout);
    this.updateTimeout = window.setTimeout(update, 25);
  }

  /**
  * Calculates Easter in the Gregorian/Western (Catholic and Protestant) calendar 
  * based on the algorithm by Oudin (1940) from http://www.tondering.dk/claus/cal/easter.php
  * @returns {array} [int month, int day]
  */
  getEaster(year: number) {
    const f = Math.floor,
      // Golden Number - 1
      G = year % 19,
      C = f(year / 100),
      // related to Epact
      H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
      // number of days from 21 March to the Paschal full moon
      I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
      // weekday for the Paschal full moon
      J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
      // number of days from 21 March to the Sunday on or before the Paschal full moon
      L = I - J,
      month = 3 + f((L + 40)/44),
      day = L + 28 - 31 * f(month / 4);

    return [month,day];
  }
}
