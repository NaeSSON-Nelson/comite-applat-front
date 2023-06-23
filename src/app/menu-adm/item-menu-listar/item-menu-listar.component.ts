import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemMenu } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-item-menu-listar',
  templateUrl: './item-menu-listar.component.html',
  styles: [
  ]
})
export class ItemMenuListarComponent {
  @Input()
  data:ItemMenu[]=[];
  constructor(){}

  @Output()
  enviarIdDetalles:EventEmitter<number> = new EventEmitter();

  seleccionarId(id:number){
    this.enviarIdDetalles.emit(id);
  }
}
