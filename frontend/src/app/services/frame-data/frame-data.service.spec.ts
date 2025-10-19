import { TestBed } from '@angular/core/testing';

import { FrameDataService } from './frame-data.service';

describe('FrameDataService', () => {
  let service: FrameDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrameDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
