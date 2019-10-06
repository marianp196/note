import { TestBed } from '@angular/core/testing';

import { ChangeRecorderService } from './change-recorder.service';

describe('ChangeRecorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeRecorderService = TestBed.get(ChangeRecorderService);
    expect(service).toBeTruthy();
  });
});
