import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTileComponent } from './recipe-tile.component';

describe('RecipeTileComponent', () => {
  let component: RecipeTileComponent;
  let fixture: ComponentFixture<RecipeTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
