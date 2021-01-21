import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhonesComponent } from './phones/phones.component';
import { SoftphoneComponent } from './softphone/softphone.component';
import { SoftphonesComponent } from './softphones/softphones.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const routes: Routes = [
  { path: '', redirectTo: '/phones', pathMatch: 'full' },
  { path: 'phones', component: PhonesComponent, pathMatch: 'full' },
  { path: 'softphone', component: SoftphoneComponent, pathMatch: 'full' },
  { path: 'softphones', component: SoftphonesComponent, pathMatch: 'full' },
  { path: 'phone', loadChildren: () => import('./phone/phone.module').then(m => m.PhoneModule) },
  { path: 'mettings', loadChildren: () => import('./mettings/mettings.module').then(m => m.MettingsModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false,
      preloadingStrategy: SelectivePreloadingStrategyService
    }
  )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
