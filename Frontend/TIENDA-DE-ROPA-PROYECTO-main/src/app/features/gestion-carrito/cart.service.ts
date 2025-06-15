import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

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
  private apiUrl = 'http://localhost:8000/api'; // URL completa del backend

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

  private saveCartToBackend(items: CartItem[]) {
    const userId = this.authService.currentUser?.id;
    if (!userId) return;
    this.http.put(`${this.apiUrl}/carritos/${userId}`, { items }).subscribe();
  }

  private loadCartFromBackend() {
    const userId = this.authService.currentUser?.id;
    if (!userId) {
      this.itemsSubject.next([]);
      return;
    }
    this.http.get<any>(`${this.apiUrl}/carritos/${userId}`).subscribe(
      res => {
        if (res && res.items && Array.isArray(res.items)) {
          this.itemsSubject.next(res.items);
        } else {
          this.itemsSubject.next([]);
        }
      },
      err => {
        this.itemsSubject.next([]);
      }
    );
  }

  addToCart(item: CartItem) {
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
    this.itemsSubject.next(updatedItems);
    this.saveCartToBackend(updatedItems);
  }

  updateQuantity(itemId: number, quantity: number) {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    this.itemsSubject.next(updatedItems);
    this.saveCartToBackend(updatedItems);
  }

  removeFromCart(itemId: number) {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.itemsSubject.next(updatedItems);
    this.saveCartToBackend(updatedItems);
  }

  clearCart() {
    this.itemsSubject.next([]); // Solo limpia el observable local
    // No borra el carrito en la base de datos
  }

  emptyCartInBackend() {
    const userId = this.authService.currentUser?.id;
    if (!userId) return;
    this.http.put(`${this.apiUrl}/carritos/${userId}`, { items: [] }).subscribe(() => {
      this.itemsSubject.next([]);
    });
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
