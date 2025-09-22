import { Injectable } from '@angular/core';
import { PaymentStrategy } from './strategies/payment-strategy';

@Injectable({ providedIn: 'root' })
export class PaymentContextService {
  private strategy: PaymentStrategy | null = null;

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  async pay(amount: number, data: any) {
    if (!this.strategy) throw new Error('Estrategia no definida');
    return this.strategy.pay(amount, data);
  }
}
