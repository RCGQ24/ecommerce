import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../gestion-carrito/cart.service';
import { AuthService } from '../../services/auth.service';
import { PagoService, Pago } from '../../services/pago.service';
import { FacturaService } from '../../services/factura.service';

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

  // Datos para tarjeta
  cardHolder: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVV: string = '';
  cardID: string = '';

  // Datos para pago móvil
  pmBank: string = '';
  pmPhone: string = '';
  pmID: string = '';
  pmAmount: number = 0;
  pmDate: string = '';
  pmCedula: string = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private pagoService: PagoService,
    private facturaService: FacturaService
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
    if (methodId === 3) {
      this.pmAmount = this.getTotal();
    }
  }

  closePaymentPanel() {
    this.showPaymentForm = false;
    this.selectedPaymentMethod = 0;
  }

  // Validación de campos
  isCardValid(): boolean {
    return (
      this.cardHolder.trim().length > 0 &&
      /^\d{16}$/.test(this.cardNumber) &&
      /^\d{2}\/\d{2}$/.test(this.cardExpiry) &&
      /^\d{3}$/.test(this.cardCVV)
    );
  }

  isPagoMovilValid(): boolean {
    return (
      this.pmBank.trim().length > 0 &&
      /^\d{11}$/.test(this.pmPhone) &&
      this.pmID.trim().length > 0 &&
      this.pmAmount > 0 &&
      this.pmDate.trim().length > 0
    );
  }

  processPayment() {
    if (!this.selectedPaymentMethod) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    // Validar según método
    if (this.selectedPaymentMethod === 1 || this.selectedPaymentMethod === 2) {
      if (!this.isCardValid()) {
        alert('Por favor completa correctamente los datos de la tarjeta.');
        return;
      }
    }
    if (this.selectedPaymentMethod === 3) {
      this.pmAmount = this.getTotal();
      if (!this.isPagoMovilValid()) {
        alert('Por favor completa correctamente los datos de pago móvil.');
        return;
      }
    }

    const email = this.authService.getUserEmail().trim().toLowerCase();
    const productos = this.cartItems.map(item => ({
      id: item.id,
      nombre: item.name,
      precio: item.price,
      cantidad: item.quantity
    }));
    const pago: Pago = {
      id_metodo_pago: this.selectedPaymentMethod,
      monto_pago: this.getTotal(),
      estado_pago: 'completado',
      email_usuario: email,
      productos,
      // Puedes agregar aquí los datos de la tarjeta o pago móvil si quieres guardarlos
    };

    this.pagoService.registrarPago(pago).subscribe({
      next: (pagoGuardado) => {
        this.facturaService.generarFacturaDesdePago(
          pagoGuardado.id,
          pagoGuardado.monto_pago,
          productos,
          email
        ).subscribe({
          next: (factura) => {
            this.paymentStatus.isConfirmed = true;
            this.paymentStatus.message = '¡Pago procesado exitosamente!';
            setTimeout(() => {
              this.cartService.clearCart();
              this.router.navigate(['/factura', factura.id]);
            }, 2000);
          },
          error: (err) => {
            this.paymentStatus.isConfirmed = false;
            this.paymentStatus.message = 'Error al generar la factura';
          }
        });
      },
      error: (err) => {
        this.paymentStatus.isConfirmed = false;
        this.paymentStatus.message = 'Error al procesar el pago';
      }
    });
  }

  getPaymentMethodName(id: number): string {
    const method = this.paymentMethods.find(m => m.id === id);
    return method ? method.name : 'Método desconocido';
  }
} 