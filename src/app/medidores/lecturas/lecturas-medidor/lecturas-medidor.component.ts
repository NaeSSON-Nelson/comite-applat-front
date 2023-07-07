import { Component, Input, Output } from '@angular/core';
import { LecturasModule } from '../lecturas.module';

@Component({
  selector: 'app-lecturas-medidor-list',
  templateUrl: './lecturas-medidor.component.html',
  styles: [
  ]
})
export class LecturasMedidorListComponent {
  @Input()
  data:LecturasModule[]=[];
  constructor(){}

  // @Output()
  // enviarIdDetalles:EventEmitter<number> = new EventEmitter();

  // seleccionarId(id:number){
  //   this.enviarIdDetalles.emit(id);
  // }
}
