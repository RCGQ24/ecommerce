import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8000/api/productos'; // Cambia el puerto si es necesario

  constructor(private http: HttpClient) {}

  // Registrar un solo producto
  registrarProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }
}
