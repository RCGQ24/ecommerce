import { Component, OnInit } from '@angular/core';
import { FacturaService, Factura } from '../../../services/factura.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-gestion-orden',
  imports: [CommonModule, DatePipe, CurrencyPipe, ReactiveFormsModule, RouterModule],
  templateUrl: './gestion-orden.component.html',
  styleUrl: './gestion-orden.component.scss'
})
export class GestionOrdenComponent implements OnInit {
  selectedAction: 'consultar' | 'modificar' | 'eliminar' | null = null;
  facturas: Factura[] = [];
  loadingFacturas = false;
  errorFacturas: string | null = null;
  editFacturaForm!: FormGroup;
  facturaSeleccionada: Factura | null = null;
  editError: string | null = null;
  editSuccess: string | null = null;
  facturaAEliminar: Factura | null = null;
  deleteError: string | null = null;
  deleteSuccess: string | null = null;

  constructor(
    private facturaService: FacturaService, 
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onConsultarFactura() {
    this.selectedAction = 'consultar';
    this.cargarFacturas();
  }

  cargarFacturas() {
    this.loadingFacturas = true;
    this.errorFacturas = null;
    this.facturaService.getFacturas().subscribe({
      next: (data) => {
        this.facturas = data;
        this.loadingFacturas = false;
      },
      error: (err) => {
        this.errorFacturas = 'Error al cargar las facturas';
        this.loadingFacturas = false;
      }
    });
  }

  onModificarFactura() {
    this.selectedAction = 'modificar';
    this.cargarFacturas();
    this.facturaSeleccionada = null;
    this.editError = null;
    this.editSuccess = null;
  }

  seleccionarFacturaParaEditar(factura: Factura) {
    this.facturaSeleccionada = factura;
    this.editError = null;
    this.editSuccess = null;
    this.editFacturaForm = this.fb.group({
      numero_factura: [factura.numero_factura, [Validators.required, Validators.pattern(/^FAC-\d+$/)]],
      fecha_factura: [factura.fecha_factura, Validators.required],
      monto_total: [factura.monto_total, [Validators.required, Validators.min(0.01)]],
      email: [factura.email, [Validators.required, Validators.email]]
    });
  }

  guardarEdicionFactura() {
    if (!this.facturaSeleccionada || this.editFacturaForm.invalid) {
      this.editError = 'Por favor, corrige los errores del formulario.';
      return;
    }
    const id = this.facturaSeleccionada.id!;
    const datos = this.editFacturaForm.value;
    this.facturaService.updateFactura(id, datos).subscribe({
      next: (facturaActualizada) => {
        this.editSuccess = 'Factura actualizada correctamente.';
        this.editError = null;
        // Actualizar la lista local
        const idx = this.facturas.findIndex(f => f.id === id);
        if (idx !== -1) this.facturas[idx] = { ...this.facturas[idx], ...facturaActualizada };
        this.facturaSeleccionada = null;
      },
      error: (err) => {
        this.editError = 'Error al actualizar la factura.';
        this.editSuccess = null;
      }
    });
  }

  cancelarEdicionFactura() {
    this.facturaSeleccionada = null;
    this.editError = null;
    this.editSuccess = null;
  }

  onEliminarFactura() {
    this.selectedAction = 'eliminar';
    this.cargarFacturas();
    this.facturaAEliminar = null;
    this.deleteError = null;
    this.deleteSuccess = null;
  }

  seleccionarFacturaParaEliminar(factura: Factura) {
    this.facturaAEliminar = factura;
    this.deleteError = null;
    this.deleteSuccess = null;
  }

  confirmarEliminarFactura() {
    if (!this.facturaAEliminar) return;
    const id = this.facturaAEliminar.id!;
    this.facturaService.deleteFactura(id).subscribe({
      next: () => {
        this.deleteSuccess = 'Factura eliminada correctamente.';
        this.deleteError = null;
        // Quitar de la lista local
        this.facturas = this.facturas.filter(f => f.id !== id);
        this.facturaAEliminar = null;
      },
      error: () => {
        this.deleteError = 'Error al eliminar la factura.';
        this.deleteSuccess = null;
      }
    });
  }

  cancelarEliminarFactura() {
    this.facturaAEliminar = null;
    this.deleteError = null;
    this.deleteSuccess = null;
  }

  volverAlMenu() {
    this.selectedAction = null;
  }

  buscar() {
    // Función para manejar la búsqueda
    console.log('Búsqueda realizada');
  }
}
