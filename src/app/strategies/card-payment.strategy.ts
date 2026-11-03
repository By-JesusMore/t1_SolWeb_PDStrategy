import { PaymentResult } from './payment-strategy';
import { BasePaymentStrategy } from './base-payment.strategy';
import { PaymentValidatorService } from '../validators/payment-validator.service';
import { CardPaymentData, PaymentData } from '../types/payment-data.types';

export class CardPaymentStrategy extends BasePaymentStrategy {
  private validator = new PaymentValidatorService();

  async pay(amount: number, data: PaymentData): Promise<PaymentResult> {
    // Validación de monto usando el servicio
    const amountValidation = this.validator.validateAmount(amount);
    if (!amountValidation.isValid) {
      return {
        success: false,
        message: amountValidation.errors[0]
      };
    }

    const cardData = data as CardPaymentData;

    // Validación básica de número de tarjeta
    if (!cardData.cardNumber || cardData.cardNumber.length < 13) {
      return {
        success: false,
        message: 'Número de tarjeta inválido'
      };
    }

    // Simular procesamiento
    await this.simulateProcessingDelay(1000);

    // Simular un 5% de fallos aleatorios
    if (Math.random() < 0.05) {
      return {
        success: false,
        message: 'Transacción rechazada por el banco. Intente nuevamente.'
      };
    }

    // Simular fondos insuficientes para montos muy altos
    if (amount > 5000) {
      return {
        success: false,
        message: 'Fondos insuficientes en la tarjeta'
      };
    }

    return {
      success: true,
      message: `Pagado S/${amount} con tarjeta ending ${cardData.cardNumber.slice(-4)}`
    };
  }
}
