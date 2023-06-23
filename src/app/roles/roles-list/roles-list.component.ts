import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Role } from '../../interfaces/role.interface';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styles: [
  ]
})
export class RolesListComponent {
  @Input()
  data:Role[]=[];
  @Input()
  title:string='Sin titulo';
  @Input()
  editForm:boolean=false;
  constructor(){}
  @Output()
  editarFormItem:EventEmitter<number> = new EventEmitter();

  editarFormItemList(id:number){
    this.editarFormItem.emit(this.data.findIndex((val)=>val.id===id));
  }
}
