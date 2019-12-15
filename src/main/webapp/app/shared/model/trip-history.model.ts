import { Moment } from 'moment';
import { ITrip } from 'app/shared/model/trip.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ITripHistory {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  language?: Language;
  trip?: ITrip;
  employee?: IEmployee;
}

export class TripHistory implements ITripHistory {
  constructor(
    public id?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public language?: Language,
    public trip?: ITrip,
    public employee?: IEmployee
  ) {}
}
