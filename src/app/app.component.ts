import { Component, signal } from '@angular/core';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ PaymentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly title = signal('T1');
}
