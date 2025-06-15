import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import * as html2pdf from 'html2pdf.js';
import { FacturaService, Factura } from '../../services/factura.service';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent implements OnInit {
  factura: Factura | null = null;
  error: string | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.facturaService.getFactura(Number(id)).subscribe({
        next: (data) => {
          this.factura = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar la factura:', error);
          this.error = 'Error al cargar la factura';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/catalogo']), 3000);
        }
      });
    } else {
      this.error = 'ID de factura inválido';
      this.loading = false;
      setTimeout(() => this.router.navigate(['/catalogo']), 3000);
    }
  }

  descargarPDF() {
    const element = document.getElementById('factura-pdf');
    if (element) {
      const options = {
        margin: 0.5,
        filename: `factura-${this.factura?.numero_factura || 'demo'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(options).from(element).save();
    }
  }

  aceptar() {
    this.router.navigate(['/catalogo']);
  }
}
