import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('r159HomeExperience') r159HomeExperience: ElementRef<HTMLDivElement> | undefined;

  experienceScrollData = {
    scrollLeft: 0,
    scrollWidth: 2,
    offsetWidth: 1
  }
  scrolling: undefined | number;
  scrollTo = 0;

  constructor() { }

  ngOnInit(): void { }

  scrollExperience(direction: string) {
    if (this.r159HomeExperience) {
      const cardWidth = 396;
      const offset = this.r159HomeExperience.nativeElement.offsetWidth;
      const scroll = this.r159HomeExperience.nativeElement.scrollLeft;

      const prevCard = Math.floor((scroll - 1) / cardWidth);
      const nextCard = Math.floor((scroll + offset + 16) / cardWidth);

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
      
      this.scrollTo = this.scrollTo > -1 ? this.scrollTo : 0;
      this.scrollTo = this.scrollTo < this.r159HomeExperience.nativeElement.children.length ? this.scrollTo : this.r159HomeExperience.nativeElement.children.length - 1;

      this.r159HomeExperience.nativeElement.children[this.scrollTo].scrollIntoView({behavior:'smooth', block: 'nearest'});

      this.scrolling = window.setTimeout(() => {
        this.scrolling = undefined;
      },  600);
    }
  }

  @HostListener('window:resize')
  updateExperienceScrollData() {
    if (this.r159HomeExperience) {
      this.experienceScrollData = {
        scrollLeft: this.r159HomeExperience.nativeElement.scrollLeft,
        scrollWidth: this.r159HomeExperience.nativeElement.scrollWidth,
        offsetWidth: this.r159HomeExperience.nativeElement.offsetWidth
      }
    }
  }
}
