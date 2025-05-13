import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from "./pages/register/register.page";
import { LoginPage } from "./pages/login/login.page";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.css'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule, RegisterComponent, LoginPage, RouterLink, RouterLinkActive]
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit() {
  }

  showRegisterForm = true; // true = mostrar Register, false = mostrar login

  showSignUp() {
    this.showRegisterForm = true;
  }

  showLogin() {
    this.showRegisterForm = false;
  }
}
