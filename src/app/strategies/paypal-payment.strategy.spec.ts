import { PaypalPaymentStrategy } from "./paypal-payment.strategy";


describe('PaypalPayment', () => {
  it('should create an instance', () => {
    expect(new PaypalPaymentStrategy()).toBeTruthy();
  });
});
//import { PaypalPayment } from './paypal-paymentstrategy';