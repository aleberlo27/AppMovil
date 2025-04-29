import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormUtils } from '../../utils/form.utils';
import { AlertErrorComponent } from "../../components/alert-error/alert-error.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  formUtils = FormUtils;

  hasError = signal(false);

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    companyCode: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  onSubmit() {
    if(this.registerForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return;
    }

    const formValue = this.registerForm.value;

    // Verificar coincidencia de contraseñas
    if (formValue.password !== formValue.confirmPassword) {
      console.log("Contraseñas no coinciden");
      return;
    }

    this.authService.checkCompanyCode(formValue.companyCode ?? '').subscribe(exists => {
      console.log("Resultado de checkCompanyCode:", exists);
      if (!exists) {
        console.log("El código de empresa no es válido"); // Reemplazable por un mensaje visual
        return;
      }
      console.log("Código válido, procediendo al registro...");

      // Si existe, proceder con el registro
      this.authService.register(
        formValue.firstName ?? '',
        formValue.lastName ?? '',
        formValue.email ?? '',
        formValue.password ?? '',
        formValue.companyCode ?? ''
      ).subscribe(success => {
        if (success) {
          console.log("Registro exitoso");
        } else {
          console.log("Fallo en el registro");
        }
      });
    });
  }
}
