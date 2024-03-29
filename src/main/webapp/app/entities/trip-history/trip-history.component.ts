import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { ITripHistory } from 'app/shared/model/trip-history.model';
import { AccountService } from 'app/core/auth/account.service';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TripHistoryService } from './trip-history.service';

@Component({
  selector: 'jhi-trip-history',
  templateUrl: './trip-history.component.html'
})
export class TripHistoryComponent implements OnInit, OnDestroy {
  tripHistories: ITripHistory[];
  currentAccount: any;
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected tripHistoryService: TripHistoryService,
    protected eventManager: JhiEventManager,
    protected parseLinks: JhiParseLinks,
    protected accountService: AccountService
  ) {
    this.tripHistories = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.tripHistoryService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ITripHistory[]>) => this.paginateTripHistories(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.tripHistories = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTripHistories();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITripHistory) {
    return item.id;
  }

  registerChangeInTripHistories() {
    this.eventSubscriber = this.eventManager.subscribe('tripHistoryListModification', response => this.reset());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTripHistories(data: ITripHistory[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.tripHistories.push(data[i]);
    }
  }
}
