import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PremiumService {
  constructor() {}

  async getMonthlyPremium(
    name: string,
    age: number,
    sumInsured: number,
    occupation: string
  ): Promise<number> {
    try {
      const response = await fetch('http://localhost:5004/calculate-monthly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          age,
          sumInsured,
          occupation,
        }),
      });

      const responseData = await response.json();
      console.log('Success:', responseData);

      return responseData.status == 'Success' ? responseData.result : 0;
    } catch (error) {
      console.error('Error:', error);
      return 0;
    }
  }
}
