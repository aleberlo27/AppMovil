import { ValidationErrors } from "@angular/forms"

export class FormUtils{

  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  private static getTextErrorEmail(errors: ValidationErrors){
    for(const key of Object.keys(errors)){
      switch(key){
        case 'emailTaken':
          return 'Email ya está cogido.'
        case 'pattern':
          if( errors['pattern'].requiredPattern == this.emailPattern){
            return 'El patrón de correo electrónico no es válido.'
          }
          return 'Error de patrón contra expresión regular (email).'
        case 'required':
          return 'Este campo es requerido.'
      }
    }
    return `Error no controlado.`
  }
}
