import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTrayComponent } from './cart-tray.component';

describe('CartTrayComponent', () => {
  let component: CartTrayComponent;
  let fixture: ComponentFixture<CartTrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartTrayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartTrayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
