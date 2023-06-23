import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styles: [
  ]
})
export class UsuarioListComponent {
  @Input()
  data:Usuario[]=[];
  constructor(){}

  @Output()
  enviarIdDetalles:EventEmitter<number> = new EventEmitter();

  seleccionarId(id:number){
    this.enviarIdDetalles.emit(id);
  }
}
