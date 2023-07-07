import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medidor } from '../../interfaces/medidor.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedidoresService } from '../medidores.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { patternCI, patternDateFormat, patternSpanishInline, patternText } from 'src/app/interfaces/forms-patterns';
import { Afiliado } from 'src/app/interfaces/afiliado.interface';
import {  switchMap,map,tap} from "rxjs/operators";
@Component({
  selector: 'app-medidor-form',
  templateUrl: './medidor-form.component.html',
  styles: [
  ]
})
export class MedidorFormComponent {
  @Input()
  medidorActual?: Medidor;
  afiliadoSelected?:Afiliado;
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
    //TODO: ACTUALIZAR
    if (!this.router.url.includes('idForm')) return;
    // console.log(this.router.url.includes('id'));
    this.routerAct.queryParams
      .pipe(switchMap(({ idForm }) => this.medidoresService.findOne(idForm)))
      .subscribe(({ data }) => {
        console.log(data);
        if (data) {
          // console.log(data);
          const {afiliado,lecturas,ultimaLectura,...dataMedidor} = data;
          this.afiliadoSelected=afiliado;
          this.medidorActual=dataMedidor
          this.afiliadoForm.get('id')?.setValue({id:afiliado?.id});
          this.medidorForm.setValue({...dataMedidor,afiliado:{id:afiliado?.id}});
        }
        // console.log('form',this.roleForm.value);
      });
  }

  showTableAsignModalForm: boolean = false;
  showModalTable() {
    this.showTableAsignModalForm = true;
  }
  @Output()
  onCloseModal: EventEmitter<boolean> = new EventEmitter();

  medidorForm: FormGroup = this.fb.group({
    id: [],
    nroMedidor:[,[Validators.required,Validators.pattern(patternCI),Validators.minLength(4)]],
    fechaInstalacion:[,[Validators.required,Validators.pattern(patternDateFormat)]],
    lecturaInicial:[0,[Validators.required,Validators.min(0)]],
    ubicacionBarrio:[,[Validators.required,Validators.minLength(3),Validators.pattern(patternText)]],
    estado:[1,[Validators.min(0)]],
    marca:[,[Validators.required,Validators.pattern(patternText),Validators.minLength(1)]],
    afiliado: this.fb.group({
      id:[,[Validators.required,Validators.min(0)]]
    })
  });
  get afiliadoForm() {
    return this.medidorForm.controls['afiliado'] as FormGroup;
  }
  afiliadoSelectable(afiliado:Afiliado){
    this.afiliadoSelected=afiliado;
    this.afiliadoForm.get('id')?.setValue(afiliado.id);
    this.showTableAsignModalForm=false;
  }

  closeTableModal(view: boolean) {
    this.showTableAsignModalForm = view;
  }
  validForm() {
    this.medidorForm.markAllAsTouched();
    if (this.medidorForm.invalid) return;
    let medidorSend: Medidor = {};
    if (this.medidorActual) {
      for (const [key, value] of Object.entries(this.medidorForm.value)) {
        if (value !== this.medidorActual[key as keyof Medidor]) {
          medidorSend[key as keyof Medidor] = value as any;
        }
      }
    } else {
      medidorSend = Object.assign({}, this.medidorForm.value);
      Object.entries(medidorSend).forEach(([key, value]) => {
        if (value===null || value===undefined) delete medidorSend[key as keyof Medidor];
      });
    }
    this.registrarFormulario(medidorSend);
    // console.log('medidor send',medidorSend);
  }
  registrarFormulario(form: Medidor) {
    console.log(form);
    this.confirmationService.confirm({
      message: `¿Está seguro de ${
        this.medidorActual?.id
          ? 'actualizar este registro'
          : 'registrar este formulario'
      }?`,
      header: 'Confirmar Acción',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (this.medidorActual?.id) {
          this.medidoresService.update(this.medidorActual.id, form).subscribe({
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
              this.medidorForm.reset();
              this.router.navigate(['/medidores']);
            },
          });
        } else
          this.medidoresService.create(form).subscribe({
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
                summary: 'Ocurrió un error al registrar!!',
                detail: `Detalles del error: console`,
                life: 5000,
                icon: 'pi pi-times',
              });
              console.log(err);
            },
            complete: () => {
              this.medidorForm.reset();
              this.router.navigate(['/medidores']);
            },
          });
      },
    });
  }
  limpiarCampo(campo: string) {
    if (
      !this.medidorForm.get(campo)?.pristine &&
      this.medidorForm.get(campo)?.value?.length === 0
    ) {
      this.medidorForm.get(campo)?.reset();
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
      this.medidorForm.controls[nombre].errors &&
      this.medidorForm.controls[nombre].touched
    );
  }
  inputValid(nombre: string) {
    return this.medidorForm.controls[nombre].errors &&
      this.medidorForm.controls[nombre].touched
      ? 'ng-invalid ng-dirty'
      : '';
  }

  //MESSAGES ERRORS TYPE

  getNroMedidorErrors(campo: string) {
    const errors = this.medidorForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 4 como minimo';
    }
    return '';
  }
  getFechaInstalacionErrors(campo: string) {
    const errors = this.medidorForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'La fecha debe seguir el orden: dd/mm/yyyy';
    }
    return '';
  }
  getLecturaInicialErrors(campo: string) {
    const errors = this.medidorForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['min']) {
      return 'La Lectura minima es 0';
    } 
    return '';
  }
  getMarcaErrors(campo: string) {
    const errors = this.medidorForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 1 como minimo';
    }
    return '';
  }

  getEstadoErrors(campo: string) {
    const errors = this.medidorForm.get(campo)?.errors;
    if (errors?.['min']) {
      return 'El minimo es 0';
    }
    return '';
  }
  getUbicacionBarrioErrors(campo: string) {
    const errors = this.medidorForm.get(campo)?.errors;
    if (errors?.['required']) {
      return 'El campo es requerido';
    }else if(errors?.['minlength']){
      return 'El valor minimo es 3'
    }else if(errors?.['pattern']){
      return 'caracteres no validos'
    }
    return '';
  }
}
