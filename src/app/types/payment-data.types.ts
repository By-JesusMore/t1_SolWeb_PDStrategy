export interface CardPaymentData {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCVV: string;
}

export interface PaypalPaymentData {
  email: string;
}

export interface CryptoPaymentData {
  wallet: string;
}

export type PaymentData = CardPaymentData | PaypalPaymentData | CryptoPaymentData | Record<string, unknown>;