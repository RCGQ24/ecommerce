import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentHistoryService } from '../../../services/payment-history.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

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
  selector: 'app-user-payment-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-payment-history.component.html',
  styleUrls: ['./user-payment-history.component.scss']
})
export class UserPaymentHistoryComponent implements OnInit, OnDestroy {
  payments: PaymentHistory[] = [];
  filteredPayments: PaymentHistory[] = [];
  selectedPayment: PaymentHistory | null = null;
  filter: PaymentHistoryFilter = {};
  
  totalSpent: number = 0;
  completedCount: number = 0;
  loading: boolean = true;
  
  private userSubscription: Subscription | null = null;

  constructor(
    private paymentHistoryService: PaymentHistoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Restaurar filtros guardados
    const savedFilters = localStorage.getItem('userPaymentHistoryFilters');
    if (savedFilters) {
      this.filter = JSON.parse(savedFilters);
    }
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  private initializeComponent(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.loadUserPayments(user.email);
      } else {
        this.clearData();
      }
    });
  }

  private loadUserPayments(userEmail: string): void {
    this.loading = true;
    this.payments = [];
    this.filteredPayments = [];
    
    console.log('Cargando pagos para email:', userEmail);
    
    this.paymentHistoryService.getUserPaymentHistoryByEmail(userEmail).subscribe({
      next: (payments: any[]) => {
        console.log('Pagos recibidos:', payments);
        this.payments = payments || [];
        this.applyFilters();
        this.updateTotals();
        this.loading = false;
        console.log('Pagos procesados:', this.payments.length);
      },
      error: (error: any) => {
        console.error('Error cargando historial de pagos:', error);
        this.loading = false;
      }
    });
  }

  private clearData(): void {
    this.payments = [];
    this.filteredPayments = [];
    this.selectedPayment = null;
    this.totalSpent = 0;
    this.completedCount = 0;
    this.loading = false;
  }

  private updateTotals(): void {
    this.totalSpent = this.payments
      .filter(payment => payment.estado_pago === 'completado')
      .reduce((total, payment) => total + this.getSafeAmount(payment.monto_pago), 0);
    
    this.completedCount = this.payments.filter(payment => payment.estado_pago === 'completado').length;
  }

  applyFilters(): void {
    // Guardar filtros en localStorage
    localStorage.setItem('userPaymentHistoryFilters', JSON.stringify(this.filter));
    this.filteredPayments = this.payments.filter(payment => {
      let matches = true;
      if (this.filter.date) {
        // Extraer año, mes y día del filtro
        const [filterYear, filterMonth, filterDay] = this.filter.date.split('-').map(Number);
        // Extraer año, mes y día de la fecha del pago
        const paymentDateObj = new Date(payment.fecha_pago);
        const paymentYear = paymentDateObj.getFullYear();
        const paymentMonth = paymentDateObj.getMonth() + 1;
        const paymentDay = paymentDateObj.getDate();
        matches = matches &&
          filterYear === paymentYear &&
          filterMonth === paymentMonth &&
          filterDay === paymentDay;
      }
      if (this.filter.status) {
        matches = matches && payment.estado_pago === this.filter.status;
      }
      if (this.filter.paymentMethod) {
        matches = matches && payment.id_metodo_pago.toString() === this.filter.paymentMethod;
      }
      return matches;
    });
  }

  clearFilters(): void {
    this.filter = {};
    localStorage.removeItem('userPaymentHistoryFilters');
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(this.filter.date || this.filter.status || this.filter.paymentMethod);
  }

  viewDetails(payment: PaymentHistory): void {
    this.selectedPayment = payment;
  }

  closeDetails(): void {
    this.selectedPayment = null;
  }

  getSafeAmount(amount: any): number {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return 0;
    }
    return parseFloat(amount);
  }

  getPaymentMethodName(id: number): string {
    const methods = {
      1: 'Tarjeta de Crédito',
      2: 'Tarjeta de Débito',
      3: 'Pago Móvil'
    };
    return methods[id as keyof typeof methods] || 'Método desconocido';
  }

  getPaymentMethodIcon(id: number): string {
    const icons = {
      1: 'fa-credit-card',
      2: 'fa-credit-card',
      3: 'fa-mobile-alt'
    };
    return icons[id as keyof typeof icons] || 'fa-credit-card';
  }

  getStatusIcon(status: string): string {
    const icons = {
      'completado': 'fa-check-circle',
      'fallido': 'fa-times-circle',
      'pendiente': 'fa-clock'
    };
    return icons[status as keyof typeof icons] || 'fa-question-circle';
  }

  trackByPaymentId(index: number, payment: PaymentHistory): number {
    return payment.id;
  }

  trackByProductId(index: number, product: any): number {
    return product.id || index;
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
  }
} 
