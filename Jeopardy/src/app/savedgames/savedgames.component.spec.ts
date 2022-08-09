import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedgamesComponent } from './savedgames.component';

describe('SavedgamesComponent', () => {
  let component: SavedgamesComponent;
  let fixture: ComponentFixture<SavedgamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedgamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
