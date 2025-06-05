import { TestBed } from '@angular/core/testing';

import { HandGestureService } from './hand-gesture.service';

describe('HandGestureService', () => {
  let service: HandGestureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandGestureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
