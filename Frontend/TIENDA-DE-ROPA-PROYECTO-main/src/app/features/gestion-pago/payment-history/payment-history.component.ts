import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentHistoryService } from '../../../services/payment-history.service';
import { AuthService } from '../../../services/auth.service';

interface PaymentHistory {
  id: string;
  date: Date;
  amount: number;
  paymentMethod: string;
  status: 'completed' | 'failed';
  userId: string;
  userEmail: string;
  transactionDetails: {
    items: {
      productName: string;
      quantity: number;
      price: number;
    }[];
  };
}

interface PaymentHistoryFilter {
  startDate?: Date;
  endDate?: Date;
  status?: string;
  paymentMethod?: string;
}

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="payment-history-container">
      <div class="header">
        <h2>Historial de Pagos - Todos los Usuarios</h2>
        <p class="subtitle">Gestiona y visualiza todas las transacciones realizadas en la plataforma</p>
      </div>
      
      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card total-sales">
          <i class="fas fa-chart-line"></i>
          <div class="card-content">
            <h3>Ventas Totales</h3>
            <p>{{ getTotalSales() | currency }}</p>
          </div>
        </div>
        <div class="summary-card completed">
          <i class="fas fa-check-circle"></i>
          <div class="card-content">
            <h3>Pagos Completados</h3>
            <p>{{ getCompletedCount() }}</p>
          </div>
        </div>

        <div class="summary-card failed">
          <i class="fas fa-exclamation-circle"></i>
          <div class="card-content">
            <h3>Pagos Fallidos</h3>
            <p>{{ getFailedCount() }}</p>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters">
        <div class="filter-group">
          <label>
            <i class="fas fa-calendar"></i>
            Fecha Inicio
          </label>
          <input 
            type="date" 
            [(ngModel)]="filter.startDate" 
            (change)="applyFilters()"
            class="date-input"
          >
        </div>
        <div class="filter-group">
          <label>
            <i class="fas fa-calendar"></i>
            Fecha Fin
          </label>
          <input 
            type="date" 
            [(ngModel)]="filter.endDate" 
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
            <option value="completed">Completado</option>
            <option value="failed">Fallido</option>
          </select>
        </div>
        <div class="filter-group">
          <label>
            <i class="fas fa-credit-card"></i>
            Método de Pago
          </label>
          <select [(ngModel)]="filter.paymentMethod" (change)="applyFilters()">
            <option value="">Todos</option>
            <option value="credit">Tarjeta de Crédito</option>
            <option value="debit">Tarjeta de Débito</option>
            <option value="pagoMovil">Pago Móvil</option>
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
              <th>Usuario</th>
              <th>ID Transacción</th>
              <th>Monto</th>
              <th>Método de Pago</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let payment of payments">
              <td>{{payment.date | date:'dd/MM/yyyy HH:mm'}}</td>
              <td>
                <div class="user-info">
                  <i class="fas fa-user"></i>
                  {{payment.userEmail}}
                </div>
              </td>
              <td>
                <span class="transaction-id">{{payment.id}}</span>
              </td>
              <td>
                <span class="amount">{{payment.amount | currency}}</span>
              </td>
              <td>
                <span class="payment-method">
                  <i class="fas" [ngClass]="{
                    'fa-credit-card': payment.paymentMethod === 'credit' || payment.paymentMethod === 'debit',
                    'fa-mobile-alt': payment.paymentMethod === 'pagoMovil'
                  }"></i>
                  {{payment.paymentMethod}}
                </span>
              </td>
              <td>
                <span class="status-badge" [class]="payment.status">
                  <i class="fas" [ngClass]="{
                    'fa-check-circle': payment.status === 'completed',
                    'fa-times-circle': payment.status === 'failed'
                  }"></i>
                  {{payment.status}}
                </span>
              </td>
              <td>
                <button class="view-details" (click)="viewDetails(payment)">
                  <i class="fas fa-eye"></i>
                  Ver Detalles
                </button>
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
              <label>Usuario</label>
              <p>{{selectedPayment.userEmail}}</p>
            </div>
            <div class="detail-group">
              <label>ID Transacción</label>
              <p>{{selectedPayment.id}}</p>
            </div>
            <div class="detail-group">
              <label>Fecha</label>
              <p>{{selectedPayment.date | date:'dd/MM/yyyy HH:mm'}}</p>
            </div>
            <div class="detail-group">
              <label>Monto Total</label>
              <p class="amount">{{selectedPayment.amount | currency}}</p>
            </div>
            <div class="detail-group">
              <label>Método de Pago</label>
              <p>{{selectedPayment.paymentMethod}}</p>
            </div>
            <div class="detail-group">
              <label>Estado</label>
              <span class="status-badge" [class]="selectedPayment.status">
                {{selectedPayment.status}}
              </span>
            </div>
            <div class="items-section">
              <h4>Productos</h4>
              <div class="items-list">
                <div class="item" *ngFor="let item of selectedPayment.transactionDetails.items">
                  <div class="item-details">
                    <p class="item-name">{{item.productName}}</p>
                    <p class="item-quantity">Cantidad: {{item.quantity}}</p>
                    <p class="item-price">{{item.price | currency}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  payments: PaymentHistory[] = [];
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
    this.paymentHistoryService.getAllPaymentHistory(this.filter)
      .subscribe(payments => this.payments = payments);
  }

  applyFilters() {
    this.loadPaymentHistory();
  }

  clearFilters() {
    this.filter = {};
    this.loadPaymentHistory();
  }

  viewDetails(payment: PaymentHistory) {
    this.selectedPayment = payment;
  }

  closeDetails() {
    this.selectedPayment = null;
  }

  getTotalSales(): number {
    return this.payments.reduce((total, payment) => 
      payment.status === 'completed' ? total + payment.amount : total, 0);
  }

  getCompletedCount(): number {
    return this.payments.filter(payment => payment.status === 'completed').length;
  }



  getFailedCount(): number {
    return this.payments.filter(payment => payment.status === 'failed').length;
  }
} 