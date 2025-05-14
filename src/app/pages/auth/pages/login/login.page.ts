import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../utils/form.utils';
import { IonButton, IonContent, IonItem, IonLabel, IonInput } from "@ionic/angular/standalone";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
  standalone: true,
  imports: [IonContent, IonItem, IonLabel, IonButton, IonInput, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  formUtils = FormUtils;
  router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return;
    }
    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      console.log('¿isAuthenticated?', isAuthenticated);
      if (isAuthenticated) {
        console.log('Intentando redirigir...');
        this.router.navigateByUrl('/initial');
        this.resetForm();
      } else {
        console.warn('No autenticado');
      }
    });
  }

  resetForm() {
    this.loginForm.reset();
  }
}
