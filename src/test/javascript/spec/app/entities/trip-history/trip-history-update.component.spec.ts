import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { No2Co2TestModule } from '../../../test.module';
import { TripHistoryUpdateComponent } from 'app/entities/trip-history/trip-history-update.component';
import { TripHistoryService } from 'app/entities/trip-history/trip-history.service';
import { TripHistory } from 'app/shared/model/trip-history.model';

describe('Component Tests', () => {
  describe('TripHistory Management Update Component', () => {
    let comp: TripHistoryUpdateComponent;
    let fixture: ComponentFixture<TripHistoryUpdateComponent>;
    let service: TripHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [No2Co2TestModule],
        declarations: [TripHistoryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TripHistoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TripHistoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TripHistoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TripHistory(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TripHistory();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
