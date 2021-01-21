import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validator, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MettingsRoutingModule } from './mettings-routing.module';
import { MettingListComponent } from './metting-list/metting-list.component';
import { LoginComponent } from './login/login.component';
import { MettingFormComponent } from './metting-form/metting-form.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { HelperModule } from '../pipes/helpers.module';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { thBeLocale } from 'ngx-bootstrap/locale';

import { QRCodeModule } from 'angularx-qrcode';

defineLocale('th-be', thBeLocale);


@NgModule({
  declarations: [MettingListComponent, LoginComponent, MettingFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    NgSelectModule,
    HelperModule,
    QRCodeModule,
    MettingsRoutingModule
  ]
})
export class MettingsModule { }
