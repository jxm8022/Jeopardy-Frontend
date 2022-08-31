import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubcategoryComponent } from './delete-subcategory.component';

describe('DeleteSubcategoryComponent', () => {
  let component: DeleteSubcategoryComponent;
  let fixture: ComponentFixture<DeleteSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
