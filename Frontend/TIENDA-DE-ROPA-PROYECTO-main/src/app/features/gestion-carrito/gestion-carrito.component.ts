import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService, CartItem } from './cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-gestion-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-carrito.component.html',
  styleUrls: ['./gestion-carrito.component.scss']
})
export class GestionCarritoComponent {
  cartItems: CartItem[] = [];
  showConfirmModal = false;
  showLoginModal = false;
  showSuccessModal = false;
  showEmptyCartModal = false;
  isConfirmModalVisible = false;
  productToDelete: CartItem | null = null;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getProductProperty(property: keyof CartItem): string | number {
    return this.productToDelete ? this.productToDelete[property] : '';
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    } else {
      this.cartService.removeFromCart(item.id);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.id);
  }

  showDeleteConfirmation(item: CartItem) {
    this.productToDelete = item;
    this.showConfirmModal = true;
  }

  cancelDelete() {
    this.showConfirmModal = false;
    this.productToDelete = null;
  }

  confirmDelete() {
    if (this.productToDelete) {
      this.cartService.removeFromCart(this.productToDelete.id);
      this.showConfirmModal = false;
      this.productToDelete = null;
      this.showSuccessModal = true;
    }
  }

  proceedToCheckout() {
    if (!this.authService.isAuthenticated) {
      this.showLoginModal = true;
    } else {
      this.router.navigate(['/pago']);
    }
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  goToLogin() {
    this.showLoginModal = false;
    this.router.navigate(['/login'], { queryParams: { returnUrl: '/carrito' } });
  }

  finishDeleting() {
    this.showSuccessModal = false;
    if (this.cartItems.length === 0) {
      this.showEmptyCartModal = true;
    } else {
      this.isConfirmModalVisible = true;
    }
  }

  continueDeletingProducts() {
    this.isConfirmModalVisible = false;
  }

  closeEmptyCartModal() {
    this.showEmptyCartModal = false;
  }
}