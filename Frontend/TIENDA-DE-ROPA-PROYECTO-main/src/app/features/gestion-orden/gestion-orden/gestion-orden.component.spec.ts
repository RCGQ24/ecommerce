import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionOrdenComponent } from './gestion-orden.component';

describe('GestionOrdenComponent', () => {
  let component: GestionOrdenComponent;
  let fixture: ComponentFixture<GestionOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionOrdenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
