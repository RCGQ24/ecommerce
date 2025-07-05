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
  selector: 'app-user-payment-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="payment-history-container">
      <div class="header">
        <h2>Mi Historial de Pagos</h2>
        <p class="subtitle">Visualiza y gestiona tus transacciones</p>
      </div>
      
      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card total-spent">
          <i class="fas fa-wallet"></i>
          <div class="card-content">
            <h3>Total Gastado</h3>
            <p>{{ getTotalSpent() | currency }}</p>
          </div>
        </div>
        <div class="summary-card completed">
          <i class="fas fa-check-circle"></i>
          <div class="card-content">
            <h3>Compras Completadas</h3>
            <p>{{ getCompletedCount() }}</p>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters">
        <div class="filter-group">
          <label>
            <i class="fas fa-calendar"></i>
            Fecha
          </label>
          <input 
            type="date" 
            [(ngModel)]="filter.date" 
            (change)="applyFilters()"
            class="date-input"
          >
        </div>
        <div class="filter-group">
          <label>
            <i class="fas fa-filter"></i>
            Estado
          </label>
          <select [(ngModel)]="filter.status" (change)="applyFilters()">
            <option value="">Todos</option>
            <option value="completado">Completado</option>
            <option value="fallido">Fallido</option>
          </select>
        </div>
        <div class="filter-group">
          <label>
            <i class="fas fa-credit-card"></i>
            Método de Pago
          </label>
          <select [(ngModel)]="filter.paymentMethod" (change)="applyFilters()">
            <option value="">Todos</option>
            <option value="1">Tarjeta de Crédito</option>
            <option value="2">Tarjeta de Débito</option>
            <option value="3">Pago Móvil</option>
          </select>
        </div>
        <button class="clear-filters" (click)="clearFilters()">
          <i class="fas fa-times"></i>
          Limpiar Filtros
        </button>
      </div>

      <!-- Payment History Table -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>ID Transacción</th>
              <th>Monto</th>
              <th>Método de Pago</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let payment of filteredPayments">
              <td>{{payment.fecha_pago | date:'dd/MM/yyyy'}}</td>
              <td>
                <span class="transaction-id">{{payment.id}}</span>
              </td>
              <td>
                <span class="amount">{{payment.monto_pago | currency}}</span>
              </td>
              <td>
                <span class="payment-method">{{getPaymentMethodName(payment.id_metodo_pago)}}</span>
              </td>
              <td>
                <span class="status-badge">{{payment.estado_pago}}</span>
              </td>
              <td>
                <button class="view-details" (click)="viewDetails(payment)">
                  <i class="fas fa-eye"></i>
                  Ver Detalles
                </button>
              </td>
            </tr>
            <tr *ngIf="filteredPayments.length === 0">
              <td colspan="6" class="no-records">
                <i class="fas fa-shopping-bag"></i>
                <p>No hay compras registradas</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Payment Details Modal -->
      <div class="modal" *ngIf="selectedPayment">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Detalles del Pago</h3>
            <button class="close-modal" (click)="closeDetails()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="payment-details">
            <div class="detail-group">
              <label>ID Transacción</label>
              <p>{{selectedPayment.id}}</p>
            </div>
            <div class="detail-group">
              <label>Fecha</label>
              <p>{{selectedPayment.fecha_pago | date:'dd/MM/yyyy HH:mm'}}</p>
            </div>
            <div class="detail-group">
              <label>Monto Total</label>
              <p class="amount">{{selectedPayment.monto_pago | currency}}</p>
            </div>
            <div class="detail-group">
              <label>Método de Pago</label>
              <p>{{getPaymentMethodName(selectedPayment.id_metodo_pago)}}</p>
            </div>
            <div class="detail-group">
              <label>Estado</label>
              <span class="status-badge" [class]="selectedPayment.estado_pago">
                {{selectedPayment.estado_pago | titlecase}}
              </span>
            </div>
            <div class="detail-group">
              <label>Email usuario</label>
              <p>{{selectedPayment.email_usuario}}</p>
            </div>
            <div class="items-section">
              <h4>Productos</h4>
              <div class="items-list">
                <div class="item" *ngFor="let item of selectedPayment.productos">
                  <img *ngIf="item.url_imagen || item.image" [src]="item.url_imagen || item.image" alt="{{item.nombre || item.productName}}" width="80" height="80" style="margin-right: 12px; border-radius: 8px; object-fit: cover;" />
                  <div class="item-details">
                    <p class="item-name">{{item.nombre || item.productName}}</p>
                    <p class="item-quantity">Cantidad: {{item.cantidad || item.quantity}}</p>
                    <p class="item-price">{{item.precio || item.price | currency}} <span style="font-size:0.95em;color:#888;">c/u</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./user-payment-history.component.scss']
})export class UserPaymentHistoryComponent implements OnInit {
  payments: any[] = [];
  filteredPayments: any[] = [];
  selectedPayment: PaymentHistory | null = null;
  filter: PaymentHistoryFilter = {};

  constructor(
    private paymentHistoryService: PaymentHistoryService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const email = this.authService.currentUser?.email;
    // Restaurar filtros desde localStorage si existen
    const savedFilters = localStorage.getItem('userPaymentHistoryFilters');
    if (savedFilters) {
      this.filter = JSON.parse(savedFilters);
    }
    if (email) {
      this.paymentHistoryService.getUserPaymentHistoryByEmail(email).subscribe(pagos => {
        this.payments = pagos;
        this.filteredPayments = pagos;
        // Aplicar filtros restaurados si existen
        if (savedFilters) {
          this.applyFilters();
        }
      });
    }
  }

  applyFilters() {
    // Guardar filtros en localStorage
    localStorage.setItem('userPaymentHistoryFilters', JSON.stringify(this.filter));
    console.log('Fecha seleccionada en filtro:', this.filter.date);
    this.filteredPayments = this.payments.filter(payment => {
      let matchesStatus = true;
      let matchesPaymentMethod = true;
      let matchesDate = true;

      // Filtrar por estado
      if (this.filter.status && this.filter.status !== '') {
        matchesStatus = payment.estado_pago === this.filter.status;
      }

      // Filtrar por método de pago
      if (this.filter.paymentMethod && this.filter.paymentMethod !== '') {
        matchesPaymentMethod = payment.id_metodo_pago.toString() === this.filter.paymentMethod;
      }

      // Filtrar por fecha (comparando solo la parte YYYY-MM-DD como string)
      if (this.filter.date && this.filter.date !== '') {
        const selectedDateStr = this.filter.date;
        const paymentDateStr = new Date(payment.fecha_pago).toISOString().slice(0, 10);
        matchesDate = selectedDateStr === paymentDateStr;
      }

      return matchesStatus && matchesPaymentMethod && matchesDate;
    });
    this.payments.forEach(p => console.log('Pago:', p.fecha_pago));
  }

  clearFilters() {
    this.filter = {};
    this.filteredPayments = this.payments;
    // Eliminar filtros guardados
    localStorage.removeItem('userPaymentHistoryFilters');
  }

  viewDetails(payment: PaymentHistory) {
    console.log('Pago seleccionado:', payment);
    console.log('Productos del pago:', payment.productos);
    this.selectedPayment = payment;
  }

  closeDetails() {
    this.selectedPayment = null;
  }

  getTotalSpent(): number {
    return this.payments.reduce((total, payment) => 
      payment.estado_pago === 'completado' ? total + payment.monto_pago : total, 0);
  }

  getCompletedCount(): number {
    return this.payments.filter(payment => payment.estado_pago === 'completado').length;
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
