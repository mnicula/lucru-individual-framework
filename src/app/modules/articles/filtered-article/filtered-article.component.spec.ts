import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredArticleComponent } from './filtered-article.component';

describe('FilteredArticleComponent', () => {
  let component: FilteredArticleComponent;
  let fixture: ComponentFixture<FilteredArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
