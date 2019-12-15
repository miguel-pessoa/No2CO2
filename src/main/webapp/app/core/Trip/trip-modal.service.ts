import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { TripEndedModalComponent } from 'app/trip-ended/trip-ended-modal.component';

@Injectable({ providedIn: 'root' })
export class TripModalService {
  private isOpen = false;
  constructor(private modalService: NgbModal) {}

  open(): NgbModalRef {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef = this.modalService.open(TripEndedModalComponent);
    modalRef.result.finally(() => (this.isOpen = false));
    return modalRef;
  }
}
