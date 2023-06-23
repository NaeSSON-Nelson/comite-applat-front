import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Role } from '../../interfaces/role.interface';
import { EditData } from '../../interfaces/edit.interface';

@Component({
  selector: 'app-roles-details',
  templateUrl: './roles-details.component.html',
  styles: [
  ]
})
export class RolesDetailsComponent {
  @Input()
  displayModal:boolean = false;

  @Output()
  onCloseDetalles:EventEmitter<boolean> = new EventEmitter();

  @Input()
  dataSelected!:Role;
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
