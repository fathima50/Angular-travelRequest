import { TestBed } from '@angular/core/testing';

import { TravelRequestViewService } from './travel-request-view.service';

describe('TravelRequestViewService', () => {
  let service: TravelRequestViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelRequestViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
