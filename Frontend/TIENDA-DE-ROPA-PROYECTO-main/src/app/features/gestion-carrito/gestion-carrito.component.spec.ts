import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCarritoComponent } from './gestion-carrito.component';

describe('GestionCarritoComponent', () => {
  let component: GestionCarritoComponent;
  let fixture: ComponentFixture<GestionCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
