import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoostComponent } from './edit-boost.component';

describe('EditBoostComponent', () => {
  let component: EditBoostComponent;
  let fixture: ComponentFixture<EditBoostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBoostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
