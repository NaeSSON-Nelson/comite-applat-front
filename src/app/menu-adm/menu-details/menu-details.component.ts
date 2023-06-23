import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';
import { EditData } from '../../interfaces/edit.interface';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styles: [
  ]
})
export class MenuDetailsComponent {
  @Input()
  displayModal:boolean = false;

  @Output()
  onCloseDetalles:EventEmitter<boolean> = new EventEmitter();

  @Input()
  dataSelected!:Menu;
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
