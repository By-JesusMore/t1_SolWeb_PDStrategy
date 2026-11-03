import { CardPaymentStrategy } from './card-payment.strategy';

describe('CardPaymentStrategy', () => {
  let strategy: CardPaymentStrategy;

  beforeEach(() => {
    strategy = new CardPaymentStrategy();
  });

  it('should create an instance', () => {
    expect(strategy).toBeTruthy();
  });

  it('should process payment successfully with valid data', async () => {
    const amount = 100;
    const data = { 
      cardNumber: '1234567890123456',
      cardName: 'John Doe',
      expiry: '12/25',
      cvv: '123'
    };

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(true);
    expect(result.message).toContain('Pagado S/100');
    expect(result.message).toContain('3456'); // last 4 digits
  });

  it('should handle zero amount', async () => {
    const amount = 0;
    const data = { cardNumber: '1234567890123456' };

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Monto debe ser mayor a 0');
  });

  it('should handle negative amount', async () => {
    const amount = -50;
    const data = { cardNumber: '1234567890123456' };

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Monto debe ser mayor a 0');
  });

  it('should handle invalid card number', async () => {
    const amount = 100;
    const data = { cardNumber: '123' }; // Invalid card number

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Número de tarjeta inválido');
  });
});