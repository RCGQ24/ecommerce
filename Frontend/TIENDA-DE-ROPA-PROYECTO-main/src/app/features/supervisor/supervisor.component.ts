import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentService, PaymentStats } from '../../services/payment.service';
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
  stats: PaymentStats = {
    totalAmount: 0,
    totalTransactions: 0,
    averageAmount: 0,
    paymentMethods: {},
    monthlyTrends: []
  };

  paymentMethods: { name: string; count: number; percentage: number }[] = [];
  maxTrendAmount = 0;

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Try to get stats directly, if that fails, calculate from raw payments
    this.paymentService.getPaymentStats().pipe(
      catchError(() => {
        // If stats endpoint fails, calculate from raw payments
        return this.paymentService.getPayments().pipe(
          map(payments => this.paymentService.calculateStats(payments))
        );
      })
    ).subscribe(stats => {
      this.stats = stats;
      this.calculateDerivedStats();
    });
  }

  private calculateDerivedStats() {
    // Calculate payment methods percentages
    const total = Object.values(this.stats.paymentMethods).reduce((a, b) => a + b, 0);
    this.paymentMethods = Object.entries(this.stats.paymentMethods).map(([name, count]) => ({
      name,
      count,
      percentage: (count / total) * 100
    }));

    // Calculate max trend amount for bar heights
    this.maxTrendAmount = Math.max(...this.stats.monthlyTrends.map(t => t.amount));
  }

  getTrendHeight(amount: number): number {
    return (amount / this.maxTrendAmount) * 100;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
