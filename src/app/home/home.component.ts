import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('r159HomeExperience') r159HomeExperience: ElementRef | undefined;

  experienceScrollData = {
    scrollLeft: 0,
    scrollWidth: 2,
    offsetWidth: 1
  }

  constructor() { }

  ngOnInit(): void { }

  scrollExperience(direction: string) {
    if (this.r159HomeExperience) {
      const cardWidth = 396;
      let scroll = this.r159HomeExperience.nativeElement.scrollLeft;
      let leftover = scroll % cardWidth;
  
      if (!leftover) {
        if (direction === 'right') {
          scroll += cardWidth;
        } else if (direction === 'left') {
          scroll -= cardWidth;
        }
      } else {
        if (direction === 'right') {
          scroll += (cardWidth - leftover);
        } else if (direction === 'left') {
          scroll -= leftover;
        }
      }
  
      this.r159HomeExperience.nativeElement.scroll({top:0, left: scroll, behavior:'smooth'});
      console.log(this.r159HomeExperience.nativeElement);
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
