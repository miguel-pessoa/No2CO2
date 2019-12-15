import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { No2Co2SharedModule } from 'app/shared/shared.module';
import { TripComponent } from './trip.component';
import { TripDetailComponent } from './trip-detail.component';
import { TripUpdateComponent } from './trip-update.component';
import { TripDeletePopupComponent, TripDeleteDialogComponent } from './trip-delete-dialog.component';
import { tripRoute, tripPopupRoute } from './trip.route';

const ENTITY_STATES = [...tripRoute, ...tripPopupRoute];

@NgModule({
  imports: [No2Co2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TripComponent, TripDetailComponent, TripUpdateComponent, TripDeleteDialogComponent, TripDeletePopupComponent],
  entryComponents: [TripDeleteDialogComponent]
})
export class No2Co2TripModule {}
