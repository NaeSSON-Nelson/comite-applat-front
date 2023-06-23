import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemMenu } from '../../interfaces/menu.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuAdmService } from '../menu-adm.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { patternText } from '../../interfaces/forms-patterns';

@Component({
  selector: 'app-item-menu-form',
  templateUrl: './item-menu-form.component.html',
  styles: [
  ]
})
export class ItemMenuFormComponent {
  @Input()
  ItemMenuActual?: ItemMenu;

  constructor(private fb: FormBuilder,
    private readonly menuService:MenuAdmService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    // private router:Router,
    // private routerAct:ActivatedRoute
    ) {}

  ngOnInit(): void {
    // if(this.clienteModificar?.id){
    //   this.proveedorForm.setValue(this.clienteModificar);
    // }
    // this.routerAct.paramMap.subscribe((params)=>{
    //   console.log(params);
    // })
    if(this.ItemMenuActual){
      this.itemMenuForm.setValue(this.ItemMenuActual);
    }

  }

  @Input()
  showModalForm!: boolean;
  @Output()
  onCloseModal: EventEmitter<boolean> = new EventEmitter();

  itemMenuForm: FormGroup = this.fb.group({
    id: [],
    nombre: [,[Validators.required,Validators.minLength(3),Validators.pattern(patternText)]],
    linkMenu: [,[Validators.minLength(3)]],
    estado: [, [Validators.required]],
  });
  closeModal() {
    this.onCloseModal.emit(false);
    this.itemMenuForm.reset();
    this.ItemMenuActual=undefined;
  }

  validForm() {
    this.itemMenuForm.markAllAsTouched();
    if (this.itemMenuForm.invalid) return;
    // console.log(this.clienteForm.value);
    let itemMenuSend: ItemMenu={}; 
    if(this.ItemMenuActual){
      for(const [key,value ] of Object.entries(this.itemMenuForm.value)){
        if(value!==this.ItemMenuActual[key as keyof ItemMenu]){
          itemMenuSend[key as keyof ItemMenu] = value as any;
        }
      }
    }else{
      itemMenuSend=Object.assign({}, this.itemMenuForm.value);
      Object.entries(itemMenuSend).forEach(([key, value]) => {
        if (!value) delete itemMenuSend[key as keyof ItemMenu];
      });
    }
    this.registrarFormulario(itemMenuSend);
  }
  registrarFormulario(form:ItemMenu){
    this.confirmationService.confirm({
      message: `¿Está seguro de ${this.ItemMenuActual?.id  ? 'actualizar este registro':'registrar este formulario'}?`,
          header: 'Confirmar Acción',
          icon: 'pi pi-info-circle',
          accept:()=>{
            if(this.ItemMenuActual?.id){

              this.menuService.updateItemMenu(this.ItemMenuActual.id,form).subscribe({
                next:(res)=>{

                  this.messageService.add({severity:'info',summary:'Se cambio con exito!', detail:`${res.msg}`,icon:'pi pi-check'})
                },
                error:err=>{
                  this.messageService.add({severity:'error',summary:'Ocurrió un error al modificar el Empleado!!', detail:`Detalles del error: ???console`,life:5000, icon:'pi pi-times'})
                  console.log(err);
                },
                complete:()=>{
                  console.log('actualizacion completada');
                  this.itemMenuForm.reset();
                  this.showModalForm=false;
              }
            });
          }
            else
            this.menuService.createItemMenu(form).subscribe({
              next: res=>{
                console.log(res);            
                this.messageService.add({severity:'success',summary:'Registro Exitoso!', detail:res.msg,icon:'pi pi-check'})
              },
              error: err=>{
                this.messageService.add({severity:'error',summary:'Ocurrió un error al registrar el Empleado!!', detail:`Detalles del error: console`,life:5000, icon:'pi pi-times'})
                console.log(err);
              },
              complete:()=>{
                this.itemMenuForm.reset();
                this.showModalForm=false;
              }
            })
          }
    })
  }
  limpiarCampo(campo: string) {
    if (
      !this.itemMenuForm.get(campo)?.pristine &&
      this.itemMenuForm.get(campo)?.value?.length === 0
    ) {
      this.itemMenuForm.get(campo)?.reset();
    }
  }

  estados = [
    { name: 'Activo', value: 1 },
    { name: 'Inactivo', value: 0 },
  ];

  ///VALIDATORS

  campoValido(nombre: string) {
    return (
      this.itemMenuForm.controls[nombre].errors &&
      this.itemMenuForm.controls[nombre].touched
    );
  }
  inputValid(nombre: string) {
    return this.itemMenuForm.controls[nombre].errors &&
      this.itemMenuForm.controls[nombre].touched
      ? 'ng-invalid ng-dirty'
      : '';
  }

  //MESSAGES ERRORS TYPE

  getNombreErrors(campo: string) {
    const errors = this.itemMenuForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 2 como minimo';
    }
    return '';
  }

  getLinkMenuErrors(campo: string) {
    const errors = this.itemMenuForm.get(campo)?.errors;

    if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 3 como minimo';
    }
    return '';
  }

  getEstadoErrors(campo: string) {
    const errors = this.itemMenuForm.get(campo)?.errors;
    if (errors?.['required']) {
      return 'El campo es requerido';
    }
    return '';
  }
}
