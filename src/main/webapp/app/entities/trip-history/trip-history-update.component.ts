import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITripHistory, TripHistory } from 'app/shared/model/trip-history.model';
import { TripHistoryService } from './trip-history.service';
import { ITrip } from 'app/shared/model/trip.model';
import { TripService } from 'app/entities/trip/trip.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';

@Component({
  selector: 'jhi-trip-history-update',
  templateUrl: './trip-history-update.component.html'
})
export class TripHistoryUpdateComponent implements OnInit {
  isSaving: boolean;

  trips: ITrip[];

  employees: IEmployee[];

  editForm = this.fb.group({
    id: [],
    startDate: [],
    endDate: [],
    language: [],
    trip: [],
    employee: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tripHistoryService: TripHistoryService,
    protected tripService: TripService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tripHistory }) => {
      this.updateForm(tripHistory);
    });
    this.tripService
      .query({ filter: 'triphistory-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ITrip[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITrip[]>) => response.body)
      )
      .subscribe(
        (res: ITrip[]) => {
          if (!this.editForm.get('trip').value || !this.editForm.get('trip').value.id) {
            this.trips = res;
          } else {
            this.tripService
              .find(this.editForm.get('trip').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ITrip>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ITrip>) => subResponse.body)
              )
              .subscribe(
                (subRes: ITrip) => (this.trips = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.employeeService
      .query({ filter: 'triphistory-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployee[]>) => response.body)
      )
      .subscribe(
        (res: IEmployee[]) => {
          if (!this.editForm.get('employee').value || !this.editForm.get('employee').value.id) {
            this.employees = res;
          } else {
            this.employeeService
              .find(this.editForm.get('employee').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IEmployee>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IEmployee>) => subResponse.body)
              )
              .subscribe(
                (subRes: IEmployee) => (this.employees = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(tripHistory: ITripHistory) {
    this.editForm.patchValue({
      id: tripHistory.id,
      startDate: tripHistory.startDate != null ? tripHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: tripHistory.endDate != null ? tripHistory.endDate.format(DATE_TIME_FORMAT) : null,
      language: tripHistory.language,
      trip: tripHistory.trip,
      employee: tripHistory.employee
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tripHistory = this.createFromForm();
    if (tripHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.tripHistoryService.update(tripHistory));
    } else {
      this.subscribeToSaveResponse(this.tripHistoryService.create(tripHistory));
    }
  }

  private createFromForm(): ITripHistory {
    return {
      ...new TripHistory(),
      id: this.editForm.get(['id']).value,
      startDate:
        this.editForm.get(['startDate']).value != null ? moment(this.editForm.get(['startDate']).value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate']).value != null ? moment(this.editForm.get(['endDate']).value, DATE_TIME_FORMAT) : undefined,
      language: this.editForm.get(['language']).value,
      trip: this.editForm.get(['trip']).value,
      employee: this.editForm.get(['employee']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITripHistory>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTripById(index: number, item: ITrip) {
    return item.id;
  }

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }
}
