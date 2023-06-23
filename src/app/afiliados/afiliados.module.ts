import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfiliadosRoutingModule } from './afiliados-routing.module';

import { PrimeUiModule } from '../prime-ng/prime-ng.module';

import { AfiliadosComponent } from './afiliados.component';
import { AfiliadosService } from './afiliados.service';
import { AfiliadoFormComponent } from './afiliado-form/afiliado-form.component';
import { AfiliadoListarComponent } from './afiliado-listar/afiliado-listar.component';
import { AfiliadoDetailsComponent } from './afiliado-details/afiliado-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AsignarAfiliadoComponent } from './asignar-afiliado/asignar-afiliado.component';



@NgModule({
  declarations: [
    AfiliadosComponent,
    AfiliadoFormComponent,
    AfiliadoListarComponent,
    AfiliadoDetailsComponent,
    AsignarAfiliadoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AfiliadosRoutingModule,
    
    
    
    PrimeUiModule,
  ],
  providers:[
    AfiliadosService
  ],
  exports:[
    AsignarAfiliadoComponent

  ]
})
export class AfiliadosModule { }
