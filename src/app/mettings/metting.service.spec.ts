import { TestBed } from '@angular/core/testing';

import { MettingService } from './metting.service';

describe('MettingService', () => {
  let service: MettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
