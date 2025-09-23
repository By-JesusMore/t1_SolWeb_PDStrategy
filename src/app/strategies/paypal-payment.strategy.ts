import { PaymentResult } from './payment-strategy';
import { BasePaymentStrategy } from './base-payment.strategy';
import { PaymentValidatorService } from '../validators/payment-validator.service';
import { PaypalPaymentData, PaymentData } from '../types/payment-data.types';

export class PaypalPaymentStrategy extends BasePaymentStrategy {
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

    const paypalData = data as PaypalPaymentData;

    // Validación de email
    if (!paypalData.email || paypalData.email.trim() === '') {
      return {
        success: false,
        message: 'Email es requerido'
      };
    }

    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paypalData.email)) {
      return {
        success: false,
        message: 'Email inválido'
      };
    }

    // Simular procesamiento
    await this.simulateProcessingDelay(1000);

    // Simular cuenta PayPal no verificada
    if (paypalData.email.includes('test') || paypalData.email.includes('fake')) {
      return {
        success: false,
        message: 'Cuenta PayPal no verificada'
      };
    }

    // Simular límite de PayPal
    if (amount > 3000) {
      return {
        success: false,
        message: 'Monto excede el límite diario de PayPal'
      };
    }

    return {
      success: true,
      message: `Pagado S/${amount} con PayPal ${paypalData.email}`
    };
  }
}
