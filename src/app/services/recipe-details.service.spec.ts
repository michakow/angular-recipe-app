import { TestBed } from '@angular/core/testing';

import { RecipeDetailsService } from './recipe-details.service';

describe('RecipeDetailsService', () => {
  let service: RecipeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
