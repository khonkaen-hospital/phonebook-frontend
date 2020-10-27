import { TestBed } from '@angular/core/testing';

import { SerivceService } from './serivce.service';

describe('SerivceService', () => {
  let service: SerivceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerivceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
