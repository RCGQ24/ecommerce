import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../gestion-carrito/cart.service';

@Component({
  selector: 'app-gestion-pago',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gestion-pago.component.html',
  styleUrls: ['./gestion-pago.component.scss']
})
export class GestionPagoComponent {
  cartItems: CartItem[] = [];
  showPaymentForm = false;
  selectedPaymentMethod: string = '';
  paymentInfo = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  };
  cardErrors = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  };
  pagoMovilInfo = {
    transactionId: '',
    isVerifying: false,
    isApproved: false,
    hasError: false
  };
  paymentStatus = {
    isProcessing: false,
    isConfirmed: false,
    error: ''
  };
  readonly VALID_TRANSACTION_ID = '6789';

  paymentMethods = [
    { id: 'credit', name: 'Tarjeta de Crédito' },
    { id: 'debit', name: 'Tarjeta de Débito' },
    { id: 'pagoMovil', name: 'Pago Móvil' }
  ];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  selectPaymentMethod(methodId: string): void {
    this.selectedPaymentMethod = methodId;
    this.showPaymentForm = true;
    this.resetPagoMovilStatus();
    this.resetCardErrors();
  }

  resetPagoMovilStatus(): void {
    this.pagoMovilInfo = {
      transactionId: '',
      isVerifying: false,
      isApproved: false,
      hasError: false
    };
  }

  resetCardErrors(): void {
    this.cardErrors = {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: ''
    };
  }

  validateCardNumber(cardNumber: string): boolean {
    // Remove spaces and non-digit characters
    const cleanNumber = cardNumber.replace(/\D/g, '');
    // Check if length is between 13 and 19 digits
    if (!/^\d{13,19}$/.test(cleanNumber)) {
      this.cardErrors.cardNumber = 'El número de tarjeta debe tener entre 13 y 19 dígitos';
      return false;
    }
    this.cardErrors.cardNumber = '';
    return true;
  }

  validateCardHolder(cardHolder: string): boolean {
    // Name should be at least 3 letters (in total, not per word), only letters and spaces
    const clean = cardHolder.replace(/[^A-Za-zÁáÉéÍíÓóÚúÑñ]/g, '');
    if (!/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(cardHolder) || clean.length < 3) {
      this.cardErrors.cardHolder = 'Nombre debe contener al menos 3 letras';
      return false;
    }
    this.cardErrors.cardHolder = '';
    return true;
  }

  formatCardNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += input[i];
    }
    this.paymentInfo.cardNumber = formatted.slice(0, 19);
  }

  formatExpiryDate(event: any): void {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 4) input = input.slice(0, 4);
    if (input.length > 2) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }
    this.paymentInfo.expiryDate = input;
  }

  validateExpiryDate(expiryDate: string): boolean {
    // Check format MM/YY
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      this.cardErrors.expiryDate = 'Formato debe ser MM/YY';
      return false;
    }
    const [month, year] = expiryDate.split('/');
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    // Validate month
    if (expMonth < 1 || expMonth > 12) {
      this.cardErrors.expiryDate = 'Mes debe estar entre 01 y 12';
      return false;
    }
    // Validate year and expiration
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      this.cardErrors.expiryDate = 'La tarjeta ha expirado';
      return false;
    }
    this.cardErrors.expiryDate = '';
    return true;
  }

  validateCVV(cvv: string): boolean {
    // CVV should be 3 or 4 digits
    if (!/^\d{3,4}$/.test(cvv)) {
      this.cardErrors.cvv = 'CVV debe ser 3 o 4 dígitos';
      return false;
    }
    this.cardErrors.cvv = '';
    return true;
  }

  verifyPagoMovil(): void {
    this.paymentStatus.isProcessing = true;
    this.pagoMovilInfo.isVerifying = true;
    this.pagoMovilInfo.hasError = false;
    
    setTimeout(() => {
      this.pagoMovilInfo.isVerifying = false;
      if (this.pagoMovilInfo.transactionId === this.VALID_TRANSACTION_ID) {
        this.handlePaymentSuccess();
      } else {
        this.pagoMovilInfo.hasError = true;
        this.paymentStatus.isProcessing = false;
      }
    }, 2000);
  }

  validateCardInfo(): boolean {
    const isCardNumberValid = this.validateCardNumber(this.paymentInfo.cardNumber);
    const isExpiryDateValid = this.validateExpiryDate(this.paymentInfo.expiryDate);
    const isCVVValid = this.validateCVV(this.paymentInfo.cvv);
    const isCardHolderValid = this.validateCardHolder(this.paymentInfo.cardHolder);

    return isCardNumberValid && isExpiryDateValid && isCVVValid && isCardHolderValid;
  }

  async processPay(): Promise<void> {
    if (this.selectedPaymentMethod === 'pagoMovil') {
      this.verifyPagoMovil();
    } else if (this.selectedPaymentMethod && this.validateCardInfo()) {
      this.paymentStatus.isProcessing = true;
      this.paymentStatus.error = '';

      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.handlePaymentSuccess();
      } catch (error) {
        this.paymentStatus.error = 'Error procesando el pago. Por favor, intente nuevamente.';
        this.paymentStatus.isProcessing = false;
      }
    }
  }

  private handlePaymentSuccess(): void {
    this.paymentStatus.isConfirmed = true;
    this.paymentStatus.isProcessing = false;
    this.pagoMovilInfo.isApproved = true;

    // Generar y guardar factura
    const factura = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString(),
      cliente: {
        nombre: 'Cliente Demo',
        email: 'ecommerce-app@gmail.com',
        direccion: 'Calle Ficticia 123, Ciudad, País'
      },
      productos: this.cartItems,
      subtotal: this.getTotal(),
      impuestos: +(this.getTotal() * 0.16).toFixed(2),
      total: +(this.getTotal() * 1.16).toFixed(2)
    };
    localStorage.setItem('facturaDemo', JSON.stringify(factura));

    this.cartService.emptyCartInBackend();

    setTimeout(() => {
      this.router.navigate(['/factura', 'demo']);
    }, 1000);
  }

  validatePaymentInfo(): boolean {
    if (this.selectedPaymentMethod === 'pagoMovil') {
      return true;
    }
    
    return !!(this.paymentInfo.cardNumber &&
      this.paymentInfo.expiryDate &&
      this.paymentInfo.cvv &&
      this.paymentInfo.cardHolder);
  }

  goBackToCart(): void {
    this.router.navigate(['/carrito']);
  }

  closePaymentPanel(): void {
    this.showPaymentForm = false;
    this.selectedPaymentMethod = '';
    this.resetCardErrors();
    this.resetPagoMovilStatus();
  }

  onCardHolderInput(event: any): void {
    this.paymentInfo.cardHolder = event.target.value;
    this.validateCardHolder(this.paymentInfo.cardHolder);
  }

  onCardNumberInput(event: any): void {
    let input = event.target.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += input[i];
    }
    this.paymentInfo.cardNumber = formatted.slice(0, 19);
    this.validateCardNumber(this.paymentInfo.cardNumber);
  }

  onExpiryDateInput(event: any): void {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 4) input = input.slice(0, 4);
    if (input.length > 2) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }
    this.paymentInfo.expiryDate = input;
    this.validateExpiryDate(this.paymentInfo.expiryDate);
  }

  onCVVInput(event: any): void {
    this.paymentInfo.cvv = event.target.value.replace(/\D/g, '').slice(0, 4);
    this.validateCVV(this.paymentInfo.cvv);
  }
} 