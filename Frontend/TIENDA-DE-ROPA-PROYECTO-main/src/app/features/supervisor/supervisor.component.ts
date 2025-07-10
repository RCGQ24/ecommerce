import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupervisorStats, PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.paymentService.getSupervisorStats().subscribe(stats => {
      this.stats = stats;
      this.calculateDerivedStats();
    });
  }

  private calculateDerivedStats() {
    // Calcular porcentajes de métodos de pago
    const total = Object.values(this.stats.metodosPago).reduce((a, b) => a + b, 0);
    this.paymentMethods = Object.entries(this.stats.metodosPago).map(([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0
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
