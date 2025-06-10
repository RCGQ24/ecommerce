import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as html2pdf from 'html2pdf.js';

interface Factura {
  id: number;
  fecha: string;
  cliente: {
    nombre: string;
    email: string;
    direccion: string;
  };
  productos: any[];
  subtotal: number;
  impuestos: number;
  total: number;
}

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent implements OnInit {
  factura: Factura | null = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      if (id === 'demo') {
        const data = localStorage.getItem('facturaDemo');
        if (data) {
          this.factura = JSON.parse(data);
        } else {
          throw new Error('No se encontró la factura');
        }
      } else {
        throw new Error('ID de factura inválido');
      }
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Error al cargar la factura';
      // Redirigir después de 3 segundos si hay error
      setTimeout(() => this.router.navigate(['/catalogo']), 3000);
    }
  }

  descargarPDF() {
    const element = document.getElementById('factura-pdf');
    if (element) {
      const options = {
        margin: 1,
        filename: `factura-${this.factura?.id || 'demo'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      html2pdf().set(options).from(element).save();
    }
  }

  aceptar() {
    localStorage.removeItem('facturaDemo');
    this.router.navigate(['/catalogo']);
  }
}
