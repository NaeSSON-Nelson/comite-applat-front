import { Component } from '@angular/core';
import { ItemMenu } from '../../interfaces/menu.interface';
import { MenuAdmService } from '../menu-adm.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditData } from '../../interfaces/edit.interface';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styles: [
  ]
})
export class ItemMenuComponent {
  itemsMenu: ItemMenu[] = [];

  itemMenuSelected?:ItemMenu;

  detallesModal:boolean=false;
  modalForm:boolean=false;
  constructor(
    private menuAdmService: MenuAdmService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    // private router:Router
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.findAll();
  }

  findAll() {
    this.menuAdmService.findAllItemsMenu().subscribe({
      next: ({data}) => {
        this.itemsMenu = data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrió un error al Obtener los registros',
          detail: `Detalles del error: ${err}`,
          life: 5000,
          icon: 'pi pi-times',
        });
      },
      complete: () => {
        console.log(this.itemsMenu);
      },
    });
  }
  detailview(id:number){
    this.menuAdmService.findOneItemMenu(id).subscribe({
      next:({data})=>{
        this.itemMenuSelected=data;
      },
      error:err=>{
        console.log(err);
      },
      complete:()=>{
        this.detallesModal=true;
      }
    })
  }
  cerrarDetallesModal(modalStatus:boolean){
    this.detallesModal=modalStatus;
    this.itemMenuSelected=undefined;
  }
  registrarForm(){
    // this.router.navigate(['/menus/form'])
    this.modalForm=true;
  }

  recibirOperation(data: EditData) {
    if (data.type === 'MODIFICAR') {
      // this.router.navigate(['/menus/form'], {
      //   queryParams: {
      //     id: data.id,
      //   },
      // });
      this.modalForm=true;
    } else {
      this.confirmationService.confirm({
        message: `¿Está seguro de ${
          data.type === 'HABILITAR'
            ? 'habilitar este registro'
            : data.type === 'DESHABILITAR'
            ? 'deshabilitar este registro'
            : 'ESCOJIO UNA OPCION INVALIDA'
        }?`,
        header: 'Confirmar Acción',
        icon: 'pi pi-info-circle',
        accept: () => {
          if (data.type === 'HABILITAR') {
            this.menuAdmService
              .updateItemMenuStatus(data.id, { estado: 1 })
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
                  console.log(err);
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Ocurrió un error!!',
                    detail: `Detalles del error: ???console`,
                    life: 5000,
                    icon: 'pi pi-times',
                  });
                },
                complete: () => {
                  console.log('exito');
                  this.detailview(data.id);

                  this.findAll();
                },
              });
          } else if (data.type === 'DESHABILITAR') {
            this.menuAdmService
              .updateItemMenuStatus(data.id, { estado: 0 })
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
                  console.log(err);
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Ocurrió un error al modificar el Empleado!!',
                    detail: `Detalles del error: ???console`,
                    life: 5000,
                    icon: 'pi pi-times',
                  });
                },
                complete: () => {
                  console.log('exito');

                  this.findAll();
                },
              });
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Se eligio una opcion no disponible',
              detail: `La opcion ${data.type} no existe`,
              icon: 'pi pi-check',
            });
          }
        },
      });
      // this.eliminarEmpleado();
    }
  }
  closeModalForm(see:boolean){
    this.modalForm=see;
  }
}
