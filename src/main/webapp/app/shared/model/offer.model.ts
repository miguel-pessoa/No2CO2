import { IPartner } from 'app/shared/model/partner.model';
import { IEmployee } from 'app/shared/model/employee.model';

export interface IOffer {
  id?: number;
  pointCost?: number;
  name?: string;
  itemsAvailable?: number;
  partner?: IPartner;
  employees?: IEmployee[];
}

export class Offer implements IOffer {
  constructor(
    public id?: number,
    public pointCost?: number,
    public name?: string,
    public itemsAvailable?: number,
    public partner?: IPartner,
    public employees?: IEmployee[]
  ) {}
}
