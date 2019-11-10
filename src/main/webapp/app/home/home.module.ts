import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { No2Co2SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [No2Co2SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class No2Co2HomeModule {}
