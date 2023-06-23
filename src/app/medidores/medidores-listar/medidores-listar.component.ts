import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medidor } from 'src/app/interfaces/medidor.interface';
import { Afiliado } from '../../interfaces/afiliado.interface';

@Component({
  selector: 'app-medidores-listar',
  templateUrl: './medidores-listar.component.html',
  styles: [
  ]
})
export class MedidoresListarComponent {
  @Input()
  data:Afiliado[]=[];
  constructor(){}

  @Output()
  enviarIdDetalles:EventEmitter<number> = new EventEmitter();

  seleccionarId(id:number){
    this.enviarIdDetalles.emit(id);
  }
}
