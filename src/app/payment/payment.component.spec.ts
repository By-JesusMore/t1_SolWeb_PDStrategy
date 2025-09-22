import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { PaymentContextService } from '../payment-context';
//import { PaymentContextService } from '../payment-context.service';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentComponent],
      providers: [PaymentContextService]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
