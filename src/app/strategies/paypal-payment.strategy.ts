import { PaymentStrategy, PaymentResult } from './payment-strategy';

export class PaypalPaymentStrategy implements PaymentStrategy {
  pay(amount: number, data: any): Promise<PaymentResult> {
    return new Promise<PaymentResult>((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Pagado S/${amount} con PayPal ${data.email}`
        });
      }, 1000);
    });
  }
}
