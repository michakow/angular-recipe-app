import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipRatingModalComponent } from './recip-rating-modal.component';

describe('RecipRatingModalComponent', () => {
  let component: RecipRatingModalComponent;
  let fixture: ComponentFixture<RecipRatingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipRatingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipRatingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
