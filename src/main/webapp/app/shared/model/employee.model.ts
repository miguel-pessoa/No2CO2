import { Moment } from 'moment';
import { ITrip } from 'app/shared/model/trip.model';
import { IJob } from 'app/shared/model/job.model';
import { IOffer } from 'app/shared/model/offer.model';

export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  joinDate?: Moment;
  pointAmount?: number;
  trip?: ITrip;
  jobs?: IJob[];
  offers?: IOffer[];
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public joinDate?: Moment,
    public pointAmount?: number,
    public trip?: ITrip,
    public jobs?: IJob[],
    public offers?: IOffer[]
  ) {}
}
