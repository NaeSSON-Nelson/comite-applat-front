import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
@NgModule({
  declarations: [],
  imports: [
    DialogModule,
    TableModule,
    ButtonModule,
    SliderModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ConfirmDialogModule,
    PasswordModule,
    KeyFilterModule,
    InputNumberModule,
  ],
  exports: [
    DialogModule,
    TableModule,
    ButtonModule,
    SliderModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ConfirmDialogModule,
    PasswordModule,
    KeyFilterModule,
    InputNumberModule,
  ],
})
export class PrimeUiModule {}
