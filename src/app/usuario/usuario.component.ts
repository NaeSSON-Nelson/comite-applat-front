import { Component } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioService } from './usuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EditData } from '../interfaces/edit.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [],
})
export class UsuarioComponent {
  usuarios: Usuario[] = [];

  usuarioSelected?: Usuario;

  detallesModal: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.findAllUsuarios();
  }

  findAllUsuarios() {
    this.usuarioService.findAll().subscribe({
      next: ({ data }) => {
        this.usuarios = data;
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
        console.log(this.usuarios);
      },
    });
  }
  detailview(id: number) {
    this.usuarioService.findOne(id).subscribe({
      next: ({ data }) => {
        this.usuarioSelected = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.detallesModal = true;
      },
    });
  }
  cerrarDetallesModal(modalStatus: boolean) {
    this.detallesModal = modalStatus;
  }
  registrarForm() {
    this.router.navigate(['/usuarios/form']);
  }

  recibirOperation(data: EditData) {
    console.log(data);
    if (data.type === 'MODIFICAR') {
      this.router.navigate(['/usuarios/perfilForm'], {
        queryParams: {
          id: data.id,
        },
      });
    } else if (data.type === 'REASIGNAR') {
      this.router.navigate(['/usuarios/form'], {
        queryParams: {
          id: data.id,
        },
      });
    } else if (data.type === 'DESHABILITAR') {
      this.usuarioService.updateStatus(data.id, { estado: 0 }).subscribe({
        next: ({ msg,data }) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Se cambio con exito!',
            detail: `${msg}`,
            icon: 'pi pi-check',
          });
          this.usuarioSelected = data;
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
          this.detallesModal = true;
          console.log(data);
        },
      });
      // this.cambiarEstadoEmpleado('INACTIVO');
    } else if (data.type === 'HABILITAR') {
      this.usuarioService.updateStatus(data.id, { estado: 1 }).subscribe({
        next: ({ msg,data }) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Se cambio con exito!',
            detail: `${msg}`,
            icon: 'pi pi-check',
          });
          this.usuarioSelected = data;
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
          this.detallesModal = true;
        },
      });
      // this.cambiarEstadoEmpleado('ACTIVO');
    } else if (data.type === 'ELIMINAR') {
      // this.eliminarEmpleado();
    }
  }
}
