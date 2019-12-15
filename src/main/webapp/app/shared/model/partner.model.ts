import { ILocation } from 'app/shared/model/location.model';

export interface IPartner {
  id?: number;
  name?: string;
  location?: ILocation;
}

export class Partner implements IPartner {
  constructor(public id?: number, public name?: string, public location?: ILocation) {}
}
