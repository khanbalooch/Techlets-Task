import { TestBed, inject } from '@angular/core/testing';

import { LcsService } from './lcs.service';

describe('LcsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LcsService]
    });
  });

  it('should be created', inject([LcsService], (service: LcsService) => {
    expect(service).toBeTruthy();
  }));
});
