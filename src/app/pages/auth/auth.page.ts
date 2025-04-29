import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from "./pages/register/register.page";
import { SignUpPage } from "./pages/sign-up/sign-up.page";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RegisterComponent, SignUpPage]
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit() {
  }

  isRegisterActive = true; // true = mostrar Register, false = mostrar login

  showSignUp() {
    this.isRegisterActive = false;
  }

  showLogin() {
    this.isRegisterActive = true;
  }
}
