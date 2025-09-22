import { PaymentStrategy, PaymentResult } from './payment-strategy';

export class CardPaymentStrategy implements PaymentStrategy {
  pay(amount: number, data: any): Promise<PaymentResult> {
    return new Promise<PaymentResult>((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Pagado S/${amount} con tarjeta ending ${data.cardNumber.slice(-4)}`
        });
      }, 1000);
    });
  }
}
