import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { environment } from './../environments/environment.prod';
import { environment } from './../environments/environment'; // localhost
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { QRCodeModule } from 'angularx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhonesComponent } from './phones/phones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoftphoneComponent } from './softphone/softphone.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SoftphonesComponent } from './softphones/softphones.component';
import { MasterComponent } from './layouts/master/master.component';
import { MettingComponent } from './layouts/metting/metting.component';
import { HelperModule } from './pipes/helpers.module';


@NgModule({
  declarations: [
    AppComponent,
    PhonesComponent,
    SoftphoneComponent,
    PageNotFoundComponent,
    SoftphonesComponent,
    MasterComponent,
    MettingComponent
  ],
  imports: [
    // MettingsModule,
    HelperModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BrowserModule,
    NgSelectModule,
    QRCodeModule,
    AppRoutingModule
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: 'API_URL_LOGIN', useValue: environment.apiUrlLogin },
    { provide: LOCALE_ID, useValue: 'th-TH' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
