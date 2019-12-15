import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOffer, Offer } from 'app/shared/model/offer.model';
import { OfferService } from './offer.service';
import { IPartner } from 'app/shared/model/partner.model';
import { PartnerService } from 'app/entities/partner/partner.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';

@Component({
  selector: 'jhi-offer-update',
  templateUrl: './offer-update.component.html'
})
export class OfferUpdateComponent implements OnInit {
  isSaving: boolean;

  partners: IPartner[];

  employees: IEmployee[];

  editForm = this.fb.group({
    id: [],
    pointCost: [],
    name: [],
    itemsAvailable: [],
    partner: [],
    employees: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected offerService: OfferService,
    protected partnerService: PartnerService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ offer }) => {
      this.updateForm(offer);
    });
    this.partnerService
      .query({ filter: 'offer-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPartner[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPartner[]>) => response.body)
      )
      .subscribe(
        (res: IPartner[]) => {
          if (!this.editForm.get('partner').value || !this.editForm.get('partner').value.id) {
            this.partners = res;
          } else {
            this.partnerService
              .find(this.editForm.get('partner').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPartner>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPartner>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPartner) => (this.partners = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.employeeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployee[]>) => response.body)
      )
      .subscribe((res: IEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(offer: IOffer) {
    this.editForm.patchValue({
      id: offer.id,
      pointCost: offer.pointCost,
      name: offer.name,
      itemsAvailable: offer.itemsAvailable,
      partner: offer.partner,
      employees: offer.employees
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const offer = this.createFromForm();
    if (offer.id !== undefined) {
      this.subscribeToSaveResponse(this.offerService.update(offer));
    } else {
      this.subscribeToSaveResponse(this.offerService.create(offer));
    }
  }

  private createFromForm(): IOffer {
    return {
      ...new Offer(),
      id: this.editForm.get(['id']).value,
      pointCost: this.editForm.get(['pointCost']).value,
      name: this.editForm.get(['name']).value,
      itemsAvailable: this.editForm.get(['itemsAvailable']).value,
      partner: this.editForm.get(['partner']).value,
      employees: this.editForm.get(['employees']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOffer>>) {
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

  trackPartnerById(index: number, item: IPartner) {
    return item.id;
  }

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
