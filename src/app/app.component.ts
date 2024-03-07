import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PremiumService } from './premium.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    NgForOf,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'InsuranceAngular';

  monthlyPremium: number = 0;
  occupations: Array<string> = [];

  premiumService: PremiumService = inject(PremiumService);

  isFormValid: boolean = true;
  nameError: boolean = false;
  dobError: boolean = false;
  sumInsuredError: boolean = false;
  occupationError: boolean = false;

  calculateMonthlyPremiumForm = new FormGroup({
    name: new FormControl(''),
    dob: new FormControl(''),
    age: new FormControl(''),
    sumInsured: new FormControl(''),
    occupation: new FormControl(''),
  });

  ngOnInit(): void {
    this.occupations = [
      'Please Select',
      'Author',
      'Cleaner',
      'Doctor',
      'Farmer',
      'Florist',
      'Mechanic',
    ];
  }

  resetValidation() {
    this.isFormValid = true;

    this.dobError = false;
    this.sumInsuredError = false;
    this.nameError = false;
    this.occupationError = false;
  }

  getAgeFromDob(dateString: string): number {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  async calculateMonthlyPremiumEvt() {
    this.resetValidation();
    this.monthlyPremium = 0;

    console.log('validating..', this.calculateMonthlyPremiumForm.value);

    let age: number =
      this.calculateMonthlyPremiumForm.value.dob == ''
        ? 0
        : this.getAgeFromDob(this.calculateMonthlyPremiumForm.value.dob ?? '');

    this.calculateMonthlyPremiumForm.controls['age'].setValue(age + '');

    let sumInsured: number = parseInt(
      this.calculateMonthlyPremiumForm.value.sumInsured || '0'
    );

    if (age < 1) {
      this.dobError = true;
      this.isFormValid = false;
    }

    if (sumInsured < 1) {
      this.sumInsuredError = true;
      this.isFormValid = false;
    }

    if (this.calculateMonthlyPremiumForm.value.name == '') {
      this.nameError = true;
      this.isFormValid = false;
    }

    if (
      this.calculateMonthlyPremiumForm.value.occupation == '' ||
      this.calculateMonthlyPremiumForm.value.occupation == 'Please Select'
    ) {
      this.occupationError = true;
      this.isFormValid = false;
    }

    if (this.isFormValid) {
      this.monthlyPremium = await this.premiumService.getMonthlyPremium(
        this.calculateMonthlyPremiumForm.value.name ?? '',
        age,
        sumInsured,
        this.calculateMonthlyPremiumForm.value.occupation ?? ''
      );
    }
  }
}
