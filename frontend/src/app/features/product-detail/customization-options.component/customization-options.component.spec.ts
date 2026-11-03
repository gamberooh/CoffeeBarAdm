import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizationOptionsComponent } from './customization-options.component';

describe('CustomizationOptionsComponent', () => {
  let component: CustomizationOptionsComponent;
  let fixture: ComponentFixture<CustomizationOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizationOptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizationOptionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
