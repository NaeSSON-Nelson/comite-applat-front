import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { EditData } from '../../interfaces/edit.interface';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styles: [
  ]
})
export class UsuarioDetailsComponent {
  @Input()
  displayModal:boolean = false;

  @Output()
  onCloseDetalles:EventEmitter<boolean> = new EventEmitter();

  @Input()
  dataSelected!:Usuario;
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
