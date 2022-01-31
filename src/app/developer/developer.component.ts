import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  audioContext: AudioContext | undefined;
  oscillatorOne: OscillatorNode | undefined;
  oscillatorTwo: OscillatorNode | undefined;
  number = '';

  showToast = false;
  toastTimeout: undefined | number;

  constructor(private router: Router) {
    this.audioContext = new AudioContext();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

playDTMF(e: MouseEvent | TouchEvent, high: number, low: number, pressed: string) {
    if (e.type === 'touchstart') {
      e.stopPropagation();
      e.preventDefault();
    }

    this.number += pressed;

    if (this.audioContext) {
      this.stopDTMF();

      this.oscillatorOne = this.audioContext.createOscillator();
      const gainOne = this.audioContext.createGain();
      this.oscillatorTwo = this.audioContext.createOscillator();
      const gainTwo = this.audioContext.createGain();
  
      this.oscillatorOne.frequency.value = high;
      this.oscillatorOne.connect(gainOne);
      gainOne.connect(this.audioContext.destination);
      gainOne.gain.value = 0.15;
      this.oscillatorOne.start();

      this.oscillatorTwo.frequency.value = low;
      this.oscillatorTwo.connect(gainTwo);
      gainTwo.connect(this.audioContext.destination);
      gainTwo.gain.value = 0.15;
      this.oscillatorTwo.start();
    }
  }

  stopDTMF() {
    if (this.oscillatorOne && this.oscillatorTwo) {
      this.oscillatorOne.stop();
      this.oscillatorOne.disconnect();
      this.oscillatorTwo.stop();
      this.oscillatorTwo.disconnect();
    }
  }

  activate() {
    if (this.number === atob('MzIxMjMzMzIyMjMzMzMyMTIzMzMzMjIzMjE=')) {
      this.router.navigate([''], { queryParams: { unicorn: 'true' } });
    } else {
      this.number = '';
      this.showToast = true;

      this.toastTimeout && window.clearTimeout(this.toastTimeout);

      this.toastTimeout = window.setTimeout(() => {
        this.showToast = false;
      }, 750);
    }
  }

  noContext() {
    this.stopDTMF();
    return false;
  }
}
