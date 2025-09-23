import { CryptoPaymentStrategy } from './crypto-payment.strategy';

describe('CryptoPaymentStrategy', () => {
  let strategy: CryptoPaymentStrategy;

  beforeEach(() => {
    strategy = new CryptoPaymentStrategy();
  });

  it('should create an instance', () => {
    expect(strategy).toBeTruthy();
  });

  it('should process payment successfully with valid wallet', async () => {
    const amount = 200;
    const data = { wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' };

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(true);
    expect(result.message).toContain('Pagado S/200');
    expect(result.message).toContain('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
  });

  it('should handle invalid amount', async () => {
    const amount = -10;
    const data = { wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' };

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Monto debe ser mayor a 0');
  });

  it('should handle invalid wallet address', async () => {
    const amount = 100;
    const data = { wallet: '123' }; // Too short

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Dirección de wallet inválida');
  });

  it('should handle missing wallet', async () => {
    const amount = 100;
    const data = { wallet: '' };

    const result = await strategy.pay(amount, data);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Dirección de wallet es requerida');
  });
});