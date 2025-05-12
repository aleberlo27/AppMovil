import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-alert-error',
  imports: [],
  templateUrl: './alert-error.component.html',
  styleUrl:  './alert-error.component.scss'
})
export class AlertErrorComponent {
  message = input<string>('');
}
