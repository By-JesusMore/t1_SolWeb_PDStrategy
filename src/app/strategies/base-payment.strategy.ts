import { PaymentStrategy, PaymentResult } from './payment-strategy';
import { PaymentData } from '../types/payment-data.types';

export abstract class BasePaymentStrategy implements PaymentStrategy {
  
  abstract pay(amount: number, data: PaymentData): Promise<PaymentResult>;

  /**
   * Simula el delay de procesamiento de pago
   */
  protected simulateProcessingDelay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}