import { TestBed } from '@angular/core/testing';

import { PaymentContext } from './payment-context';

describe('PaymentContext', () => {
  let service: PaymentContext;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentContext);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
