import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemMenu, Menu, MenuForm } from '../../interfaces/menu.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuAdmService } from '../menu-adm.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { patternText } from 'src/app/interfaces/forms-patterns';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styles: [],
})
export class MenuFormComponent {
  @Input()
  menuActual?: Menu;
  listItemsSelected:ItemMenu[]=[];
  constructor(
    private fb: FormBuilder,
    private readonly menuService: MenuAdmService,
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
      .pipe(switchMap(({ id }) => this.menuService.findOne(id)))
      .subscribe(({ data }) => {
        console.log(data);
        if (data) {
          const {itemsMenu,...dataResto} =data;
          this.ListItemMenuSelected(data.itemsMenu || []);
          this.menuForm.setValue({...dataResto,itemsMenu:itemsMenu?.map(val=>{
            return {
              id:val.id
            }
          })});
          this.menuActual = data || {};
        }
        console.log(this.menuForm.value);
      });
  }

  showTableAsignModalForm: boolean = false;

  @Output()
  onCloseModal: EventEmitter<boolean> = new EventEmitter();

  showModalTable() {
    this.showTableAsignModalForm = true;
  }
  deleteSelection() {
    this.itemsMenuForm.clear();
    this.listItemsSelected=[];
    console.log(this.itemsMenuForm);
  }
  menuForm: FormGroup = this.fb.group({
    id: [],
    nombre: [
      ,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(patternText),
      ],
    ],
    linkMenu: [, [Validators.minLength(3)]],
    estado: [, [Validators.required]],
    itemsMenu: this.fb.array([]),
  });
  closeModal() {
    this.onCloseModal.emit(false);
    this.menuForm.reset();
  }
  closeTableModalForm(view: boolean) {
    this.showTableAsignModalForm = view;
  }
  ListItemMenuSelected(list: ItemMenu[]) {
    this.itemsMenuForm.clear();
    this.listItemsSelected=[];
    for (let item of list) {
      const itemMenu = this.fb.group({
        id: [item.id, [Validators.required]]
      });
      this.listItemsSelected.push(item);
      this.itemsMenuForm.push(itemMenu);
    }
    this.closeTableModalForm(false);
  }
  validForm() {
    this.menuForm.markAllAsTouched();
    if (this.menuForm.invalid) return;
    // console.log(this.clienteForm.value);
    let menuSend: Menu = {};
    if (this.menuActual) {
      for (const [key, value] of Object.entries(this.menuForm.value)) {
        if (value !== this.menuActual[key as keyof Menu]) {
          menuSend[key as keyof Menu] = value as any;
        }
      }
    } else {
      menuSend = Object.assign({}, this.menuForm.value);
      Object.entries(menuSend).forEach(([key, value]) => {
        if (!value) delete menuSend[key as keyof Menu];
      });
    }
    // if(this.itemsMenuForm.getRawValue().length===0)
    // menuSend.itemsMenu=undefined;
    const { itemsMenu: dataItems, ...dataSend } = menuSend;
    this.registrarFormulario({
      ...dataSend,
      itemsMenu: dataItems?.map((val) => val.id!),
    });
    // console.log(menuSend);
  }
  get itemsMenuForm() {
    return this.menuForm.controls['itemsMenu'] as FormArray;
  }

  deleteItemMenu(index: number) {
    this.itemsMenuForm.removeAt(index);
    this.listItemsSelected.splice(index,1)
  }
  registrarFormulario(form: MenuForm) {
    this.confirmationService.confirm({
      message: `¿Está seguro de ${
        this.menuActual?.id
          ? 'actualizar este registro'
          : 'registrar este formulario'
      }?`,
      header: 'Confirmar Acción',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (this.menuActual?.id) {
          this.menuService.update(this.menuActual.id, form).subscribe({
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
              this.menuForm.reset();
              this.router.navigate(['/menus']);
            },
          });
        } else
          this.menuService.create(form).subscribe({
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
              this.menuForm.reset();
              this.router.navigate(['/menus']);
            },
          });
      },
    });
  }
  limpiarCampo(campo: string) {
    if (
      !this.menuForm.get(campo)?.pristine &&
      this.menuForm.get(campo)?.value?.length === 0
    ) {
      this.menuForm.get(campo)?.reset();
    }
  }

  estados = [
    { name: 'Activo', value: 1 },
    { name: 'Inactivo', value: 0 },
  ];

  ///VALIDATORS

  campoValido(nombre: string) {
    return (
      this.menuForm.controls[nombre].errors &&
      this.menuForm.controls[nombre].touched
    );
  }
  inputValid(nombre: string) {
    return this.menuForm.controls[nombre].errors &&
      this.menuForm.controls[nombre].touched
      ? 'ng-invalid ng-dirty'
      : '';
  }

  //MESSAGES ERRORS TYPE

  getNombreErrors(campo: string) {
    const errors = this.menuForm.get(campo)?.errors;

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
    const errors = this.menuForm.get(campo)?.errors;

    if (errors?.['pattern']) {
      return 'El campo contiene caracteres invalidos';
    } else if (errors?.['minlength']) {
      return 'El tamaño del campo debe ser 3 como minimo';
    }
    return '';
  }

  getEstadoErrors(campo: string) {
    const errors = this.menuForm.get(campo)?.errors;
    if (errors?.['required']) {
      return 'El campo es requerido';
    }
    return '';
  }
}
