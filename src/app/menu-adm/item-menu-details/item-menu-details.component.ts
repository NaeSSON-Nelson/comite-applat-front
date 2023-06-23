import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemMenu } from '../../interfaces/menu.interface';
import { EditData } from '../../interfaces/edit.interface';

@Component({
  selector: 'app-item-menu-details',
  templateUrl: './item-menu-details.component.html',
  styles: [
  ]
})
export class ItemMenuDetailsComponent {
  @Input()
  displayModal:boolean = false;

  @Output()
  onCloseDetalles:EventEmitter<boolean> = new EventEmitter();

  @Input()
  dataSelected!:ItemMenu;
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
