import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatComponent } from './edit-stat.component';

describe('EditStatComponent', () => {
  let component: EditStatComponent;
  let fixture: ComponentFixture<EditStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
