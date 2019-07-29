import { TestBed } from '@angular/core/testing';

import { NoteRepositoryService } from './note-repository.service';

describe('NoteRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteRepositoryService = TestBed.get(NoteRepositoryService);
    expect(service).toBeTruthy();
  });
});
