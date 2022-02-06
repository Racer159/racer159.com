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
  }
  updateTimeout: number | undefined;
  scrolling: undefined | number;
  scrollTo = 0;

  constructor(private _Activatedroute: ActivatedRoute) {
    this._Activatedroute.queryParams.subscribe(params => {
      const current = new Date();
      const today = (current.getMonth() + 1) + '-' + current.getDate();

      this.mode = params['mode'] ? params['mode'] : '';

      if (this.mode === '') {
        if (today === '4-9') {
          this.mode = atob('dW4=');
        } else if (today === '7-4') {
          this.mode = atob('dXM=');
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
        }
      }
    };

    clearTimeout(this.updateTimeout);
    this.updateTimeout = window.setTimeout(update, 25);
  }
}
