import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardPaymentStrategy } from '../strategies/card-payment.strategy';
import { PaypalPaymentStrategy } from '../strategies/paypal-payment.strategy';
import { CryptoPaymentStrategy } from '../strategies/crypto-payment.strategy';
import { PaymentContextService } from '../payment-context';
import { PaymentValidatorService, ValidationResult } from '../validators/payment-validator.service';
import { CommonModule } from '@angular/common';
import { PaymentData } from '../types/payment-data.types';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  amount = 100;
  method: 'card' | 'paypal' | 'crypto' = 'card';

  // Card fields
  cardNumber = '';
  cardName = '';
  cardExpiry = '';
  cardCVV = '';

  // PayPal fields
  paypalEmail = '';
  
  // Crypto fields
  walletAddress = '';

  // UI state
  loading = false;
  resultMessage = '';
  validationErrors: string[] = [];
  isSuccess = false;

  private paymentContext = inject(PaymentContextService);
  private validator = inject(PaymentValidatorService);

  async pay() {
    this.clearMessages();
    
    // Validar antes de procesar
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;

    try {
      let strategy;
      let data: PaymentData;

      // Crear estrategia y datos según el método
      switch (this.method) {
        case 'card':
          strategy = new CardPaymentStrategy();
          data = {
            cardNumber: this.cardNumber,
            cardName: this.cardName,
            cardExpiry: this.cardExpiry,
            cardCVV: this.cardCVV
          };
          break;
        case 'paypal':
          strategy = new PaypalPaymentStrategy();
          data = { email: this.paypalEmail };
          break;
        case 'crypto':
          strategy = new CryptoPaymentStrategy();
          data = { wallet: this.walletAddress };
          break;
        default:
          throw new Error('Método de pago no válido');
      }

      this.paymentContext.setStrategy(strategy);
      const result = await this.paymentContext.pay(this.amount, data);
      
      this.resultMessage = result.message;
      this.isSuccess = result.success;

      // Limpiar formulario si el pago fue exitoso
      if (result.success) {
        this.clearForm();
      }

    } catch (error: unknown) {
      this.resultMessage = (error as Error)?.message || 'Error inesperado durante el procesamiento';
      this.isSuccess = false;
    } finally {
      this.loading = false;
    }
  }

  private validateForm(): boolean {
    this.validationErrors = [];

    // Validar monto
    const amountValidation = this.validator.validateAmount(this.amount);
    if (!amountValidation.isValid) {
      this.validationErrors.push(...amountValidation.errors);
    }

    // Validar según el método de pago
    let methodValidation: ValidationResult;
    
    switch (this.method) {
      case 'card':
        methodValidation = this.validator.validateCardData({
          cardName: this.cardName,
          cardNumber: this.cardNumber,
          cardExpiry: this.cardExpiry,
          cardCVV: this.cardCVV
        });
        break;
      case 'paypal':
        methodValidation = this.validator.validatePaypalData({
          email: this.paypalEmail
        });
        break;
      case 'crypto':
        methodValidation = this.validator.validateCryptoData({
          wallet: this.walletAddress
        });
        break;
      default:
        methodValidation = { isValid: false, errors: ['Método de pago no válido'] };
    }

    if (!methodValidation.isValid) {
      this.validationErrors.push(...methodValidation.errors);
    }

    return this.validationErrors.length === 0;
  }

  private clearMessages() {
    this.resultMessage = '';
    this.validationErrors = [];
    this.isSuccess = false;
  }

  private clearForm() {
    // Limpiar campos según el método
    switch (this.method) {
      case 'card':
        this.cardNumber = '';
        this.cardName = '';
        this.cardExpiry = '';
        this.cardCVV = '';
        break;
      case 'paypal':
        this.paypalEmail = '';
        break;
      case 'crypto':
        this.walletAddress = '';
        break;
    }
  }

  // Formatear número de tarjeta mientras se escribe
  onCardNumberChange() {
    // Remover todos los espacios y caracteres no numéricos
    let value = this.cardNumber.replace(/\D/g, '');
    
    // Agregar espacios cada 4 dígitos
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limitar a 19 caracteres (16 dígitos + 3 espacios)
    this.cardNumber = value.substring(0, 19);
  }

  // Formatear fecha de expiración
  onExpiryChange() {
    let value = this.cardExpiry.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    this.cardExpiry = value;
  }

  // Limitar CVV a solo números
  onCVVChange() {
    this.cardCVV = this.cardCVV.replace(/\D/g, '').substring(0, 4);
  }

  // Métodos auxiliares para el template
  hasAmountError(): boolean {
    return this.validationErrors.some(error => 
      error.includes('monto') || error.includes('Monto')
    );
  }

  hasNameError(): boolean {
    return this.validationErrors.some(error => 
      error.includes('nombre')
    );
  }

  hasCardNumberError(): boolean {
    return this.validationErrors.some(error => 
      error.includes('tarjeta') && error.includes('número')
    );
  }

  hasExpiryError(): boolean {
    return this.validationErrors.some(error => 
      error.includes('expiración') || error.includes('expirado')
    );
  }

  hasCVVError(): boolean {
    return this.validationErrors.some(error => 
      error.includes('CVV')
    );
  }

  hasEmailError(): boolean {
    return this.validationErrors.some(error => 
      error.includes('email') || error.includes('Email')
    );
  }

  hasWalletError(): boolean {
    return this.validationErrors.some(error => 
      error.includes('wallet')
    );
  }
}
