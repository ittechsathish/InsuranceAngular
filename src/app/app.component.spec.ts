import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'InsuranceAngular' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('InsuranceAngular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Calculate Monthly Premium'
    );
  });

  it('should display error message on empty name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.calculateMonthlyPremiumForm.controls['sumInsured'].setValue(
      '1000'
    );

    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('#sumInsuredInput'))
      .triggerEventHandler('keyup', null);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#nameError')?.textContent).toContain(
      'Please enter your name.'
    );
  });

  it('should hide error message on valid name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.calculateMonthlyPremiumForm.controls['sumInsured'].setValue(
      '1000'
    );

    component.calculateMonthlyPremiumForm.controls['name'].setValue(
      'default Name'
    );

    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('#sumInsuredInput'))
      .triggerEventHandler('keyup', null);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#nameError')?.textContent).not.toContain(
      'Please enter your name.'
    );
  });
});
