import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoostComponent } from './add-boost.component';

describe('AddBoostComponent', () => {
  let component: AddBoostComponent;
  let fixture: ComponentFixture<AddBoostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
