import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { No2Co2SharedModule } from 'app/shared/shared.module';
import { No2Co2CoreModule } from 'app/core/core.module';
import { TripEndedModalComponent } from 'app/trip-ended/trip-ended-modal.component';
import { No2Co2AppRoutingModule } from './app-routing.module';
import { No2Co2HomeModule } from './home/home.module';
import { No2Co2EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    No2Co2SharedModule,
    No2Co2CoreModule,
    No2Co2HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    No2Co2EntityModule,
    No2Co2AppRoutingModule
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    TripEndedModalComponent
  ],
  bootstrap: [JhiMainComponent]
})
export class No2Co2AppModule {}
