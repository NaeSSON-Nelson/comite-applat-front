import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Afiliado } from 'src/app/interfaces/afiliado.interface';
import { MedidoresService } from '../medidores.service';
import { Medidor } from 'src/app/interfaces/medidor.interface';

@Component({
  selector: 'app-medidor-select',
  templateUrl: './medidor-select.component.html',
  styles: [
  ]
})
export class MedidorSelectComponent {
  data: Afiliado[] = [];
  dataSelected?: Afiliado;
  selected?:any;
  constructor(private medidoresService:MedidoresService) {}

  ngOnInit(): void {
    this.obtenerLista();
  }
  obtenerLista() {
    this.medidoresService.findAllMedidoresWithAfiliados().subscribe({
      next: (res) => {
        this.data = res.data;
        console.log(res);
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
  onDataSelected: EventEmitter<Medidor> = new EventEmitter();

  selectData() {
    // console.log(this.empleadoSelected);
    this.onDataSelected.emit(this.selected);

  }
  closeModal() {
    this.closeDisplayModalTable.emit(false);
  }

  calculateCustomerTotal(medidores:Medidor[]) {
    

    return medidores.length
}
}
