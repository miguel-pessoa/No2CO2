import { ILocation } from 'app/shared/model/location.model';
import { IEmployee } from 'app/shared/model/employee.model';

export interface ITrip {
  id?: number;
  pointAmout?: number;
  from?: ILocation;
  to?: ILocation;
  employees?: IEmployee[];
}

export class Trip implements ITrip {
  constructor(
    public id?: number,
    public pointAmout?: number,
    public from?: ILocation,
    public to?: ILocation,
    public employees?: IEmployee[]
  ) {}
}
