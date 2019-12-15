import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITripHistory } from 'app/shared/model/trip-history.model';
import { TripHistoryService } from './trip-history.service';

@Component({
  selector: 'jhi-trip-history-delete-dialog',
  templateUrl: './trip-history-delete-dialog.component.html'
})
export class TripHistoryDeleteDialogComponent {
  tripHistory: ITripHistory;

  constructor(
    protected tripHistoryService: TripHistoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tripHistoryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tripHistoryListModification',
        content: 'Deleted an tripHistory'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-trip-history-delete-popup',
  template: ''
})
export class TripHistoryDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tripHistory }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TripHistoryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tripHistory = tripHistory;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/trip-history', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/trip-history', { outlets: { popup: null } }]);
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
