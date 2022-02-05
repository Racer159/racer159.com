import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();
  });
  
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set darkMode', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.darkMode).toEqual(true);
  });

  it('should render toolbar label', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('fast-toolbar label img')).toBeTruthy();
    expect(compiled.querySelector('fast-toolbar label')?.textContent).toContain('Racer159');
  });

  it('should render toolbar buttons and have print-only text', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('fast-toolbar div[slot="end"] fast-button').length).toEqual(3);
    expect(compiled.querySelector('fast-toolbar div[slot="end"] .print-only')?.textContent).toContain('https://racer159.com');
  });

  it('should render footer items', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#r159-copyright')?.textContent).toContain('© ' + new Date().getFullYear());
    expect(compiled.querySelector('#r159-footer')?.textContent).toContain('π');
  });
});
