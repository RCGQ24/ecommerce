import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../features/gestion-carrito/cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private cartService: CartService
  ) {
    // Check if user is logged in on service initialization
    this.checkAuthState();
  }

  private checkAuthState() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.isAuthenticatedSubject.next(true);
      this.userSubject.next(JSON.parse(usuario));
    }
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get currentUser$(): Observable<any> {
    return this.userSubject.asObservable();
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get currentUser(): any {
    return this.userSubject.value;
  }

  login(userData: any) {
    localStorage.setItem('usuario', JSON.stringify(userData));
    this.isAuthenticatedSubject.next(true);
    this.userSubject.next(userData);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
    // Clear cart items when logging out
    this.cartService.clearCart();
    // Redirect to main page (catalogo) instead of login
    this.router.navigate(['/catalogo']);
  }

  hasRole(roles: string[]): boolean {
    if (!this.currentUser) return false;
    return roles.includes(this.currentUser.rol);
  }
} 