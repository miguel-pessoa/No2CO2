import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { No2Co2SharedModule } from 'app/shared/shared.module';
import { TripHistoryComponent } from './trip-history.component';
import { TripHistoryDetailComponent } from './trip-history-detail.component';
import { TripHistoryUpdateComponent } from './trip-history-update.component';
import { TripHistoryDeletePopupComponent, TripHistoryDeleteDialogComponent } from './trip-history-delete-dialog.component';
import { tripHistoryRoute, tripHistoryPopupRoute } from './trip-history.route';

const ENTITY_STATES = [...tripHistoryRoute, ...tripHistoryPopupRoute];

@NgModule({
  imports: [No2Co2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TripHistoryComponent,
    TripHistoryDetailComponent,
    TripHistoryUpdateComponent,
    TripHistoryDeleteDialogComponent,
    TripHistoryDeletePopupComponent
  ],
  entryComponents: [TripHistoryDeleteDialogComponent]
})
export class No2Co2TripHistoryModule {}
