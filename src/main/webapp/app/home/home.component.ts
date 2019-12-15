import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from 'app/entities/trip/trip.service';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  modalRef: NgbModalRef;
  tripEnded = false;
  points: number;
  co2 = 0;
  step: number;
  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private tripService: TripService,
    private router: Router
  ) {}

  @HostListener('keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent): void {
    const keyName: string = event.key;
    // eslint-disable-next-line no-console
    console.log(keyName);
    if (keyName === 'Enter') {
      if (!this.tripEnded) {
        this.tripEnded = true;
        this.points = Math.floor(Math.random() * this.tripService.getMultiplier()) + this.tripService.getMultiplier();
        if (this.tripService.getMultiplier() === 12) {
          this.co2 = 0;
        } else {
          this.co2 = Math.floor(Math.random() * 2 * this.tripService.getMultiplier()) + this.tripService.getMultiplier();
        }
        this.tripService.updateCo2(this.co2);
        this.tripService.updatePoints(this.points);
      }
    }
    if (keyName === 'c') {
      this.tripService.setMultiplier(6);
    }
    if (keyName === 'b') {
      this.tripService.setMultiplier(12);
    }
  }

  ngOnInit() {
    this.step = this.tripService.getStep();
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }

  nextStep() {
    this.tripService.nextStep();
    this.router.navigateByUrl('/account/settings');
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().subscribe(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  print(event) {
    // eslint-disable-next-line no-console
    console.log(event);
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.eventManager.destroy(this.authSubscription);
    }
  }
}
