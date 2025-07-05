import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../gestion-carrito/cart.service';
import { AuthService } from '../../services/auth.service';

interface PaymentMethod {
  id: number;
  name: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface PaymentStatus {
  isConfirmed: boolean;
  message: string;
}

@Component({
  selector: 'app-gestion-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-pago.component.html',
  styleUrls: ['./gestion-pago.component.scss']
})
export class GestionPagoComponent implements OnInit {
  cartItems: CartItem[] = [];
  selectedPaymentMethod: number = 0;
  showPaymentForm = false;
  paymentStatus: PaymentStatus = {
    isConfirmed: false,
    message: ''
  };

  paymentMethods: PaymentMethod[] = [
    { id: 1, name: 'Tarjeta de Crédito' },
    { id: 2, name: 'Tarjeta de Débito' },
    { id: 3, name: 'Pago Móvil' }
  ];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getItems();
    if (this.cartItems.length === 0) {
      this.router.navigate(['/catalogo']);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  selectPaymentMethod(methodId: number) {
    this.selectedPaymentMethod = methodId;
    this.showPaymentForm = true;
  }

  closePaymentPanel() {
    this.showPaymentForm = false;
    this.selectedPaymentMethod = 0;
  }

  processPayment() {
    if (!this.selectedPaymentMethod) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    // Simular procesamiento de pago
    this.paymentStatus.isConfirmed = true;
    this.paymentStatus.message = '¡Pago procesado exitosamente!';

    // Limpiar carrito después del pago
    setTimeout(() => {
      this.cartService.clearCart();
      this.router.navigate(['/catalogo']);
    }, 2000);
  }

  getPaymentMethodName(id: number): string {
    const method = this.paymentMethods.find(m => m.id === id);
    return method ? method.name : 'Método desconocido';
  }
} 