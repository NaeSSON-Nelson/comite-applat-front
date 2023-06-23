import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Afiliado } from '../../interfaces/afiliado.interface';
import { EditData } from 'src/app/interfaces/edit.interface';
import { Medidor } from '../../interfaces/medidor.interface';

@Component({
  selector: 'app-medidor-detail',
  templateUrl: './medidor-detail.component.html',
  styles: [
  ]
})
export class MedidorDetailComponent {
  @Input()
  displayModal:boolean = false;

  @Output()
  onCloseDetalles:EventEmitter<boolean> = new EventEmitter();

  @Input()
  dataSelected!:Afiliado;

  medidorSelected?:Medidor;
  constructor() { }

  ngOnInit(): void {
  }
  closeModal(){
    this.medidorSelected=undefined;
    this.onCloseDetalles.emit(false);
  }
  @Output()
  emitOperation:EventEmitter<EditData>= new EventEmitter();
  operation(tipo:EditData){
    this.emitOperation.emit(tipo)
  }

  selectMedidor(data:any){
    this.medidorSelected=data.value;
  }
}
