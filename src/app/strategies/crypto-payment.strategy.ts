import { PaymentStrategy, PaymentResult } from './payment-strategy';

export class CryptoPaymentStrategy implements PaymentStrategy {
  pay(amount: number, data: any): Promise<PaymentResult> {
    return new Promise<PaymentResult>((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Pagado S/${amount} con Crypto wallet ${data.wallet}`
        });
      }, 1000);
    });
  }
}
