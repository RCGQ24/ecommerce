import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { catchError, tap } from 'rxjs/operators';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();
  private apiUrl = 'http://localhost:8000/api/carritos';

  constructor(private http: HttpClient, private authService: AuthService) {
    // Suscribirse a los cambios de usuario para cargar el carrito correcto
    this.authService.currentUser$.subscribe(user => {
      if (user && user.id) {
        this.loadCartFromBackend();
      } else {
        this.itemsSubject.next([]); // Limpia el carrito si no hay usuario
      }
    });
  }

  private saveCartToBackend(items: CartItem[]): Observable<any> {
    const userId = this.authService.currentUser?.id;
    if (!userId) {
      return throwError(() => new Error('Usuario no autenticado'));
    }
    return this.http.put(`${this.apiUrl}/${userId}`, { items }).pipe(
      catchError(error => {
        console.error('Error al guardar el carrito:', error);
        return throwError(() => error);
      })
    );
  }

  private loadCartFromBackend(): void {
    const userId = this.authService.currentUser?.id;
    if (!userId) {
      this.itemsSubject.next([]);
      return;
    }
    this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      catchError(error => {
        console.error('Error al cargar el carrito:', error);
        this.itemsSubject.next([]);
        return throwError(() => error);
      })
    ).subscribe(
      res => {
        if (res && res.items && Array.isArray(res.items)) {
          this.itemsSubject.next(res.items);
        } else {
          this.itemsSubject.next([]);
        }
      }
    );
  }

  addToCart(item: CartItem): void {
    const currentItems = this.itemsSubject.value;
    const existingItem = currentItems.find(i => i.id === item.id);
    let updatedItems;
    
    if (existingItem) {
      updatedItems = currentItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updatedItems = [...currentItems, { ...item, quantity: 1 }];
    }
    
    this.saveCartToBackend(updatedItems).subscribe(
      () => this.itemsSubject.next(updatedItems),
      error => console.error('Error al agregar al carrito:', error)
    );
  }

  updateQuantity(itemId: number, quantity: number): void {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    
    this.saveCartToBackend(updatedItems).subscribe(
      () => this.itemsSubject.next(updatedItems),
      error => console.error('Error al actualizar cantidad:', error)
    );
  }

  removeFromCart(itemId: number): void {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    
    this.saveCartToBackend(updatedItems).subscribe(
      () => this.itemsSubject.next(updatedItems),
      error => console.error('Error al eliminar del carrito:', error)
    );
  }

  clearCart(): void {
    const userId = this.authService.currentUser?.id;
    if (!userId) return;
    
    this.http.put(`${this.apiUrl}/${userId}`, { items: [] }).subscribe(
      () => this.itemsSubject.next([]),
      error => console.error('Error al limpiar el carrito:', error)
    );
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  getTotalCount(): number {
    return this.itemsSubject.value.reduce((acc, item) => acc + item.quantity, 0);
  }

  incrementQuantity(id: number) {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    this.itemsSubject.next(updatedItems);
    this.saveCartToBackend(updatedItems);
  }

  decrementQuantity(id: number) {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    this.itemsSubject.next(updatedItems);
    this.saveCartToBackend(updatedItems);
  }
}
