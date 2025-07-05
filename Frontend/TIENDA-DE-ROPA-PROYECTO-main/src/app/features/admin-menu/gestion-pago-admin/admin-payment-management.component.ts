import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagosService } from '../../../services/pagos.service';

@Component({
  selector: 'app-admin-payment-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-payment-management.component.html',
  styleUrls: ['./admin-payment-management.component.scss']
})
export class AdminPaymentManagementComponent implements OnInit {
  payments: any[] = [];
  filteredPayments: any[] = [];
  selectedPayment: any = null;
  selectedStatus = '';
  selectedMethod = '';
  selectedDate = '';
  isLoading = true;
  error = '';
  
  // Refund modal
  showRefundModal = false;
  refundAmount = 0;
  refundReason = '';

  constructor(private pagosService: PagosService) {}

  ngOnInit() {
    console.log('AdminPaymentManagementComponent: ngOnInit iniciado');
    this.loadSavedFilters(); // Cargar filtros guardados
    this.loadPayments();
  }

  // Cargar filtros guardados en localStorage
  loadSavedFilters() {
    const savedFilters = localStorage.getItem('adminPaymentFilters');
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      this.selectedStatus = filters.selectedStatus || '';
      this.selectedMethod = filters.selectedMethod || '';
      this.selectedDate = filters.selectedDate || '';
      console.log('Filtros cargados:', filters);
    }
  }

  // Guardar filtros en localStorage
  saveFilters() {
    const filters = {
      selectedStatus: this.selectedStatus,
      selectedMethod: this.selectedMethod,
      selectedDate: this.selectedDate
    };
    localStorage.setItem('adminPaymentFilters', JSON.stringify(filters));
    console.log('Filtros guardados:', filters);
  }

  loadPayments() {
    console.log('AdminPaymentManagementComponent: loadPayments iniciado');
    this.isLoading = true;
    this.error = '';
    
    this.pagosService.getAllPayments().subscribe({
      next: (payments: any[]) => {
        console.log('AdminPaymentManagementComponent: Pagos recibidos:', payments);
        this.payments = payments || [];
        this.applyFilters(); // Aplicar filtros existentes después de cargar
        this.isLoading = false;
        console.log('AdminPaymentManagementComponent: Pagos cargados:', this.payments.length);
      },
      error: (error) => {
        console.error('AdminPaymentManagementComponent: Error al cargar pagos:', error);
        this.error = 'Error al cargar los pagos: ' + error.message;
        this.isLoading = false;
        this.payments = [];
        this.filteredPayments = [];
      }
    });
  }

  applyFilters() {
    this.filteredPayments = this.payments.filter(payment => {
      let matchesStatus = true;
      let matchesMethod = true;
      let matchesDate = true;

      // Filtro por estado
      if (this.selectedStatus) {
        matchesStatus = payment.estado_pago === this.selectedStatus;
      }

      // Filtro por método de pago
      if (this.selectedMethod) {
        matchesMethod = payment.id_metodo_pago.toString() === this.selectedMethod;
      }

      // Filtro por fecha específica
      if (this.selectedDate) {
        const paymentDate = new Date(payment.fecha_pago);
        // selectedDate ya está en formato YYYY-MM-DD, solo formateo la fecha del pago
        const paymentDateFormatted = this.formatDateForComparison(paymentDate);
        
        console.log('Comparando fechas:', {
          paymentDate: payment.fecha_pago,
          paymentDateFormatted,
          selectedDate: this.selectedDate
        });
        
        matchesDate = paymentDateFormatted === this.selectedDate;
      }

      return matchesStatus && matchesMethod && matchesDate;
    });

    // Guardar filtros después de aplicarlos
    this.saveFilters();
  }

  // Método para formatear fecha del backend a formato YYYY-MM-DD
  formatDateForComparison(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  clearFilters() {
    this.selectedStatus = '';
    this.selectedMethod = '';
    this.selectedDate = '';
    this.filteredPayments = this.payments;
    // Limpiar también del localStorage
    localStorage.removeItem('adminPaymentFilters');
    console.log('Filtros limpiados');
  }

  viewPayment(payment: any) {
    console.log('Abriendo modal para pago:', payment);
    this.selectedPayment = payment;
  }

  closeModal() {
    console.log('Cerrando modal');
    this.selectedPayment = null;
  }

  changePaymentStatus(payment: any, event: any) {
    const newStatus = event.target.value;
    if (confirm(`¿Cambiar estado del pago #${payment.id} a "${newStatus}"?`)) {
      payment.estado_pago = newStatus;
      console.log(`Estado cambiado a: ${newStatus}`);
    }
  }

  processRefund(payment: any) {
    this.selectedPayment = payment;
    this.refundAmount = payment.monto_pago;
    this.showRefundModal = true;
  }

  closeRefundModal() {
    this.showRefundModal = false;
    this.refundAmount = 0;
    this.refundReason = '';
  }

  confirmRefund() {
    if (this.refundAmount && this.refundReason) {
      console.log(`Reembolso procesado: $${this.refundAmount} por ${this.refundReason}`);
      this.selectedPayment.estado_pago = 'reembolsado';
      this.closeRefundModal();
    }
  }

  getPaymentMethodName(id: number): string {
    switch (id) {
      case 1: return 'Tarjeta de Crédito';
      case 2: return 'Tarjeta de Débito';
      case 3: return 'Pago Móvil';
      default: return 'Método Desconocido';
    }
  }

  // Getter para verificar si el modal está visible
  get isModalVisible(): boolean {
    return !!this.selectedPayment;
  }
} 