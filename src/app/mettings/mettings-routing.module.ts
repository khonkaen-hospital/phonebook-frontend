import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MettingComponent } from '../layouts/metting/metting.component';
import { LoginComponent } from './login/login.component';
import { MettingListComponent } from './metting-list/metting-list.component';

const routes: Routes = [
  {
    path: '',
    component: MettingComponent,
    children: [
      { path: '', redirectTo: 'list' },
      { path: 'list', component: MettingListComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MettingsRoutingModule { }
