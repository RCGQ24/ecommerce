import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDetalladaProductoComponent } from './vista-detallada-producto.component';

describe('VistaDetalladaProductoComponent', () => {
  let component: VistaDetalladaProductoComponent;
  let fixture: ComponentFixture<VistaDetalladaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaDetalladaProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaDetalladaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
