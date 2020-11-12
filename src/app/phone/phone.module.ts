import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validator, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PhoneRoutingModule } from './phone-routing.module';
import { PhoneComponent } from './phone.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [PhoneComponent, LoginComponent, CreateComponent],
  imports: [
    CommonModule,
    PhoneRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PhoneModule { }
