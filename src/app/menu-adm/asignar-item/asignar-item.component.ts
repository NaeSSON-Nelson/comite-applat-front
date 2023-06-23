import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemMenu } from '../../interfaces/menu.interface';
import { MenuAdmService } from '../menu-adm.service';

@Component({
  selector: 'app-asignar-item',
  templateUrl: './asignar-item.component.html',
  styles: [],
})
export class AsignarItemComponent {
  data: ItemMenu[] = [];
  dataSelected: ItemMenu[] = [];
  constructor(private menuService: MenuAdmService) {}

  ngOnInit(): void {
    this.obtenerLista();
  }
  obtenerLista() {
    this.menuService.findAllItemsMenu().subscribe({
      next: (res) => {
        this.data = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Tabla empleado completado');
      },
    });
  }
  @Input()
  displayModalTable: boolean = false;

  @Output()
  closeDisplayModalTable: EventEmitter<boolean> = new EventEmitter();
  @Output()
  onDataSelected: EventEmitter<ItemMenu[]> = new EventEmitter();

  selectData() {
    // console.log(this.empleadoSelected);
    const idsTable= this.dataSelected.map(({id})=>id);
    this.onDataSelected.emit(this.dataSelected);
    console.log(this.dataSelected);
    // this.closeModal();
  }
  closeModal() {
    this.closeDisplayModalTable.emit(false);
  }
}
