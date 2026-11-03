import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './payment.component';
import { PaymentContextService } from '../payment-context';
import { PaymentValidatorService } from '../validators/payment-validator.service';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let paymentContextService: jasmine.SpyObj<PaymentContextService>;
  let validatorService: jasmine.SpyObj<PaymentValidatorService>;

  beforeEach(async () => {
    const contextSpy = jasmine.createSpyObj('PaymentContextService', ['setStrategy', 'pay']);
    const validatorSpy = jasmine.createSpyObj('PaymentValidatorService', [
      'validateAmount', 'validateCardData', 'validatePaypalData', 'validateCryptoData'
    ]);

    await TestBed.configureTestingModule({
      imports: [PaymentComponent, FormsModule],
      providers: [
        { provide: PaymentContextService, useValue: contextSpy },
        { provide: PaymentValidatorService, useValue: validatorSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    paymentContextService = TestBed.inject(PaymentContextService) as jasmine.SpyObj<PaymentContextService>;
    validatorService = TestBed.inject(PaymentValidatorService) as jasmine.SpyObj<PaymentValidatorService>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.amount).toBe(100);
    expect(component.method).toBe('card');
    expect(component.loading).toBe(false);
    expect(component.resultMessage).toBe('');
  });

  it('should format card number with spaces', () => {
    component.cardNumber = '1234567890123456';
    component.onCardNumberChange();
    expect(component.cardNumber).toBe('1234 5678 9012 3456');
  });

  it('should format expiry date', () => {
    component.cardExpiry = '1225';
    component.onExpiryChange();
    expect(component.cardExpiry).toBe('12/25');
  });

  it('should limit CVV to numbers only', () => {
    component.cardCVV = 'abc123def';
    component.onCVVChange();
    expect(component.cardCVV).toBe('123');
  });

  it('should validate form before payment', async () => {
    // Setup validation responses
    validatorService.validateAmount.and.returnValue({ isValid: true, errors: [] });
    validatorService.validateCardData.and.returnValue({ isValid: true, errors: [] });
    
    // Setup successful payment
    paymentContextService.pay.and.returnValue(Promise.resolve({
      success: true,
      message: 'Payment successful'
    }));

    await component.pay();

    expect(validatorService.validateAmount).toHaveBeenCalledWith(100);
    expect(validatorService.validateCardData).toHaveBeenCalled();
    expect(paymentContextService.setStrategy).toHaveBeenCalled();
    expect(paymentContextService.pay).toHaveBeenCalled();
  });

  it('should not proceed with payment if validation fails', async () => {
    validatorService.validateAmount.and.returnValue({ 
      isValid: false, 
      errors: ['El monto debe ser mayor a 0'] 
    });

    await component.pay();

    expect(component.validationErrors).toEqual(['El monto debe ser mayor a 0']);
    expect(paymentContextService.pay).not.toHaveBeenCalled();
  });

  it('should handle payment errors', async () => {
    validatorService.validateAmount.and.returnValue({ isValid: true, errors: [] });
    validatorService.validateCardData.and.returnValue({ isValid: true, errors: [] });
    paymentContextService.pay.and.returnValue(Promise.resolve({
      success: false,
      message: 'Payment failed'
    }));

    await component.pay();

    expect(component.isSuccess).toBe(false);
    expect(component.resultMessage).toBe('Payment failed');
  });

  describe('Helper methods', () => {
    beforeEach(() => {
      component.validationErrors = [
        'El monto debe ser mayor a 0',
        'Número de tarjeta inválido',
        'Email inválido'
      ];
    });

    it('should detect amount errors', () => {
      expect(component.hasAmountError()).toBe(true);
    });

    it('should detect card number errors', () => {
      expect(component.hasCardNumberError()).toBe(true);
    });

    it('should detect email errors', () => {
      expect(component.hasEmailError()).toBe(true);
    });
  });
});
