import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patternSpanishInline, patternText } from 'src/app/interfaces/forms-patterns';
import { AuthService } from '../auth.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private messageService:MessageService,
    ){

  }

  loginForm:FormGroup=this.fb.group({
    userName:[,[Validators.required,Validators.minLength(3),Validators.pattern(patternSpanishInline)],],
    password:[,[Validators.required,Validators.minLength(6),Validators.pattern(patternText)],],
  })
  validForm(){
    // console.log(this.loginForm.value);
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) return;
    this.signUp(this.loginForm.value);
  }
  signUp(form:Usuario){
    this.authService.login(form).subscribe(res=>{
      if(res)
      this.messageService.add({severity:'success',summary:'Logueado con exito', detail:`Bienvenido`,icon:'pi pi-check', life:2000})
      else this.messageService.add({severity:'warn',summary:'Credenciales incorrectas', detail:`No se pudo loguear con los datos enviados`,icon:'pi pi-check', life:3000})
    }
      
      
      
    )
  }
  limpiarCampo(campo: string) {
    if (
      !this.loginForm.get(campo)?.pristine &&
      this.loginForm.get(campo)?.value?.length === 0
    ) {
      this.loginForm.get(campo)?.reset();
    }
  }
  campoValido(nombre: string) {
    return (
      this.loginForm.controls[nombre].errors &&
      this.loginForm.controls[nombre].touched
    );
  }
  inputValid(nombre: string) {
    return this.loginForm.controls[nombre].errors &&
      this.loginForm.controls[nombre].touched
      ? 'ng-invalid ng-dirty'
      : '';
  }
  getUsernameErrors(campo:string){
    const errors = this.loginForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 3 como minimo';
    }
    return '';
  }
  getPasswordErrors(campo:string){
    const errors = this.loginForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 3 como minimo';
    }
    return '';
  }
}
