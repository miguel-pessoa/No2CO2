import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITripHistory } from 'app/shared/model/trip-history.model';

type EntityResponseType = HttpResponse<ITripHistory>;
type EntityArrayResponseType = HttpResponse<ITripHistory[]>;

@Injectable({ providedIn: 'root' })
export class TripHistoryService {
  public resourceUrl = SERVER_API_URL + 'api/trip-histories';

  constructor(protected http: HttpClient) {}

  create(tripHistory: ITripHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tripHistory);
    return this.http
      .post<ITripHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tripHistory: ITripHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tripHistory);
    return this.http
      .put<ITripHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITripHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITripHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tripHistory: ITripHistory): ITripHistory {
    const copy: ITripHistory = Object.assign({}, tripHistory, {
      startDate: tripHistory.startDate != null && tripHistory.startDate.isValid() ? tripHistory.startDate.toJSON() : null,
      endDate: tripHistory.endDate != null && tripHistory.endDate.isValid() ? tripHistory.endDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tripHistory: ITripHistory) => {
        tripHistory.startDate = tripHistory.startDate != null ? moment(tripHistory.startDate) : null;
        tripHistory.endDate = tripHistory.endDate != null ? moment(tripHistory.endDate) : null;
      });
    }
    return res;
  }
}
