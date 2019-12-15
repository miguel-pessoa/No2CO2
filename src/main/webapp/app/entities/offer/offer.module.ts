import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { No2Co2SharedModule } from 'app/shared/shared.module';
import { OfferComponent } from './offer.component';
import { OfferDetailComponent } from './offer-detail.component';
import { OfferUpdateComponent } from './offer-update.component';
import { OfferDeletePopupComponent, OfferDeleteDialogComponent } from './offer-delete-dialog.component';
import { offerRoute, offerPopupRoute } from './offer.route';

const ENTITY_STATES = [...offerRoute, ...offerPopupRoute];

@NgModule({
  imports: [No2Co2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [OfferComponent, OfferDetailComponent, OfferUpdateComponent, OfferDeleteDialogComponent, OfferDeletePopupComponent],
  entryComponents: [OfferDeleteDialogComponent]
})
export class No2Co2OfferModule {}
