import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITrip } from 'app/shared/model/trip.model';
import { AccountService } from 'app/core/auth/account.service';
import { TripService } from './trip.service';

@Component({
  selector: 'jhi-trip',
  templateUrl: './trip.component.html'
})
export class TripComponent implements OnInit, OnDestroy {
  trips: ITrip[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected tripService: TripService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.tripService
      .query()
      .pipe(
        filter((res: HttpResponse<ITrip[]>) => res.ok),
        map((res: HttpResponse<ITrip[]>) => res.body)
      )
      .subscribe((res: ITrip[]) => {
        this.trips = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTrips();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITrip) {
    return item.id;
  }

  registerChangeInTrips() {
    this.eventSubscriber = this.eventManager.subscribe('tripListModification', response => this.loadAll());
  }
}
