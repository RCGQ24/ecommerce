import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items$ = new BehaviorSubject<CartItem[]>([]);
  public items$ = this._items$.asObservable();

  get items(): CartItem[] {
    return this._items$.getValue();
  }

  addToCart(item: CartItem) {
    const current = this._items$.getValue();
    this._items$.next([...current, item]);
  }

  removeItem(id: number) {
    const current = this._items$.getValue();
    this._items$.next(current.filter(item => item.id !== id));
  }

  getTotalCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  incrementQuantity(id: number) {
    const current = this._items$.getValue();
    const updated = current.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    this._items$.next(updated);
  }

  decrementQuantity(id: number) {
    const current = this._items$.getValue();
    const updated = current.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    this._items$.next(updated);
  }

  clearCart(): void {
    this._items$.next([]);
  }
} 