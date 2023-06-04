import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableDropdownComponent } from './editable-dropdown.component';

describe('EditableDropdownComponent', () => {
  let component: EditableDropdownComponent;
  let fixture: ComponentFixture<EditableDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditableDropdownComponent]
    });
    fixture = TestBed.createComponent(EditableDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
