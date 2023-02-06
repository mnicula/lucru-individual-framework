import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingUpdateComponent } from './booking-update.component';

describe('BookingUpdateComponent', () => {
  let component: BookingUpdateComponent;
  let fixture: ComponentFixture<BookingUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
