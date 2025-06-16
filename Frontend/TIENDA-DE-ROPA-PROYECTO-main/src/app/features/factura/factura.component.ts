import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FacturaService, Factura } from '../../services/factura.service';

declare const html2pdf: any;

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
          console.log('Datos de la factura recibidos en el componente:', this.factura);
          this.loading = false;
        },
        error: (error: Error) => {
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

  async descargarPDF() {
    try {
      const element = document.getElementById('factura-pdf');
      if (!element) {
        this.error = 'No se pudo encontrar el contenido de la factura';
        return;
      }

      // Ocultar los botones antes de generar el PDF
      const botonesElement = document.querySelector('.botones');
      if (botonesElement) {
        botonesElement.classList.add('hide-for-pdf');
      }

      this.loading = true;

      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `factura-${this.factura?.numero_factura || 'demo'}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      const worker = html2pdf().set(options).from(element);
      await worker.save();
      
      console.log('PDF generado exitosamente');
      this.loading = false;

      // Mostrar los botones de nuevo después de generar el PDF
      if (botonesElement) {
        botonesElement.classList.remove('hide-for-pdf');
      }

    } catch (error: any) { // Añadí ': any' para evitar errores de tipo
      console.error('Error al generar el PDF:', error);
      this.error = 'Error al generar el PDF';
      this.loading = false;

      // Asegurarse de que los botones sean visibles si hubo un error
      const botonesElement = document.querySelector('.botones');
      if (botonesElement) {
        botonesElement.classList.remove('hide-for-pdf');
      }
    }
  }

  aceptar() {
    this.router.navigate(['/catalogo']);
  }
}
