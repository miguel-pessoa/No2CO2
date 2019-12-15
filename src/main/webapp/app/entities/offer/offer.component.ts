import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IOffer } from 'app/shared/model/offer.model';
import { AccountService } from 'app/core/auth/account.service';
import { OfferService } from './offer.service';

@Component({
  selector: 'jhi-offer',
  templateUrl: './offer.component.html'
})
export class OfferComponent implements OnInit, OnDestroy {
  offers: IOffer[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected offerService: OfferService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.offerService
      .query()
      .pipe(
        filter((res: HttpResponse<IOffer[]>) => res.ok),
        map((res: HttpResponse<IOffer[]>) => res.body)
      )
      .subscribe((res: IOffer[]) => {
        this.offers = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOffers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOffer) {
    return item.id;
  }

  registerChangeInOffers() {
    this.eventSubscriber = this.eventManager.subscribe('offerListModification', response => this.loadAll());
  }
}
