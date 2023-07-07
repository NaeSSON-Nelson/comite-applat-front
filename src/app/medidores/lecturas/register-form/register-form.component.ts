import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LecturaMedidor, Medidor } from 'src/app/interfaces/medidor.interface';
import { MedidoresService } from '../../medidores.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { patternText } from 'src/app/interfaces/forms-patterns';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styles: [],
})
export class RegisterFormComponent {
  @Input()
  lecturaActual?: LecturaMedidor;
  MedidorSeleccionado?:Medidor;
  constructor(
    private fb: FormBuilder,
    private readonly medidoresService: MedidoresService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private routerAct: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // if(this.clienteModificar?.id){
    //   this.proveedorForm.setValue(this.clienteModificar);
    // }
    // this.routerAct.paramMap.subscribe((params)=>{
    //   console.log(params);
    // })
    //TODO: IMPLEMENTAR UPDATE
    // if(!this.router.url.includes('id')) return;
    // this.routerAct.queryParams
    //     .pipe(
    //       switchMap(({id})=> this.afiliadoService.findOne(id))
    //     ).subscribe( ({data})=> {
    //       this.afiliadoForm.setValue(data || {});
    //       this.afiliadoActual=data ||{};
    //       console.log(this.afiliadoForm.value);
    //     })
  }

  lecturaForm: FormGroup = this.fb.group({
    id: [],
    lectura: [, [Validators.required, Validators.min(1)]],
    estadoMedidor: [, [Validators.pattern(patternText)]],
    estado: [1, [Validators.required]],
    medidor: this.fb.group({
      id:[,[Validators.required,Validators.min(1)]]
    }),
  });
  get medidorForm() {
    return this.lecturaForm.controls['medidor'] as FormGroup;
  }
  validForm() {
    this.lecturaForm.markAllAsTouched();
    if (this.lecturaForm.invalid) return;
    // console.log(this.clienteForm.value);
    let lecturaSend: LecturaMedidor = {};
    if (this.lecturaActual) {
      for (const [key, value] of Object.entries(this.lecturaForm.value)) {
        if (value !== this.lecturaActual[key as keyof LecturaMedidor]) {
          lecturaSend[key as keyof LecturaMedidor] = value as any;
        }
      }
    } else {
      lecturaSend = Object.assign({}, this.lecturaForm.value);
      Object.entries(lecturaSend).forEach(([key, value]) => {
        if (value===null || value===undefined) delete lecturaSend[key as keyof LecturaMedidor];
      });
    }
    this.registrarFormulario(lecturaSend);
    // console.log(this.lecturaForm.value);
    // console.log(lecturaSend);
  }
  registrarFormulario(lecturaForm: LecturaMedidor) {
    this.confirmationService.confirm({
      message: `¿Está seguro de ${
        this.lecturaActual?.id
          ? 'actualizar este registro'
          : 'registrar este formulario'
      }?`,
      header: 'Confirmar Acción',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (this.lecturaActual?.id) {
          this.medidoresService
            .updateLecturaMedidor(this.lecturaActual.id, lecturaForm)
            .subscribe({
              next: (res) => {
                this.messageService.add({
                  severity: 'info',
                  summary: 'Se cambio con exito!',
                  detail: `${res.msg}`,
                  icon: 'pi pi-check',
                });
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Ocurrió un error al modificar el Empleado!!',
                  detail: `Detalles del error: ???console`,
                  life: 5000,
                  icon: 'pi pi-times',
                });
                console.log(err);
              },
              complete: () => {
                console.log('actualizacion completada');
                this.lecturaForm.reset();
                this.router.navigate(['/medidores']);
              },
            });
        } else
          this.medidoresService.registerLectura(lecturaForm).subscribe({
            next: (res) => {
              console.log(res);
              this.messageService.add({
                severity: 'success',
                summary: 'Registro Exitoso!',
                detail: res.msg,
                icon: 'pi pi-check',
              });
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Ocurrió un error al registrar el Empleado!!',
                detail: `Detalles del error: console`,
                life: 5000,
                icon: 'pi pi-times',
              });
              console.log(err);
            },
            complete: () => {
              this.lecturaForm.reset();
              this.router.navigate(['/medidores']);
            },
          });
      },
    });
  }
  
  showModalForm: boolean=false;
  openModalTable(){
    this.showModalForm=true;
  }
  closeModal(event:any){
    // console.log(event);
    this.showModalForm=event;
  }
  dataSelected(data:Medidor){
    this.MedidorSeleccionado=data;
    this.showModalForm=false;
    this.medidorForm.get('id')?.setValue(data.id)
  }
  limpiarCampo(campo: string) {
    if (
      !this.lecturaForm.get(campo)?.pristine &&
      this.lecturaForm.get(campo)?.value?.length === 0
    ) {
      this.lecturaForm.get(campo)?.reset();
    }
  }

  estados = [
    { name: 'Activo', value: 1 },
    { name: 'Inactivo', value: 0 },
  ];

  ///VALIDATORS

  campoValido(nombre: string) {
    return (
      this.lecturaForm.controls[nombre].errors &&
      this.lecturaForm.controls[nombre].touched
    );
  }
  inputValid(nombre: string) {
    return this.lecturaForm.controls[nombre].errors &&
      this.lecturaForm.controls[nombre].touched
      ? 'ng-invalid ng-dirty'
      : '';
  }

  //MESSAGES ERRORS TYPE

  getLecturaErrors(campo: string) {
    const errors = this.lecturaForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['min']) {
      return 'El valor minimo 1';
    } 
    return '';
  }
  getEstadoMedidorErrors(campo:string){
    const errors = this.lecturaForm.get(campo)?.errors;

    if(errors?.['pattern']){
      return 'patron invalido'
    }
    return '';
  }
  getEstadoErrors(campo: string) {
    const errors = this.lecturaForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    }
    return '';
  }

  getMedidorErrors(){
    const errors = this.medidorForm.get('id')?.errors;
    if(errors?.['required']){
      return'Se requiere asignar un medidor'
    }else if(errors?.['min']){
      return 'El valor es invalido'
    }
    return ''
  }
}
