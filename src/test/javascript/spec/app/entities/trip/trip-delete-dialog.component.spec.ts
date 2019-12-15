import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { No2Co2TestModule } from '../../../test.module';
import { TripDeleteDialogComponent } from 'app/entities/trip/trip-delete-dialog.component';
import { TripService } from 'app/entities/trip/trip.service';

describe('Component Tests', () => {
  describe('Trip Management Delete Component', () => {
    let comp: TripDeleteDialogComponent;
    let fixture: ComponentFixture<TripDeleteDialogComponent>;
    let service: TripService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [No2Co2TestModule],
        declarations: [TripDeleteDialogComponent]
      })
        .overrideTemplate(TripDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TripDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TripService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
