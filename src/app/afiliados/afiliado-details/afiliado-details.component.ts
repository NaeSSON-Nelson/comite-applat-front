import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Afiliado } from '../../interfaces/afiliado.interface';
import { EditData } from 'src/app/interfaces/edit.interface';

@Component({
  selector: 'app-afiliado-details',
  templateUrl: './afiliado-details.component.html',
  styles: [
  ]
})
export class AfiliadoDetailsComponent {
  @Input()
  displayModal:boolean = false;

  @Output()
  onCloseDetalles:EventEmitter<boolean> = new EventEmitter();

  @Input()
  dataSelected!:Afiliado;
  constructor() { }

  ngOnInit(): void {
  }
  closeModal(){
    this.onCloseDetalles.emit(false);

  }
  @Output()
  emitOperation:EventEmitter<EditData>= new EventEmitter();
  operation(tipo:EditData){
    this.emitOperation.emit(tipo)
  }
}
