import { TestBed } from '@angular/core/testing';
import { PaymentValidatorService } from './payment-validator.service';

describe('PaymentValidatorService', () => {
  let service: PaymentValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validateAmount', () => {
    it('should validate positive amounts', () => {
      const result = service.validateAmount(100);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject zero amount', () => {
      const result = service.validateAmount(0);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('El monto debe ser mayor a 0');
    });

    it('should reject negative amounts', () => {
      const result = service.validateAmount(-50);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('El monto debe ser mayor a 0');
    });

    it('should reject amounts over 10000', () => {
      const result = service.validateAmount(15000);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('El monto no puede exceder S/10,000');
    });
  });

  describe('validateCardData', () => {
    it('should validate correct card data', () => {
      const validData = {
        cardName: 'John Doe',
        cardNumber: '4532015112830366', // Valid test card
        cardExpiry: '12/25',
        cvv: '123'
      };

      const result = service.validateCardData(validData);
      expect(result.isValid).toBe(true);
    });

    it('should reject missing card name', () => {
      const invalidData = {
        cardName: '',
        cardNumber: '4532015112830366',
        cardExpiry: '12/25',
        cvv: '123'
      };

      const result = service.validateCardData(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('El nombre en la tarjeta es requerido');
    });

    it('should reject invalid card number', () => {
      const invalidData = {
        cardName: 'John Doe',
        cardNumber: '1234567890123456', // Invalid by Luhn
        cardExpiry: '12/25',
        cvv: '123'
      };

      const result = service.validateCardData(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('Luhn'))).toBe(true);
    });

    it('should reject expired cards', () => {
      const invalidData = {
        cardName: 'John Doe',
        cardNumber: '4532015112830366',
        cardExpiry: '01/20', // Expired
        cvv: '123'
      };

      const result = service.validateCardData(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('La tarjeta ha expirado');
    });
  });

  describe('validatePaypalData', () => {
    it('should validate correct email', () => {
      const result = service.validatePaypalData({ email: 'user@paypal.com' });
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid email format', () => {
      const result = service.validatePaypalData({ email: 'invalid-email' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Formato de email inválido');
    });

    it('should reject missing email', () => {
      const result = service.validatePaypalData({ email: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('El email de PayPal es requerido');
    });
  });

  describe('validateCryptoData', () => {
    it('should validate correct wallet address', () => {
      const result = service.validateCryptoData({ 
        wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' 
      });
      expect(result.isValid).toBe(true);
    });

    it('should reject short wallet address', () => {
      const result = service.validateCryptoData({ wallet: '123' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Dirección de wallet inválida (longitud incorrecta)');
    });

    it('should reject wallet with invalid characters', () => {
      const result = service.validateCryptoData({ 
        wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa@#$' 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Dirección de wallet contiene caracteres inválidos');
    });
  });
});