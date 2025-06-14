import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor() {
    // Load cart items from localStorage on service initialization
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      this.itemsSubject.next(JSON.parse(savedItems));
    }
  }

  private saveToLocalStorage(items: CartItem[]) {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  addToCart(item: CartItem) {
    const currentItems = this.itemsSubject.value;
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      const updatedItems = currentItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      this.itemsSubject.next(updatedItems);
    } else {
      this.itemsSubject.next([...currentItems, { ...item, quantity: 1 }]);
    }

    this.saveToLocalStorage(this.itemsSubject.value);
  }

  updateQuantity(itemId: number, quantity: number) {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    this.itemsSubject.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
  }

  removeFromCart(itemId: number) {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.itemsSubject.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
  }

  clearCart() {
    this.itemsSubject.next([]);
    localStorage.removeItem('cartItems');
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
    this.saveToLocalStorage(updatedItems);
  }

  decrementQuantity(id: number) {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    this.itemsSubject.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
  }
} 