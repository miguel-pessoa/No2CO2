import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PartnerOffersComponent } from './partner-offers.component';

export const partnerOffersRoute: Route = {
  path: 'partner-offers',
  component: PartnerOffersComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'global.menu.account.offers'
  },
  canActivate: [UserRouteAccessService]
};
