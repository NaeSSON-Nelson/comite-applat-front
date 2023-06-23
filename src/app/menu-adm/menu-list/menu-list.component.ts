import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styles: [
  ]
})
export class MenuListComponent {
  @Input()
  data:Menu[]=[];
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
