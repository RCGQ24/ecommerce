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
  numero_factura?: string;
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
  filterDate: string = '';
  filterStatus: string = '';
  filterPaymentMethod: string = '';
  loading: boolean = true;

  constructor(
    private paymentHistoryService: PaymentHistoryService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.loadAllPayments();
  }

  loadAllPayments() {
    this.loading = true;
    this.paymentHistoryService.getAllPaymentHistory().subscribe({
      next: (pagos: any[]) => {
        this.payments = pagos ? pagos.map(p => ({
          ...p,
          monto_pago: isNaN(Number(p.monto_pago)) ? 0 : Number(p.monto_pago)
        })) : [];
        this.filteredPayments = this.payments;
        this.loading = false;
      },
      error: (error) => {
        this.payments = [];
        this.filteredPayments = [];
        this.loading = false;
      }
    });
  }

  filterPayments() {
    this.filteredPayments = this.payments.filter(payment => {
      let matchesStatus = true;
      let matchesDate = true;
      let matchesPaymentMethod = true;
      
      if (this.filterStatus && this.filterStatus !== '') {
        matchesStatus = payment.estado_pago === this.filterStatus;
      }
      
      if (this.filterDate && this.filterDate !== '') {
        const [filterYear, filterMonth, filterDay] = this.filterDate.split('-').map(Number);
        const paymentDateObj = new Date(payment.fecha_pago);
        const paymentYear = paymentDateObj.getFullYear();
        const paymentMonth = paymentDateObj.getMonth() + 1;
        const paymentDay = paymentDateObj.getDate();
        matchesDate = filterYear === paymentYear && filterMonth === paymentMonth && filterDay === paymentDay;
      }

      if (this.filterPaymentMethod && this.filterPaymentMethod !== '') {
        matchesPaymentMethod = payment.id_metodo_pago.toString() === this.filterPaymentMethod;
      }
      
      return matchesStatus && matchesDate && matchesPaymentMethod;
    });
  }

  clearFilters() {
    this.filterDate = '';
    this.filterStatus = '';
    this.filterPaymentMethod = '';
    this.filteredPayments = this.payments;
  }

  viewDetails(payment: PaymentHistory) {
    this.selectedPayment = payment;
  }

  closeDetails() {
    this.selectedPayment = null;
  }

  getTotalAmount(): number {
    return this.filteredPayments.reduce((total, payment) => 
      payment.estado_pago === 'completado' ? total + payment.monto_pago : total, 0);
  }

  getCompletedCount(): number {
    return this.payments.filter(payment => payment.estado_pago === 'completado').length;
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