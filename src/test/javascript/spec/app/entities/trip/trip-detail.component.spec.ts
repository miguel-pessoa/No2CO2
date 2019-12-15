import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { No2Co2TestModule } from '../../../test.module';
import { TripDetailComponent } from 'app/entities/trip/trip-detail.component';
import { Trip } from 'app/shared/model/trip.model';

describe('Component Tests', () => {
  describe('Trip Management Detail Component', () => {
    let comp: TripDetailComponent;
    let fixture: ComponentFixture<TripDetailComponent>;
    const route = ({ data: of({ trip: new Trip(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [No2Co2TestModule],
        declarations: [TripDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TripDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TripDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.trip).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
