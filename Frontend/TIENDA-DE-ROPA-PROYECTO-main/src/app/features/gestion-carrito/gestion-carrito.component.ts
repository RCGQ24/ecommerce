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
  showConfirmDeleteModal = false;
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
      this.showDeleteConfirmation(item);
    }
  }

  showDeleteConfirmation(item: CartItem) {
    this.productToDelete = item;
    this.showConfirmDeleteModal = true;
  }

  cancelDeleteProduct() {
    this.showConfirmDeleteModal = false;
    this.productToDelete = null;
  }

  confirmDeleteProduct() {
    if (this.productToDelete) {
      this.cartService.removeFromCart(this.productToDelete.id);
      this.showConfirmDeleteModal = false;
      this.productToDelete = null;
      this.showSuccessModal = true;
    }
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

  closeContinueDeletingModal() {
    this.isConfirmModalVisible = false;
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

  closeEmptyCartModal() {
    this.showEmptyCartModal = false;
  }
}
