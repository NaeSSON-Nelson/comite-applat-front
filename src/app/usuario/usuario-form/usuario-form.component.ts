import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario, UsuarioForm } from '../../interfaces/usuario.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Role } from '../../interfaces/role.interface';
import { Afiliado } from '../../interfaces/afiliado.interface';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styles: [
  ]
})
export class UsuarioFormComponent {
  @Input()
  usuarioActual?: Usuario;
  afiliadoSelected?:Afiliado;
  listRolesSelected:Role[]=[];
  constructor(
    private fb: FormBuilder,
    private readonly usuarioService: UsuarioService,
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
    if (!this.router.url.includes('id')) return;

    this.routerAct.queryParams
      .pipe(switchMap(({ id }) => this.usuarioService.findOne(id)))
      .subscribe(({ data }) => {
        console.log(data);
        if (data) {
          // console.log(data);
          const {password,roles,estado,perfil,afiliado,...dataRest}=data;
          this.ListItemMenuSelected(data.roles || []);
          this.afiliadoForm.setValue({id:afiliado?.id})
          this.usuarioForm.setValue({...dataRest,afiliado:{id:afiliado?.id},roles:roles?.map(val=>{ return {id:val.id}})});
          this.usuarioActual = data || {};
        }
        // console.log('form',this.roleForm.value);
      });
  }

  showTableAsignAfiliadoModalForm: boolean = false;
  showModalTableAfiliados() {
    this.showTableAsignAfiliadoModalForm = true;
  }
  showTableAsignRoleModalForm: boolean = false;
  showModalTableRoles() {
    this.showTableAsignRoleModalForm = true;
  }
  @Output()
  onCloseModal: EventEmitter<boolean> = new EventEmitter();

  usuarioForm: FormGroup = this.fb.group({
    id: [],
    userName:[],
    afiliado: this.fb.group({
      id:[,Validators.required]
    }),
    roles:  this.fb.array([],[Validators.required])
  });
  get rolesForm() {
    return this.usuarioForm.controls['roles'] as FormArray;
  }
  get afiliadoForm(){
    return this.usuarioForm.get('afiliado') as FormGroup
  }

  ListItemMenuSelected(list: Role[]) {
    this.rolesForm.clear();
    this.listRolesSelected=[];
    for (let item of list) {
      // console.log(item);
      const itemForm = this.fb.group({
        id: [item.id, [Validators.required]]
      });
      this.listRolesSelected.push(item);
      this.rolesForm.push(itemForm);
    }
    this.closeTableRoleModalForm(false);
  }
  afiliadoSelectable(afiliado:Afiliado){
    this.afiliadoSelected=afiliado;
    this.afiliadoForm.get('id')?.setValue(this.afiliadoSelected.id);
    // this.closeTableAfiliadoModalForm(false);
    this.showTableAsignAfiliadoModalForm=false;
  }
  deleteItemMenu(index: number) {
    this.rolesForm.removeAt(index);
    this.listRolesSelected.splice(index,1);
  }
  deleteSelection() {
    this.rolesForm.clear();
    this.listRolesSelected=[];
  }
  closeTableRoleModalForm(view: boolean) {
    this.showTableAsignRoleModalForm = view;
  }
  closeTableAfiliadoModalForm(view: boolean) {
    this.showTableAsignRoleModalForm = view;
  }
  validForm() {
    this.usuarioForm.markAllAsTouched();
    if (this.usuarioForm.invalid) return;
    // console.log(this.clienteForm.value);
    let usuarioSend: Usuario = {};
    if (this.usuarioActual) {
      for (const [key, value] of Object.entries(this.usuarioForm.value)) {
        if (value !== this.usuarioActual[key as keyof Usuario]) {
          usuarioSend[key as keyof Usuario] = value as any;
        }
      }
    } else {
      usuarioSend = Object.assign({}, this.usuarioForm.value);
      Object.entries(usuarioSend).forEach(([key, value]) => {
        if (!value) delete usuarioSend[key as keyof Usuario];
      });
    }
    const { roles: dataroles, ...dataSend } = usuarioSend;
    this.registrarFormulario({
      ...dataSend,
      roles: dataroles?.map((val) => val.id!),
    });
  }
  registrarFormulario(form: UsuarioForm) {
    this.confirmationService.confirm({
      message: `¿Está seguro de ${
        this.usuarioActual?.id
          ? 'actualizar este registro'
          : 'registrar este formulario'
      }?`,
      header: 'Confirmar Acción',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (this.usuarioActual?.id) {
          this.usuarioService.update(this.usuarioActual.id, form).subscribe({
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
              this.usuarioForm.reset();
              this.router.navigate(['/usuarios']);
            },
          });
        } else
          this.usuarioService.create(form).subscribe({
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
              this.usuarioForm.reset();
              this.router.navigate(['/usuarios']);
            },
          });
      },
    });
  }
  limpiarCampo(campo: string) {
    if (
      !this.usuarioForm.get(campo)?.pristine &&
      this.usuarioForm.get(campo)?.value?.length === 0
    ) {
      this.usuarioForm.get(campo)?.reset();
    }
  }

  estados = [
    { name: 'Activo', value: 1 },
    { name: 'Inactivo', value: 0 },
  ];

  ///VALIDATORS

  campoValido(nombre: string) {
    return (
      this.usuarioForm.controls[nombre].errors &&
      this.usuarioForm.controls[nombre].touched
    );
  }
  inputValid(nombre: string) {
    return this.usuarioForm.controls[nombre].errors &&
      this.usuarioForm.controls[nombre].touched
      ? 'ng-invalid ng-dirty'
      : '';
  }

  //MESSAGES ERRORS TYPE

  getAfiliadoErrors(campo: string) {
    const errors = this.usuarioForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 2 como minimo';
    }
    return '';
  }

  getRolesErrors(campo: string) {
    const errors = this.usuarioForm.get(campo)?.errors;
    if (errors?.['required']) {
      return 'El campo es requerido';
    }
    return '';
  }
}
