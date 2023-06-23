import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Afiliado } from '../../interfaces/afiliado.interface';

@Component({
  selector: 'app-afiliado-listar',
  templateUrl: './afiliado-listar.component.html',
  styles: [
  ]
})
export class AfiliadoListarComponent {

  @Input()
  data:Afiliado[]=[];
  constructor(){}

  @Output()
  enviarIdDetalles:EventEmitter<number> = new EventEmitter();

  seleccionarId(id:number){
    this.enviarIdDetalles.emit(id);
  }
}
