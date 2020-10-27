import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhonesComponent } from './phones/phones.component';
import { SoftphoneComponent } from './softphone/softphone.component';
import { SoftphonesComponent } from './softphones/softphones.component';

const routes: Routes = [
  { path: '', redirectTo: '/phones', pathMatch: 'full' },
  { path: 'phones', component: PhonesComponent, pathMatch: 'full' },
  { path: 'softphone', component: SoftphoneComponent, pathMatch: 'full' },
  { path: 'softphones', component: SoftphonesComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
