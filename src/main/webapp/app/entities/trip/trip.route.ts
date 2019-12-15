import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Trip } from 'app/shared/model/trip.model';
import { TripService } from './trip.service';
import { TripComponent } from './trip.component';
import { TripDetailComponent } from './trip-detail.component';
import { TripUpdateComponent } from './trip-update.component';
import { TripDeletePopupComponent } from './trip-delete-dialog.component';
import { ITrip } from 'app/shared/model/trip.model';

@Injectable({ providedIn: 'root' })
export class TripResolve implements Resolve<ITrip> {
  constructor(private service: TripService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITrip> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Trip>) => response.ok),
        map((trip: HttpResponse<Trip>) => trip.body)
      );
    }
    return of(new Trip());
  }
}

export const tripRoute: Routes = [
  {
    path: '',
    component: TripComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'no2Co2App.trip.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TripDetailComponent,
    resolve: {
      trip: TripResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'no2Co2App.trip.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TripUpdateComponent,
    resolve: {
      trip: TripResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'no2Co2App.trip.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TripUpdateComponent,
    resolve: {
      trip: TripResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'no2Co2App.trip.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tripPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TripDeletePopupComponent,
    resolve: {
      trip: TripResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'no2Co2App.trip.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
