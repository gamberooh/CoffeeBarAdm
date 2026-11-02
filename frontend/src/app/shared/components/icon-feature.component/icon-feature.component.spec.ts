import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFeatureComponent } from './icon-feature.component';

describe('IconFeatureComponent', () => {
  let component: IconFeatureComponent;
  let fixture: ComponentFixture<IconFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconFeatureComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
