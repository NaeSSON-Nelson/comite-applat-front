import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu-listar',
  templateUrl: './menu-listar.component.html',
  styles: [
  ]
})
export class MenuListarComponent {
  @Input()
  data:Menu[]=[];
  constructor(){}

  @Output()
  enviarIdDetalles:EventEmitter<number> = new EventEmitter();

  seleccionarId(id:number){
    this.enviarIdDetalles.emit(id);
  }
}
