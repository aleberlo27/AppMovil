import { Component, signal } from '@angular/core';
import {
  IonContent,
  IonCardHeader,
  IonCardSubtitle,
  IonFooter,
  IonCardTitle,
  IonCardContent,
  IonCard,
  IonButton,
  IonToolbar,
  IonPopover,
  IonIcon,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { WorkerResponse } from 'src/app/pages/auth/models/auth.interface';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [
    IonIcon,
    IonPopover,
    IonPopover,
    IonIcon,
    IonFooter,
    IonCardSubtitle,
    IonToolbar,
    IonCardHeader,
    IonContent,
    IonCardTitle,
    IonCardContent,
    IonCard,
    IonButton,
    FormsModule,
  ],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css',
})
export class InitialComponent {
  worker: WorkerResponse | null = null;
  errorMessage: string = '';
  isOnShift = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.authService.worker$.subscribe((worker) => {
      this.worker = worker;
      this.checkIfOnShift();
    });
  }
  startShift() {
    if (!this.worker) {
      console.error('No hay trabajador autenticado');
      return;
    }

    if (this.isOnShift()) {
      this.presentAlreadyOnShiftAlert();
      return;
    }

    const currentDate = new Date();
    const start = this.formatTime(currentDate);

    const endDate = new Date(currentDate);
    endDate.setHours(currentDate.getHours() + 8); //Sumar 8 horas
    const end = this.formatTime(endDate);

    //Datos para el turno
    const shiftData = {
      date: currentDate.toISOString().split('T')[0],
      start,
      end,
    };

    this.authService.startShift(this.worker._id, shiftData).subscribe(
      (response) => {
        console.log('Turno iniciado correctamente', response);
        this.isOnShift.set(true);
      },
      (error) => {
        console.error('Error al iniciar el turno:', error);
      }
    );
  }

  //Función para formatear la hora en formato HH:mm
  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  //Función para verificar si el trabajador está en turno
  checkIfOnShift() {
    if (
      !this.worker ||
      !this.worker.schedules ||
      this.worker.schedules.length === 0
    ) {
      this.isOnShift.set(false);
      return;
    }

    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = this.formatTime(now);
    const currentMinutes = this.timeToMinutes(currentTime);

    for (let schedule of this.worker.schedules) {
      if (schedule.date !== currentDate) continue;

      const startMinutes = this.timeToMinutes(schedule.start);
      const endMinutes = this.timeToMinutes(schedule.end);

      const isOvernight = endMinutes < startMinutes;

      if (
        (!isOvernight &&
          currentMinutes >= startMinutes &&
          currentMinutes <= endMinutes) ||
        (isOvernight &&
          (currentMinutes >= startMinutes || currentMinutes <= endMinutes))
      ) {
        this.isOnShift.set(true);
        return;
      }
    }

    this.isOnShift.set(false);
  }

  //Función para verificar si la hora actual está dentro del rango de un turno
  isTimeInRange(currentTime: string, start: string, end: string): boolean {
    //Convertimos las horas de inicio y fin, y la hora actual en minutos desde medianoche
    const currentTimeMinutes = this.timeToMinutes(currentTime);
    const startMinutes = this.timeToMinutes(start);
    const endMinutes = this.timeToMinutes(end);

    //Comprobamos si la hora actual está entre la hora de inicio y la de fin
    return (
      currentTimeMinutes >= startMinutes && currentTimeMinutes <= endMinutes
    );
  }

  //Función auxiliar para convertir la hora en formato HH:mm a minutos desde medianoche
  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  async presentAlreadyOnShiftAlert() {
    const alert = await this.alertController.create({
      header: 'Turno activo',
      message: 'Ya estás actualmente en turno. No puedes iniciar otro.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
