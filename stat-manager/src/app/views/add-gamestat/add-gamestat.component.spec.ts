import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGamestatComponent } from './add-gamestat.component';

describe('AddGamestatComponent', () => {
  let component: AddGamestatComponent;
  let fixture: ComponentFixture<AddGamestatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGamestatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGamestatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
