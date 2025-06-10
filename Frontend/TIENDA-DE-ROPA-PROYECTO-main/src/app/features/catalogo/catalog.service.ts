import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>('/api/products').pipe(
      map(productos =>
        productos.map(p => ({
          id: p.id,
          name: p.nombre_producto,
          price: p.precio,
          image: p.url_imagen,
          colors: ['#4b2fbb', '#2fc5a9'], // puedes personalizar esto
        }))
      )
    );
  }

  findProduct(id: number): Observable<Product> {
    return this.http.get<any>(`/api/products/${id}`).pipe(
      map(p => ({
        id: p.id,
        name: p.nombre_producto,
        price: p.precio,
        image: p.url_imagen,
        colors: ['#4b2fbb', '#2fc5a9'], // igual que arriba
      }))
    );
  }
}