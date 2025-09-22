export interface PaymentResult {
  success: boolean;
  message: string;
}

export interface PaymentStrategy {
  pay(amount: number, data: any): Promise<PaymentResult>;
}// src/app/strategies/payment-strategy.ts

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
  pay(amount: number, data: any): Promise<PaymentResult>;
}

