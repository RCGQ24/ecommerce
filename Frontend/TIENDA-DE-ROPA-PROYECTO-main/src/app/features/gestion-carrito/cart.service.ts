import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
  private apiUrl = `${environment.apiUrl}/carritos`;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      if (user && user.id) {
        this.loadCartFromBackend();
      } else {
        this.itemsSubject.next([]);
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
      map(response => response.items || []),
      catchError(error => {
        console.error('Error al cargar el carrito:', error);
        this.itemsSubject.next([]);
        return throwError(() => error);
      })
    ).subscribe(
      items => {
        this.itemsSubject.next(items);
      }
    );
  }

  addToCart(item: CartItem): void {
    if (!item || !item.id) {
      console.error('Item inválido para agregar al carrito');
      return;
    }

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
    
    this.saveCartToBackend(updatedItems).subscribe({
      next: () => {
        this.itemsSubject.next(updatedItems);
        console.log('Producto agregado al carrito exitosamente');
      },
      error: (error) => {
        console.error('Error al agregar al carrito:', error);
        // Revertir cambios en caso de error
        this.itemsSubject.next(currentItems);
      }
    });
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(itemId);
      return;
    }

    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    
    this.saveCartToBackend(updatedItems).subscribe({
      next: () => this.itemsSubject.next(updatedItems),
      error: (error) => {
        console.error('Error al actualizar cantidad:', error);
        this.itemsSubject.next(currentItems);
      }
    });
  }

  removeFromCart(itemId: number): void {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    
    this.saveCartToBackend(updatedItems).subscribe({
      next: () => this.itemsSubject.next(updatedItems),
      error: (error) => {
        console.error('Error al eliminar del carrito:', error);
        this.itemsSubject.next(currentItems);
      }
    });
  }

  clearCart(): void {
    const userId = this.authService.currentUser?.id;
    if (!userId) return;
    
    this.http.put(`${this.apiUrl}/${userId}`, { items: [] }).subscribe({
      next: () => this.itemsSubject.next([]),
      error: (error) => {
        console.error('Error al limpiar el carrito:', error);
      }
    });
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  getTotalCount(): number {
    return this.itemsSubject.value.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.itemsSubject.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  incrementQuantity(id: number): void {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    
    this.saveCartToBackend(updatedItems).subscribe({
      next: () => this.itemsSubject.next(updatedItems),
      error: (error) => {
        console.error('Error al incrementar cantidad:', error);
        this.itemsSubject.next(currentItems);
      }
    });
  }

  decrementQuantity(id: number): void {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    
    this.saveCartToBackend(updatedItems).subscribe({
      next: () => this.itemsSubject.next(updatedItems),
      error: (error) => {
        console.error('Error al decrementar cantidad:', error);
        this.itemsSubject.next(currentItems);
      }
    });
  }
}
