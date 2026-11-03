import { Injectable } from '@angular/core';
import { CardPaymentData, PaypalPaymentData, CryptoPaymentData } from '../types/payment-data.types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PaymentValidatorService {

  validateAmount(amount: number): ValidationResult {
    const errors: string[] = [];

    if (amount === null || amount === undefined) {
      errors.push('El monto es requerido');
    } else if (amount <= 0) {
      errors.push('El monto debe ser mayor a 0');
    } else if (amount > 10000) {
      errors.push('El monto no puede exceder S/10,000');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateCardData(data: CardPaymentData): ValidationResult {
    const errors: string[] = [];

    // Validar nombre en tarjeta
    if (!data.cardName || data.cardName.trim().length === 0) {
      errors.push('El nombre en la tarjeta es requerido');
    } else if (data.cardName.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }

    // Validar número de tarjeta
    if (!data.cardNumber) {
      errors.push('El número de tarjeta es requerido');
    } else {
      const cleanCardNumber = data.cardNumber.replace(/\s/g, '');
      if (!/^\d{13,19}$/.test(cleanCardNumber)) {
        errors.push('Número de tarjeta inválido (debe tener entre 13-19 dígitos)');
      } else if (!this.luhnCheck(cleanCardNumber)) {
        errors.push('Número de tarjeta inválido (algoritmo de Luhn)');
      }
    }

    // Validar fecha de expiración
    if (!data.cardExpiry) {
      errors.push('La fecha de expiración es requerida');
    } else if (!/^\d{2}\/\d{2}$/.test(data.cardExpiry)) {
      errors.push('Formato de fecha inválido (MM/AA)');
    } else {
      const [month, year] = data.cardExpiry.split('/').map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (month < 1 || month > 12) {
        errors.push('Mes inválido (01-12)');
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        errors.push('La tarjeta ha expirado');
      }
    }

    // Validar CVV
    if (!data.cardCVV) {
      errors.push('El CVV es requerido');
    } else if (!/^\d{3,4}$/.test(data.cardCVV)) {
      errors.push('CVV inválido (3-4 dígitos)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validatePaypalData(data: PaypalPaymentData): ValidationResult {
    const errors: string[] = [];

    if (!data.email) {
      errors.push('El email de PayPal es requerido');
    } else if (!this.isValidEmail(data.email)) {
      errors.push('Formato de email inválido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateCryptoData(data: CryptoPaymentData): ValidationResult {
    const errors: string[] = [];

    if (!data.wallet) {
      errors.push('La dirección de wallet es requerida');
    } else if (data.wallet.length < 26 || data.wallet.length > 62) {
      errors.push('Dirección de wallet inválida (longitud incorrecta)');
    } else if (!/^[a-zA-Z0-9]+$/.test(data.wallet)) {
      errors.push('Dirección de wallet contiene caracteres inválidos');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Algoritmo de Luhn para validar números de tarjeta
  private luhnCheck(cardNumber: string): boolean {
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }
}