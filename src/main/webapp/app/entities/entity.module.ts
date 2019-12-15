import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region',
        loadChildren: () => import('./region/region.module').then(m => m.No2Co2RegionModule)
      },
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.No2Co2CountryModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.No2Co2LocationModule)
      },
      {
        path: 'trip',
        loadChildren: () => import('./trip/trip.module').then(m => m.No2Co2TripModule)
      },
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then(m => m.No2Co2TaskModule)
      },
      {
        path: 'partner',
        loadChildren: () => import('./partner/partner.module').then(m => m.No2Co2PartnerModule)
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.No2Co2OfferModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.No2Co2EmployeeModule)
      },
      {
        path: 'job',
        loadChildren: () => import('./job/job.module').then(m => m.No2Co2JobModule)
      },
      {
        path: 'trip-history',
        loadChildren: () => import('./trip-history/trip-history.module').then(m => m.No2Co2TripHistoryModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class No2Co2EntityModule {}
