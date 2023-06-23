import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Role } from '../../interfaces/role.interface';

@Component({
  selector: 'app-roles-listar',
  templateUrl: './roles-listar.component.html',
  styles: [
  ]
})
export class RolesListarComponent {
  @Input()
  data:Role[]=[];
  constructor(){}

  @Output()
  enviarIdDetalles:EventEmitter<number> = new EventEmitter();

  seleccionarId(id:number){
    this.enviarIdDetalles.emit(id);
  }
}
