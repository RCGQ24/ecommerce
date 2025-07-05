import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentHistoryService } from '../../../services/payment-history.service';
import { AuthService } from '../../../services/auth.service';

interface PaymentHistory {
  id: number;
  fecha_pago: string;
  monto_pago: number;
  id_metodo_pago: number;
  estado_pago: string;
  email_usuario: string;
  productos: any[];
}

interface PaymentHistoryFilter {
  date?: string;
  status?: string;
  paymentMethod?: string;
}

@Component({
  selector: 'app-admin-payment-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-payment-history.component.html',
  styleUrls: ['./admin-payment-history.component.scss']
})
export class AdminPaymentHistoryComponent implements OnInit {
  payments: any[] = [];
  filteredPayments: any[] = [];
  selectedPayment: PaymentHistory | null = null;
  filter: PaymentHistoryFilter = {};

  constructor(
    private paymentHistoryService: PaymentHistoryService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // Cargar TODOS los pagos (no solo del usuario actual)
    this.loadAllPayments();
    // Restaurar filtros desde localStorage si existen
    const savedFilters = localStorage.getItem('adminPaymentHistoryFilters');
    if (savedFilters) {
      this.filter = JSON.parse(savedFilters);
    }
  }

  loadAllPayments() {
    this.paymentHistoryService.getAllPaymentHistory().subscribe({
      next: (pagos: any[]) => {
        this.payments = pagos || [];
        this.filteredPayments = pagos || [];
        // Aplicar filtros restaurados si existen
        const savedFilters = localStorage.getItem('adminPaymentHistoryFilters');
        if (savedFilters) {
          this.applyFilters();
        }
      },
      error: (error) => {
        this.payments = [];
        this.filteredPayments = [];
      }
    });
  }

  applyFilters() {
    // Guardar filtros en localStorage
    localStorage.setItem('adminPaymentHistoryFilters', JSON.stringify(this.filter));
    this.filteredPayments = this.payments.filter(payment => {
      let matchesStatus = true;
      let matchesPaymentMethod = true;
      let matchesDate = true;
      if (this.filter.status && this.filter.status !== '') {
        matchesStatus = payment.estado_pago === this.filter.status;
      }
      if (this.filter.paymentMethod && this.filter.paymentMethod !== '') {
        matchesPaymentMethod = payment.id_metodo_pago.toString() === this.filter.paymentMethod;
      }
      if (this.filter.date && this.filter.date !== '') {
        const selectedDateStr = this.filter.date;
        const paymentDateStr = new Date(payment.fecha_pago).toISOString().slice(0, 10);
        matchesDate = selectedDateStr === paymentDateStr;
      }
      return matchesStatus && matchesPaymentMethod && matchesDate;
    });
  }

  clearFilters() {
    this.filter = {};
    this.filteredPayments = this.payments;
    localStorage.removeItem('adminPaymentHistoryFilters');
  }

  viewDetails(payment: PaymentHistory) {
    this.selectedPayment = payment;
  }

  closeDetails() {
    this.selectedPayment = null;
  }

  getCompletedCount(): number {
    return this.payments.filter(payment => payment.estado_pago === 'completado').length;
  }

  getTotalSpent(): number {
    return this.payments.reduce((total, payment) => 
      payment.estado_pago === 'completado' ? total + payment.monto_pago : total, 0);
  }

  getUniqueUsersCount(): number {
    const uniqueUsers = new Set(this.payments.map(payment => payment.email_usuario));
    return uniqueUsers.size;
  }

  getPaymentMethodName(id: number): string {
    switch (id) {
      case 1:
        return 'Tarjeta de Crédito';
      case 2:
        return 'Tarjeta de Débito';
      case 3:
        return 'Pago Móvil';
      default:
        return 'Método Desconocido';
    }
  }
} 