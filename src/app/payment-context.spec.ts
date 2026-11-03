import { TestBed } from '@angular/core/testing';
import { PaymentContextService } from './payment-context';
import { PaymentStrategy, PaymentResult } from './strategies/payment-strategy';

// Mock strategy for testing
class MockPaymentStrategy implements PaymentStrategy {
  pay(amount: number): Promise<PaymentResult> {
    return Promise.resolve({
      success: true,
      message: `Mock payment of S/${amount}`
    });
  }
}

class MockFailingStrategy implements PaymentStrategy {
  pay(): Promise<PaymentResult> {
    return Promise.resolve({
      success: false,
      message: 'Payment failed'
    });
  }
}

describe('PaymentContextService', () => {
  let service: PaymentContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set strategy correctly', () => {
    const mockStrategy = new MockPaymentStrategy();
    service.setStrategy(mockStrategy);
    
    expect(service['strategy']).toBe(mockStrategy);
  });

  it('should throw error when no strategy is set', async () => {
    try {
      await service.pay(100, {});
      fail('Expected error to be thrown');
    } catch (error: unknown) {
      expect((error as Error).message).toBe('Estrategia no definida');
    }
  });

  it('should execute payment with set strategy', async () => {
    const mockStrategy = new MockPaymentStrategy();
    service.setStrategy(mockStrategy);

    const result = await service.pay(100, { test: 'data' });

    expect(result.success).toBe(true);
    expect(result.message).toContain('Mock payment of S/100');
  });

  it('should handle failed payments', async () => {
    const failingStrategy = new MockFailingStrategy();
    service.setStrategy(failingStrategy);

    const result = await service.pay(100, {});

    expect(result.success).toBe(false);
    expect(result.message).toBe('Payment failed');
  });
});
