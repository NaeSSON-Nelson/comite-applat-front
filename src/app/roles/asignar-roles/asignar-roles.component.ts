import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../interfaces/role.interface';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-asignar-roles',
  templateUrl: './asignar-roles.component.html',
  styles: [
  ]
})
export class AsignarRolesComponent {
  data: Role[] = [];
  dataSelected: Role[] = [];
  constructor(private roleService: RolesService) {}

  ngOnInit(): void {
    this.obtenerLista();
  }
  obtenerLista() {
    this.roleService.findAll().subscribe({
      next: (res) => {
        this.data = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Tabla menus completado');
      },
    });
  }
  @Input()
  displayModalTable: boolean = false;

  @Output()
  closeDisplayModalTable: EventEmitter<boolean> = new EventEmitter();
  @Output()
  onDataSelected: EventEmitter<Role[]> = new EventEmitter();

  selectData() {
    // console.log(this.empleadoSelected);
    this.onDataSelected.emit(this.dataSelected);
    // console.log(this.dataSelected);
    // this.closeModal();
  }
  closeModal() {
    this.closeDisplayModalTable.emit(false);
  }
}
