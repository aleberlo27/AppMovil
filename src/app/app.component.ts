import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent, IonHeader } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [ IonContent, IonApp, IonRouterOutlet, FormsModule],
})
export class AppComponent {
  constructor() {}
}
