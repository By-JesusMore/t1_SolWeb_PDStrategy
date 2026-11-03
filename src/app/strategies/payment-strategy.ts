import { PaymentData } from '../types/payment-data.types';

export interface PaymentResult {
  success: boolean;
  message: string;
}

export interface PaymentStrategy {
  /**
   * Ejecuta el pago según la estrategia.
   * @param amount - Monto a pagar
   * @param data - Datos específicos del método de pago
   * @returns Promise que resuelve un PaymentResult
   */
  pay(amount: number, data: PaymentData): Promise<PaymentResult>;
}

