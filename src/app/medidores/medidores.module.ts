import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedidoresListarComponent } from './medidores-listar/medidores-listar.component';
import { MedidorDetailComponent } from './medidor-detail/medidor-detail.component';
import { MedidorFormComponent } from './medidor-form/medidor-form.component';
import { MedidoresComponent } from './medidores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MedidoresRoutingModule } from './medidores-routing.module';
import { PrimeUiModule } from '../prime-ng/prime-ng.module';
import { AfiliadosModule } from '../afiliados/afiliados.module';
import { MedidorSelectComponent } from './medidor-select/medidor-select.component';
import { LecturasModule } from './lecturas/lecturas.module';
import { LecturasMedidorListComponent } from './lecturas/lecturas-medidor/lecturas-medidor.component';



@NgModule({
  declarations: [
    MedidoresListarComponent,
    MedidorDetailComponent,
    MedidorFormComponent,
    MedidoresComponent,
    MedidorSelectComponent,
    LecturasMedidorListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MedidoresRoutingModule,
    AfiliadosModule,
    PrimeUiModule,
  ],
  exports:[
    MedidorSelectComponent
  ]
})
export class MedidoresModule { }
