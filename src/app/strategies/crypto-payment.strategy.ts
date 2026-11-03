import { PaymentResult } from './payment-strategy';
import { BasePaymentStrategy } from './base-payment.strategy';
import { PaymentValidatorService } from '../validators/payment-validator.service';
import { CryptoPaymentData, PaymentData } from '../types/payment-data.types';

export class CryptoPaymentStrategy extends BasePaymentStrategy {
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

    const cryptoData = data as CryptoPaymentData;

    // Validación de wallet
    if (!cryptoData.wallet || cryptoData.wallet.trim() === '') {
      return {
        success: false,
        message: 'Dirección de wallet es requerida'
      };
    }

    // Validación básica de formato de wallet
    if (cryptoData.wallet.length < 26 || cryptoData.wallet.length > 62) {
      return {
        success: false,
        message: 'Dirección de wallet inválida'
      };
    }

    // Simular procesamiento (crypto toma más tiempo)
    await this.simulateProcessingDelay(1500);

    // Simular red congestionada
    if (Math.random() < 0.1) {
      return {
        success: false,
        message: 'Red blockchain congestionada. Intente más tarde.'
      };
    }

    // Simular wallet sin fondos
    if (cryptoData.wallet.startsWith('empty')) {
      return {
        success: false,
        message: 'Wallet sin fondos suficientes'
      };
    }

    // Simular límite de gas alto para montos grandes
    if (amount > 2000) {
      return {
        success: false,
        message: 'Costo de gas muy alto para esta transacción'
      };
    }

    return {
      success: true,
      message: `Pagado S/${amount} con Crypto wallet ${cryptoData.wallet}`
    };
  }
}
