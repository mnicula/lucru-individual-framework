import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';

describe('Article Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleService = TestBed.get(ArticleService);
    expect(service).toBeTruthy();
  });
});
