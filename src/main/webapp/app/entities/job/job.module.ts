import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { No2Co2SharedModule } from 'app/shared/shared.module';
import { JobComponent } from './job.component';
import { JobDetailComponent } from './job-detail.component';
import { JobUpdateComponent } from './job-update.component';
import { JobDeletePopupComponent, JobDeleteDialogComponent } from './job-delete-dialog.component';
import { jobRoute, jobPopupRoute } from './job.route';

const ENTITY_STATES = [...jobRoute, ...jobPopupRoute];

@NgModule({
  imports: [No2Co2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [JobComponent, JobDetailComponent, JobUpdateComponent, JobDeleteDialogComponent, JobDeletePopupComponent],
  entryComponents: [JobDeleteDialogComponent]
})
export class No2Co2JobModule {}
