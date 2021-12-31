import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGamestatComponent } from './edit-gamestat.component';

describe('EditGamestatComponent', () => {
  let component: EditGamestatComponent;
  let fixture: ComponentFixture<EditGamestatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGamestatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGamestatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
