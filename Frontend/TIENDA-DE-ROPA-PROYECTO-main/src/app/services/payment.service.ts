import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Payment {
  id: number;
  amount: number;
  method: string;
  date: Date;
  status: string;
}

export interface PaymentStats {
  totalAmount: number;
  totalTransactions: number;
  averageAmount: number;
  paymentMethods: { [key: string]: number };
  monthlyTrends: { month: string; amount: number }[];
}

export interface SupervisorStats {
  totalVentas: number;
  totalTransacciones: number;
  promedioPorVenta: number;
  metodosPago: { [key: string]: number };
  tendenciaMensual: { nombre: string; cantidad: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}`);
  }

  getPaymentStats(): Observable<PaymentStats> {
    return this.http.get<PaymentStats>(`${this.apiUrl}/stats`);
  }

  getSupervisorStats(): Observable<SupervisorStats> {
    return this.http.get<SupervisorStats>(`${environment.apiUrl}/estadisticas/supervisor`);
  }

  // This method processes raw payment data into stats if backend endpoint is not available
  calculateStats(payments: Payment[]): PaymentStats {
    const stats: PaymentStats = {
      totalAmount: 0,
      totalTransactions: payments.length,
      averageAmount: 0,
      paymentMethods: {},
      monthlyTrends: []
    };

    // Calculate total and payment methods
    payments.forEach(payment => {
      stats.totalAmount += payment.amount;
      stats.paymentMethods[payment.method] = (stats.paymentMethods[payment.method] || 0) + 1;
    });

    // Calculate average
    stats.averageAmount = stats.totalAmount / (stats.totalTransactions || 1);

    // Calculate monthly trends
    const monthlyData = new Map<string, number>();
    payments.forEach(payment => {
      const date = new Date(payment.date);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      monthlyData.set(monthKey, (monthlyData.get(monthKey) || 0) + payment.amount);
    });

    // Convert to array and sort by date
    stats.monthlyTrends = Array.from(monthlyData.entries())
      .map(([month, amount]) => ({
        month: new Date(month).toLocaleDateString('es', { month: 'short' }),
        amount
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6); // Last 6 months

    return stats;
  }
} 