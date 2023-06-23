import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Afiliado } from '../../interfaces/afiliado.interface';
import { AfiliadosService } from '../afiliados.service';

@Component({
  selector: 'app-asignar-afiliado',
  templateUrl: './asignar-afiliado.component.html',
  styles: [
  ]
})
export class AsignarAfiliadoComponent {
  data: Afiliado[] = [];
  dataSelected: Afiliado={};
  constructor(private afiliadoService: AfiliadosService) {}

  ngOnInit(): void {
    this.obtenerLista();
  }
  obtenerLista() {
    this.afiliadoService.findAll().subscribe({
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
  onDataSelected: EventEmitter<Afiliado> = new EventEmitter();

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
