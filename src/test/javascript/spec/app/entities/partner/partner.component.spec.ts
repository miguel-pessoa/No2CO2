import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { No2Co2TestModule } from '../../../test.module';
import { PartnerComponent } from 'app/entities/partner/partner.component';
import { PartnerService } from 'app/entities/partner/partner.service';
import { Partner } from 'app/shared/model/partner.model';

describe('Component Tests', () => {
  describe('Partner Management Component', () => {
    let comp: PartnerComponent;
    let fixture: ComponentFixture<PartnerComponent>;
    let service: PartnerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [No2Co2TestModule],
        declarations: [PartnerComponent],
        providers: []
      })
        .overrideTemplate(PartnerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartnerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartnerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Partner(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.partners[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
