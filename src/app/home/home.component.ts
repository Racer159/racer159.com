import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  r159HomeExperience: HTMLElement | null = null;

  constructor() { }

  ngOnInit(): void {
    this.r159HomeExperience = document.getElementById('r159-home-experience');
  }

  scrollExperience(direction: string) {
    let scroll = this.r159HomeExperience?.scrollLeft || 0;

    console.log(this.r159HomeExperience);

    if (direction === 'right') {
      scroll += 396;
    } else if (direction === 'left') {
      scroll -= 396;
    }

    this.r159HomeExperience?.scroll({top:0, left: scroll, behavior:'smooth'});
  }

}
