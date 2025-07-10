import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupervisorStats, PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductosService } from '../../services/productos.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-supervisor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {
  stats: SupervisorStats = {
    totalVentas: 0,
    totalTransacciones: 0,
    promedioPorVenta: 0,
    metodosPago: {},
    tendenciaMensual: []
  };

  paymentMethods: { name: string; count: number; percentage: number }[] = [];
  maxTrendAmount = 0;
  allProducts: any[] = [];
  tendenciasCompletas: { nombre: string, cantidad: number }[] = [];
  noVentas = false;

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router,
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.paymentService.getSupervisorStats().subscribe(stats => {
      this.stats = stats;
      this.calculateDerivedStats();
      this.productosService.obtenerProductos().subscribe(productos => {
        this.allProducts = productos;
        const tendenciaMap = new Map(this.stats.tendenciaMensual.map(t => [t.nombre, t.cantidad]));
        this.tendenciasCompletas = this.allProducts.map(p => ({
          nombre: p.nombre_producto,
          cantidad: tendenciaMap.get(p.nombre_producto) || 0
        }));
        this.maxTrendAmount = Math.max(...this.tendenciasCompletas.map(t => t.cantidad), 0);
        this.noVentas = this.maxTrendAmount === 0;
        this.cdr.detectChanges();
      });
      console.log('Tendencia Mensual:', this.stats.tendenciaMensual);
    });
  }

  private calculateDerivedStats() {
    // Mapeo de IDs a nombres de métodos de pago
    const paymentMethodMap: { [key: number]: string } = {
      1: 'Tarjeta de Débito',
      2: 'Tarjeta de Crédito',
      3: 'Pago Móvil'
    };
    // Métodos de pago fijos
    const fixedMethods = ['Tarjeta de Débito', 'Tarjeta de Crédito', 'Pago Móvil'];
    // Convertir claves numéricas a nombres
    const metodosPagoPorNombre: { [key: string]: number } = {};
    Object.entries(this.stats.metodosPago).forEach(([key, count]) => {
      const nombre = paymentMethodMap[Number(key)];
      if (nombre) {
        metodosPagoPorNombre[nombre] = count;
      }
    });
    // Obtener conteos reales o 0 si no existen
    const methodCounts = fixedMethods.map(name => ({
      name,
      count: metodosPagoPorNombre[name] || 0
    }));
    // Calcular el máximo para proporción
    const maxCount = Math.max(...methodCounts.map(m => m.count), 1); // evitar división por 0
    this.paymentMethods = methodCounts.map(m => ({
      ...m,
      percentage: maxCount > 0 ? (m.count / maxCount) * 100 : 0
    }));
    // Calcular máximo para la tendencia mensual
    this.maxTrendAmount = Math.max(...this.stats.tendenciaMensual.map(t => t.cantidad), 0);
  }

  getTrendHeight(amount: number): number {
    return this.maxTrendAmount > 0 ? (amount / this.maxTrendAmount) * 100 : 0;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
