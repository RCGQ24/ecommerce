import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService, CartItem } from './cart.service';

@Component({
  selector: 'app-gestion-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-carrito.component.html',
  styleUrl: './gestion-carrito.component.scss'
})
export class GestionCarritoComponent {
  cartItems: CartItem[] = [];
  showConfirmModal = false;
  showContinueDeleteModal = false;
  showEmptyCartModal = false;
  showSuccessModal = false;
  showPaymentSuccessModal = false;
  productToDelete: CartItem | null = null;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotal(): number {
    return this.getSubtotal();
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) return;
    this.router.navigate(['/pago']);
  }

  verFactura(): void {
    this.showPaymentSuccessModal = false;
    this.router.navigate(['/factura', 'demo']);
    if (this.cartItems.length > 0) {
      this.router.navigate(['/pago']);
    }
  }

  removeItem(item: CartItem): void {
    this.showConfirmModal = true;
    this.productToDelete = item;
  }

  cancelDelete(): void {
    this.showConfirmModal = false;
    this.productToDelete = null;
  }

  confirmDelete(): void {
    if (this.productToDelete) {
      this.cartService.removeItem(this.productToDelete.id);
      this.showConfirmModal = false;
      this.productToDelete = null;
      this.showSuccessModal = true;
    }
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    if (this.cartItems.length > 0) {
      this.showContinueDeleteModal = true;
    } else {
      this.showEmptyCartModal = true;
    }
  }

  continueDeletingProducts(): void {
    this.showContinueDeleteModal = false;
  }

  finishDeleting(): void {
    this.showContinueDeleteModal = false;
  }

  closeEmptyCartModal(): void {
    this.showEmptyCartModal = false;
  }

  isProductInCart(): boolean {
    if (!this.productToDelete) return false;
    return this.cartItems.some(item => item.id === this.productToDelete!.id);
  }

  incrementQuantity(item: CartItem): void {
    this.cartService.incrementQuantity(item.id);
  }

  decrementQuantity(item: CartItem): void {
    this.cartService.decrementQuantity(item.id);
  }
}