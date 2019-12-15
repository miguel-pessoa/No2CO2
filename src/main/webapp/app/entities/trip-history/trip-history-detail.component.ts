import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITripHistory } from 'app/shared/model/trip-history.model';

@Component({
  selector: 'jhi-trip-history-detail',
  templateUrl: './trip-history-detail.component.html'
})
export class TripHistoryDetailComponent implements OnInit {
  tripHistory: ITripHistory;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tripHistory }) => {
      this.tripHistory = tripHistory;
    });
  }

  previousState() {
    window.history.back();
  }
}
