import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITrip } from 'app/shared/model/trip.model';

type EntityResponseType = HttpResponse<ITrip>;
type EntityArrayResponseType = HttpResponse<ITrip[]>;

@Injectable({ providedIn: 'root' })
export class TripService {
  public resourceUrl = SERVER_API_URL + 'api/trips';
  private co2 = 2233;
  private points = 387;
  private multiplier: number;
  private step = 0;

  constructor(protected http: HttpClient) {}

  create(trip: ITrip): Observable<EntityResponseType> {
    return this.http.post<ITrip>(this.resourceUrl, trip, { observe: 'response' });
  }

  getCo2() {
    return this.co2;
  }

  getStep() {
    return this.step;
  }
  nextStep() {
    this.step = this.step + 1;
  }

  getPoints() {
    return this.points;
  }

  setMultiplier(number) {
    this.multiplier = number;
  }

  getMultiplier() {
    return this.multiplier;
  }

  updateCo2(co2) {
    if (!isNaN(co2)) {
      this.co2 = this.co2 + co2;
    }
  }

  updatePoints(points) {
    if (!isNaN(points)) {
      this.points = this.points + points;
    }
  }

  update(trip: ITrip): Observable<EntityResponseType> {
    return this.http.put<ITrip>(this.resourceUrl, trip, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITrip>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrip[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
