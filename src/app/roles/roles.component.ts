import { Component } from '@angular/core';
import { Role } from '../interfaces/role.interface';
import { RolesService } from './roles.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EditData } from '../interfaces/edit.interface';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: [
  ]
})
export class RolesComponent {
  roles: Role[] = [];

  roleSelected?:Role;

  detallesModal:boolean=false;

  constructor(
    private roleService: RolesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router:Router
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.findAllRoles();
  }

  findAllRoles() {
    this.roleService.findAll().subscribe({
      next: ({data}) => {
        this.roles = data;
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
        console.log(this.roles);
      },
    });
  }
  detailview(id:number){
    this.roleService.findOne(id).subscribe({
      next:({data})=>{
        this.roleSelected=data;
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
  }
  registrarForm(){
    this.router.navigate(['/roles/form'])
  }

  recibirOperation(data:EditData){
    if(data.type==='MODIFICAR'){
      this.router.navigate(['/roles/form'],{
        queryParams:{
          id:data.id
        }
      });
    }else if(data.type==='DESHABILITAR'){
      this.roleService.updateStatus(data.id,{estado:0}).subscribe({
        next:({data})=>{
          this.roleSelected=data;
        },
        error:err=>{
          console.log(err);
        },
        complete:()=>{
          this.detallesModal=true;
        }
      });
      // this.cambiarEstadoEmpleado('INACTIVO');
    }else if(data.type==='HABILITAR'){
      this.roleService.updateStatus(data.id,{estado:1});
      // this.cambiarEstadoEmpleado('ACTIVO');
    }else if(data.type==='ELIMINAR'){
      // this.eliminarEmpleado();
    }
  }
}
