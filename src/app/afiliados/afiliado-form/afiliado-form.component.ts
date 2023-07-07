import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {switchMap} from 'rxjs/operators'
import {
  patternSpanishInline,
  patternCI,
  patternText,
  patternDateFormat,
} from '../../interfaces/forms-patterns';
import { Afiliado } from '../../interfaces/afiliado.interface';
import { AfiliadosService } from '../afiliados.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-afiliado-form',
  templateUrl: './afiliado-form.component.html',
  styles: [],
})
export class AfiliadoFormComponent {
  @Input()
  afiliadoActual?: Afiliado;

  generos = [
    { name: 'MASCULINO', value: 'masculino' },
    { name: 'FEMENINO', value: 'femenino' },
  ];
  constructor(private fb: FormBuilder,
    private readonly afiliadoService:AfiliadosService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private router:Router,
    private routerAct:ActivatedRoute
    ) {}

  ngOnInit(): void {
    // if(this.clienteModificar?.id){
    //   this.proveedorForm.setValue(this.clienteModificar);
    // }
    // this.routerAct.paramMap.subscribe((params)=>{
    //   console.log(params);
    // })
    if(!this.router.url.includes('id')) return;

    this.routerAct.queryParams
        .pipe(
          switchMap(({id})=> this.afiliadoService.findOne(id))
        ).subscribe( ({data})=> {
          this.afiliadoForm.setValue(data || {});
          this.afiliadoActual=data ||{};
          console.log(this.afiliadoForm.value);
        })

  }

  @Input()
  showModalForm!: boolean;
  @Output()
  onCloseModal: EventEmitter<boolean> = new EventEmitter();

  afiliadoForm: FormGroup = this.fb.group({
    id: [],
    nombrePrimero: [,[Validators.required,Validators.minLength(3),Validators.pattern(patternSpanishInline)]],
    nombreSegundo: [,[Validators.minLength(3), Validators.pattern(patternSpanishInline)]],
    apellidoPrimero: [,[Validators.required,Validators.minLength(3),Validators.pattern(patternSpanishInline)],],
    apellidoSegundo: [,[Validators.minLength(3), Validators.pattern(patternSpanishInline)]],
    CI: [,[Validators.required,Validators.minLength(6),Validators.pattern(patternCI)]],
    profesion: [, [Validators.minLength(3), Validators.pattern(patternText)]],
    genero: [, [Validators.required, Validators.pattern(patternText)]],
    barrio: [, [Validators.required, Validators.pattern(patternText)]],
    fechaNacimiento: [,[Validators.required, Validators.pattern(patternDateFormat)]],
    estado: [, [Validators.required]],
  });
  closeModal() {
    this.onCloseModal.emit(false);
    this.afiliadoForm.reset();
  }

  @Output()
  sendAfiliadoForm: EventEmitter<Afiliado> = new EventEmitter();

