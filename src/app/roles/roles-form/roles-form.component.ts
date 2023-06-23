import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Role, RoleForm } from '../../interfaces/role.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../roles.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { patternText } from '../../interfaces/forms-patterns';
import { Menu } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styles: [],
})
export class RolesFormComponent {
  @Input()
  roleActual?: Role;
  listMenuSelected: Menu[] = [];
  constructor(
    private fb: FormBuilder,
    private readonly roleService: RolesService,
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
      .pipe(switchMap(({ id }) => this.roleService.findOne(id)))
      .subscribe(({ data }) => {
        console.log(data);
        if (data) {
          // console.log(data);
          const { menus, ...dataResto } = data;
          this.ListItemMenuSelected(data.menus || []);
          this.roleForm.setValue({
            ...dataResto,
            menus: menus?.map((val) => {
              return {
                id: val.id,
              };
            }),
          });
          this.roleActual = data || {};
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

  roleForm: FormGroup = this.fb.group({
    id: [],
    nombre: [
      ,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(patternText),
      ],
    ],
    estado: [, [Validators.required]],
    menus: this.fb.array([]),
  });
  get MenuForm() {
    return this.roleForm.controls['menus'] as FormArray;
  }

  ListItemMenuSelected(list: Menu[]) {
    this.MenuForm.clear();
    this.listMenuSelected = [];
    for (let item of list) {
      // console.log(item);
      const itemForm = this.fb.group({
        id: [item.id, [Validators.required]],
      });
      this.listMenuSelected.push(item);
      this.MenuForm.push(itemForm);
    }
    this.closeTableModalForm(false);
  }
  deleteItemMenu(index: number) {
    this.MenuForm.removeAt(index);
    this.listMenuSelected.splice(index, 1);
  }
  deleteSelection() {
    this.MenuForm.clear();
    this.listMenuSelected = [];
  }
  closeTableModalForm(view: boolean) {
    this.showTableAsignModalForm = view;
  }
  validForm() {
    this.roleForm.markAllAsTouched();
    if (this.roleForm.invalid) return;
    // console.log(this.clienteForm.value);
    let roleSend: Role = {};
    if (this.roleActual) {
      for (const [key, value] of Object.entries(this.roleForm.value)) {
        if (value !== this.roleActual[key as keyof Role]) {
          roleSend[key as keyof Role] = value as any;
        }
      }
    } else {
      roleSend = Object.assign({}, this.roleForm.value);
      Object.entries(roleSend).forEach(([key, value]) => {
        if (!value) delete roleSend[key as keyof Role];
      });
    }
    const { menus: dataMenu, ...dataSend } = roleSend;
    this.registrarFormulario({
      ...dataSend,
      menus: dataMenu?.map((val) => val.id!),
    });
    console.log(roleSend);
  }
  registrarFormulario(form: RoleForm) {
    this.confirmationService.confirm({
      message: `¿Está seguro de ${
        this.roleActual?.id
          ? 'actualizar este registro'
          : 'registrar este formulario'
      }?`,
      header: 'Confirmar Acción',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (this.roleActual?.id) {
          this.roleService.update(this.roleActual.id, form).subscribe({
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
              this.roleForm.reset();
              this.router.navigate(['/roles']);
            },
          });
        } else
          this.roleService.create(form).subscribe({
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
              this.roleForm.reset();
              this.router.navigate(['/roles']);
            },
          });
      },
    });
  }
  limpiarCampo(campo: string) {
    if (
      !this.roleForm.get(campo)?.pristine &&
      this.roleForm.get(campo)?.value?.length === 0
    ) {
      this.roleForm.get(campo)?.reset();
    }
  }

  estados = [
    { name: 'Activo', value: 1 },
    { name: 'Inactivo', value: 0 },
  ];

  ///VALIDATORS

  campoValido(nombre: string) {
    return (
      this.roleForm.controls[nombre].errors &&
      this.roleForm.controls[nombre].touched
    );
  }
  inputValid(nombre: string) {
    return this.roleForm.controls[nombre].errors &&
      this.roleForm.controls[nombre].touched
      ? 'ng-invalid ng-dirty'
      : '';
  }

  //MESSAGES ERRORS TYPE

  getNombreErrors(campo: string) {
    const errors = this.roleForm.get(campo)?.errors;

    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 2 como minimo';
    }
    return '';
  }

  getEstadoErrors(campo: string) {
    const errors = this.roleForm.get(campo)?.errors;
    if (errors?.['required']) {
      return 'El campo es requerido';
    }
    return '';
  }
}
