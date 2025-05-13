import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonCard, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [IonCardSubtitle, IonCardHeader, IonContent, IonCardTitle, IonCardContent, IonCard, IonButton, FormsModule],
  templateUrl: './initial.component.html',
  styleUrl:'./initial.component.css',
})
export class InitialComponent {
  user: any;

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      // Si no hay usuario, podrías redirigir al login
    }
  }

  startShift() {
    console.log('Turno iniciado');
    // Aquí podrías llamar a un servicio que registre el inicio del turno
  }
}
