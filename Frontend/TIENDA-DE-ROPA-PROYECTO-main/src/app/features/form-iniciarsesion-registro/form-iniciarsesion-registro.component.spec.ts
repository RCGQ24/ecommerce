import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIniciarsesionRegistroComponent } from './form-iniciarsesion-registro.component';

describe('FormIniciarsesionRegistroComponent', () => {
  let component: FormIniciarsesionRegistroComponent;
  let fixture: ComponentFixture<FormIniciarsesionRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIniciarsesionRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIniciarsesionRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
