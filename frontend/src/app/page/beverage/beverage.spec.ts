import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Beverage } from './beverage';

describe('Beverage', () => {
  let component: Beverage;
  let fixture: ComponentFixture<Beverage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Beverage],
    }).compileComponents();

    fixture = TestBed.createComponent(Beverage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
