import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IonContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonCard, IonButton, IonList, IonItem, IonToggle, IonPopover } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [IonPopover, IonPopover, IonCardSubtitle, IonCardHeader, IonContent, IonCardTitle, IonCardContent, IonCard, IonButton, FormsModule],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css',
})
export class InitialComponent {
  paletteToggle = false;
  user: any;

  @ViewChild('popover') popover!: HTMLIonPopoverElement;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  ngOnInit() {
    /* this.initDarkMode(); */
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

  /* DARK MODE INTENTO */
/*
  toggleChange(event: any) {
    this.toggleDarkPalette(event.detail.checked);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  initDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  } */
}

