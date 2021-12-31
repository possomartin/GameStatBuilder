import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostsComponent } from './boosts.component';

describe('BoostsComponent', () => {
  let component: BoostsComponent;
  let fixture: ComponentFixture<BoostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
