import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemMenu } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-item-menu-list',
  templateUrl: './item-menu-list.component.html',
  styles: [
  ]
})
export class ItemMenuListComponent {
  @Input()
  data:ItemMenu[]=[];
  @Input()
  title:string='Sin titulo';
  @Input()
  editForm:boolean=false;
  constructor(){}
  @Output()
  editarFormItemMenu:EventEmitter<number> = new EventEmitter();

  editarFormItemList(id:number){
    this.editarFormItemMenu.emit(this.data.findIndex((val)=>val.id===id));
  }
}
