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
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  payments: any[] = [];
  filteredPayments: any[] = [];
  selectedPayment: PaymentHistory | null = null;
  filter: PaymentHistoryFilter = {};

  constructor(
    private paymentHistoryService: PaymentHistoryService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadPaymentHistory();
  }

  loadPaymentHistory() {
    this.paymentHistoryService.getAllPaymentHistory().subscribe((payments: any[]) => {
      this.payments = payments;
      this.filteredPayments = payments;
    });
  }

  applyFilters() {
    this.filteredPayments = this.payments.filter(payment => {
      let matchesDate = true;
      let matchesStatus = true;
      let matchesMethod = true;
      if (this.filter.date) {
        matchesDate = payment.fecha_pago && payment.fecha_pago.startsWith(this.filter.date);
      }
      if (this.filter.status) {
        matchesStatus = payment.estado_pago === this.filter.status;
      }
      if (this.filter.paymentMethod) {
        matchesMethod = payment.id_metodo_pago.toString() === this.filter.paymentMethod;
      }
      return matchesDate && matchesStatus && matchesMethod;
    });
  }

  clearFilters() {
    this.filter = {};
    this.filteredPayments = this.payments;
  }

  viewDetails(payment: PaymentHistory) {
    this.selectedPayment = payment;
  }

  closeDetails() {
    this.selectedPayment = null;
  }

  getTotalSales(): number {
    return this.payments.reduce((acc, p) => acc + (p.monto_pago || 0), 0);
  }

  getCompletedCount(): number {
    return this.payments.filter(p => p.estado_pago === 'completado').length;
  }

  getFailedCount(): number {
    return this.payments.filter(p => p.estado_pago === 'fallido').length;
  }

  getPaymentMethodName(id: number): string {
    switch (id) {
      case 1: return 'Tarjeta de Crédito';
      case 2: return 'Tarjeta de Débito';
      case 3: return 'Pago Móvil';
      default: return 'Método Desconocido';
    }
  }
} 