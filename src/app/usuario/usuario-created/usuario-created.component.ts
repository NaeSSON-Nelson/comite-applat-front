import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioCreateResponse } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-usuario-created',
  templateUrl: './usuario-created.component.html',
  styles: [
  ]
})
export class UsuarioCreatedComponent {
  @Input()
  displayModal:boolean = false;

  @Output()
  onCloseDetalles:EventEmitter<boolean> = new EventEmitter();

  @Input()
  dataSelected!:UsuarioCreateResponse;
  constructor() { }

  ngOnInit(): void {
  }
  closeModal(){
    this.onCloseDetalles.emit(false);

  }
  // @Output()
  // emitOperation:EventEmitter<EditData>= new EventEmitter();
  // operation(tipo:EditData){
  //   this.emitOperation.emit(tipo)
  // }
}
