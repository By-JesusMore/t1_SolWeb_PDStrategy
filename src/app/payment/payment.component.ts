import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { PaymentContextService } from '../payment-context.service';
import { CardPaymentStrategy } from '../strategies/card-payment.strategy';
import { PaypalPaymentStrategy } from '../strategies/paypal-payment.strategy';
import { CryptoPaymentStrategy } from '../strategies/crypto-payment.strategy';
import { PaymentContextService } from '../payment-context';
import { CommonModule } from '@angular/common'; // ✅ importa CommonModule

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  amount = 100;
  method: 'card' | 'paypal' | 'crypto' = 'card';

  cardNumber = '';
  cardName = '';
  cardExpiry = '';
  cardCVV = '';

  paypalEmail = '';
  walletAddress = '';

  loading = false;
  resultMessage = '';

  constructor(private paymentContext: PaymentContextService) { }

  async pay() {
    this.loading = true;
    this.resultMessage = '';

    let strategy;
    if (this.method === 'card') strategy = new CardPaymentStrategy();
    else if (this.method === 'paypal') strategy = new PaypalPaymentStrategy();
    else strategy = new CryptoPaymentStrategy();

    this.paymentContext.setStrategy(strategy);

    const data = this.method === 'card'
      ? { cardNumber: this.cardNumber, cardName: this.cardName, expiry: this.cardExpiry, cvv: this.cardCVV }
      : this.method === 'paypal'
        ? { email: this.paypalEmail }
        : { wallet: this.walletAddress };

    try {
      const res = await this.paymentContext.pay(this.amount, data);
      this.resultMessage = res.message;
    } catch (err: any) {
      this.resultMessage = err?.message || 'Error inesperado';
    } finally {
      this.loading = false;
    }
  }
}