  validForm() {
    this.afiliadoForm.markAllAsTouched();
    if (this.afiliadoForm.invalid) return;
    // console.log(this.clienteForm.value);
    let afiliadoSend: Afiliado={}; 
    if(this.afiliadoActual){
      for(const [key,value ] of Object.entries(this.afiliadoForm.value)){
        if(value!==this.afiliadoActual[key as keyof Afiliado]){
          afiliadoSend[key as keyof Afiliado] = value as any;
        }
      }
    }else{
      afiliadoSend=Object.assign({}, this.afiliadoForm.value);
      Object.entries(afiliadoSend).forEach(([key, value]) => {
        if (!value) delete afiliadoSend[key as keyof Afiliado];
      });
    }
    // this.registrarFormulario(afiliadoSend);
    console.log(afiliadoSend);
  }
  registrarFormulario(afiliadoForm:Afiliado){
    this.confirmationService.confirm({
      message: `¿Está seguro de ${this.afiliadoActual?.id  ? 'actualizar este registro':'registrar este formulario'}?`,
          header: 'Confirmar Acción',
          icon: 'pi pi-info-circle',
          accept:()=>{
            if(this.afiliadoActual?.id){

              this.afiliadoService.updateAfiliado(this.afiliadoActual.id,afiliadoForm).subscribe({
                next:(res)=>{

                  this.messageService.add({severity:'info',summary:'Se cambio con exito!', detail:`${res.msg}`,icon:'pi pi-check'})
                },
                error:err=>{
                  this.messageService.add({severity:'error',summary:'Ocurrió un error al modificar el Empleado!!', detail:`Detalles del error: ???console`,life:5000, icon:'pi pi-times'})
                  console.log(err);
                },
                complete:()=>{
                  console.log('actualizacion completada');
                  this.afiliadoForm.reset();
                this.router.navigate(['/afiliados']);
              }
            });
          }
            else
            this.afiliadoService.create(afiliadoForm).subscribe({
              next: res=>{
                console.log(res);            
                this.messageService.add({severity:'success',summary:'Registro Exitoso!', detail:res.msg,icon:'pi pi-check'})
              },
              error: err=>{
                this.messageService.add({severity:'error',summary:'Ocurrió un error al registrar el Empleado!!', detail:`Detalles del error: console`,life:5000, icon:'pi pi-times'})
                console.log(err);
              },
              complete:()=>{
                this.afiliadoForm.reset();
                this.router.navigate(['/afiliados']);
              }
            })
          }
    })
  }
  limpiarCampo(campo: string) {
    if (
      !this.afiliadoForm.get(campo)?.pristine &&
      this.afiliadoForm.get(campo)?.value?.length === 0
    ) {
      this.afiliadoForm.get(campo)?.reset();
    }
  }

  estados = [
    { name: 'Activo', value: 1 },
    { name: 'Inactivo', value: 0 },
  ];
  barrios = [
    { name: '20 de marzo', value: '20 de marzo' },
    { name: 'San Antonio', value: 'san antonio' },
    { name: 'Mendez Fortaleza', value: 'mendez fortaleza' },
    { name: 'Verde Olivo', value: 'verde olivo' },
    { name: 'Primavera', value: 'primavera' },
  ];
  ///VALIDATORS

  campoValido(nombre: string) {
    return (
      this.afiliadoForm.controls[nombre].errors &&
      this.afiliadoForm.controls[nombre].touched
    );
  }
  inputValid(nombre: string) {
    return this.afiliadoForm.controls[nombre].errors &&
      this.afiliadoForm.controls[nombre].touched
      ? 'ng-invalid ng-dirty'
      : '';
  }

  //MESSAGES ERRORS TYPE

  getNombrePrimeroErrors(campo: string) {
    const errors = this.afiliadoForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 2 como minimo';
    }
    return '';
  }

  getNombreSegundoErrors(campo: string) {
    const errors = this.afiliadoForm.get(campo)?.errors;

    if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 3 como minimo';
    }
    return '';
  }
  getPrimerApellidoErrors(campo: string) {
    const errors = this.afiliadoForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 2 como minimo';
    }
    return '';
  }
  getSegundoApellidoErrors(campo: string) {
    const errors = this.afiliadoForm.get(campo)?.errors;

    if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 3 como minimo';
    }
    return '';
  }

  getCiErrors(campo: string) {
    const errors = this.afiliadoForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 6 como minimo';
    }
    return '';
  }

  getFechaNacimientoErrors(campo: string) {
    const errors = this.afiliadoForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El formato debe fecha debe seguri el patron: dd/mm/yyyy';
    }
    return '';
  }
  getProfesionErrors(campo: string) {
    const errors = this.afiliadoForm.get(campo)?.errors;
    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño minimo debe ser 3';
    }
    return '';
  }
  getBarrioErrors(campo:string){
    const errors = this.afiliadoForm.get(campo)?.errors;
    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    }
    return '';
  }
  getGeneroErrors(campo: string) {
    const errors = this.afiliadoForm.get(campo)?.errors;
    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    }
    return '';
  }
  getEstadoErrors(campo: string) {
    const errors = this.afiliadoForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    }
    return '';
  }
}
