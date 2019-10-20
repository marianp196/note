import { TestBed } from '@angular/core/testing';

import { TagSuggestionService } from './tag-suggestion.service';

describe('TagSuggestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagSuggestionService = TestBed.get(TagSuggestionService);
    expect(service).toBeTruthy();
  });
});
