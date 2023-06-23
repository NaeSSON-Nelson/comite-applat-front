import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';
import { MenuAdmService } from '../menu-adm.service';

@Component({
  selector: 'app-asignar-menus',
  templateUrl: './asignar-menus.component.html',
  styles: [
  ]
})
export class AsignarMenusComponent {
  data: Menu[] = [];
  dataSelected: Menu[] = [];
  constructor(private menuService: MenuAdmService) {}

  ngOnInit(): void {
    this.obtenerLista();
  }
  obtenerLista() {
    this.menuService.findAll().subscribe({
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
  onDataSelected: EventEmitter<Menu[]> = new EventEmitter();

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
