import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrip } from 'app/shared/model/trip.model';
import { TripService } from './trip.service';

@Component({
  selector: 'jhi-trip-delete-dialog',
  templateUrl: './trip-delete-dialog.component.html'
})
export class TripDeleteDialogComponent {
  trip: ITrip;

  constructor(protected tripService: TripService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tripService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tripListModification',
        content: 'Deleted an trip'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-trip-delete-popup',
  template: ''
})
export class TripDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ trip }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TripDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.trip = trip;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/trip', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/trip', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
