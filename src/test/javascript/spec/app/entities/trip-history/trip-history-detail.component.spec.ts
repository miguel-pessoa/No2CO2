import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { No2Co2TestModule } from '../../../test.module';
import { TripHistoryDetailComponent } from 'app/entities/trip-history/trip-history-detail.component';
import { TripHistory } from 'app/shared/model/trip-history.model';

describe('Component Tests', () => {
  describe('TripHistory Management Detail Component', () => {
    let comp: TripHistoryDetailComponent;
    let fixture: ComponentFixture<TripHistoryDetailComponent>;
    const route = ({ data: of({ tripHistory: new TripHistory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [No2Co2TestModule],
        declarations: [TripHistoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TripHistoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TripHistoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tripHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
