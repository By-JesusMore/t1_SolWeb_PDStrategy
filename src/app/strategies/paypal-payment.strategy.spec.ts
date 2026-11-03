import { PaypalPaymentStrategy } from './paypal-payment.strategy';

describe('PaypalPaymentStrategy', () => {
  let strategy: PaypalPaymentStrategy;

  beforeEach(() => {
    strategy = new PaypalPaymentStrategy();
  });

  it('should create an instance', () => {
    expect(strategy).toBeTruthy();
  });

  it('should process payment successfully with valid email', async () => {
    const amount = 150;
    const data = { email: 'user@paypal.com' };

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(true);
    expect(result.message).toContain('Pagado S/150');
    expect(result.message).toContain('user@paypal.com');
  });

  it('should handle invalid amount', async () => {
    const amount = 0;
    const data = { email: 'user@paypal.com' };

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Monto debe ser mayor a 0');
  });

  it('should handle invalid email format', async () => {
    const amount = 100;
    const data = { email: 'invalid-email' };

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Email inválido');
  });

  it('should handle missing email', async () => {
    const amount = 100;
    const data = { email: '' };

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Email es requerido');
  });
});