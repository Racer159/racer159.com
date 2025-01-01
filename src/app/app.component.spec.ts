import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([])
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

  it('should set darkMode', async () => {
    const mediaSpy = spyOn(window, 'matchMedia').and.returnValue({ matches: false } as MediaQueryList);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    await fixture.whenStable();

    expect(app.lightMode).toEqual(false);
    expect(mediaSpy).toHaveBeenCalledWith('(prefers-color-scheme: light)');
  });

  it('should render toolbar label', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('fast-toolbar a img')).toBeTruthy();
    expect(compiled.querySelector('fast-toolbar a')?.textContent).toContain('Racer159');
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
    expect(compiled.querySelector('#copyright')?.textContent).toContain('© ' + new Date().getFullYear());
    expect(compiled.querySelector('#footer')?.textContent).toContain('π');
  });

  it('should render the git menu', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const gitButton = fixture.nativeElement.querySelectorAll('fast-toolbar div[slot="end"] fast-button').item(2) as HTMLElement;
    expect(compiled.querySelector('#git-menu')?.classList).toContain('hidden');

    gitButton.click();

    fixture.detectChanges();

    await fixture.whenStable();

    expect(compiled.querySelector('#git-menu')?.classList).toContain('shown');
  });
});
