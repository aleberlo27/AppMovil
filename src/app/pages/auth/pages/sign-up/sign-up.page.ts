import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../utils/form.utils';
import { IonFab, IonFabButton, IonIcon } from "@ionic/angular/standalone";
import { AlertErrorComponent } from "../../components/alert-error/alert-error.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AlertErrorComponent]
})
export class SignUpPage {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  formUtils = FormUtils;
  router = inject(Router)

  hasError = signal(false)
  isPosting = signal(false)

  loginForm = this.fb.group({
    email: ['', [Validators.required,  Validators.pattern(FormUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(){
    if(this.loginForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return;
    }
    const {email='', password=''} = this.loginForm.value;
    console.log(email, password);

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if(isAuthenticated){
        this.router.navigateByUrl('initial')
      }
    });
  }

}
