import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TripHistory } from 'app/shared/model/trip-history.model';
import { TripHistoryService } from './trip-history.service';
import { TripHistoryComponent } from './trip-history.component';
import { TripHistoryDetailComponent } from './trip-history-detail.component';
import { TripHistoryUpdateComponent } from './trip-history-update.component';
import { TripHistoryDeletePopupComponent } from './trip-history-delete-dialog.component';
import { ITripHistory } from 'app/shared/model/trip-history.model';

@Injectable({ providedIn: 'root' })
export class TripHistoryResolve implements Resolve<ITripHistory> {
  constructor(private service: TripHistoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITripHistory> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TripHistory>) => response.ok),
        map((tripHistory: HttpResponse<TripHistory>) => tripHistory.body)
      );
    }
    return of(new TripHistory());
  }
}

export const tripHistoryRoute: Routes = [
  {
    path: '',
    component: TripHistoryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'no2Co2App.tripHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TripHistoryDetailComponent,
    resolve: {
      tripHistory: TripHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'no2Co2App.tripHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TripHistoryUpdateComponent,
    resolve: {
      tripHistory: TripHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'no2Co2App.tripHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TripHistoryUpdateComponent,
    resolve: {
      tripHistory: TripHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'no2Co2App.tripHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tripHistoryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TripHistoryDeletePopupComponent,
    resolve: {
      tripHistory: TripHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'no2Co2App.tripHistory.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
