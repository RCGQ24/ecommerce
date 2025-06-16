import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Factura {
  id?: number;
  id_pago: number;
  numero_factura: string;
  fecha_factura: string;
  monto_total: number;
  email: string;
  items?: {
    id: number;
    nombre: string;
    descripcion: string;
    talla: string;
    precio: number;
    cantidad: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = `${environment.apiUrl}/facturas`;

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener la factura:', error);
        return throwError(() => error);
      })
    );
  }

  createFactura(factura: Partial<Factura>): Observable<Factura> {
    console.log('Enviando datos de factura al backend:', factura);
    return this.http.post<Factura>(this.apiUrl, factura).pipe(
      catchError(error => {
        console.error('Error al crear la factura:', error);
        console.error('Detalles del error:', {
          status: error.status,
          statusText: error.statusText,
          error: error.error,
          message: error.message
        });
        return throwError(() => error);
      })
    );
  }

  updateFactura(id: number, factura: Partial<Factura>): Observable<Factura> {
    return this.http.put<Factura>(`${this.apiUrl}/${id}`, factura).pipe(
      catchError(error => {
        console.error('Error al actualizar la factura:', error);
        return throwError(() => error);
      })
    );
  }

  deleteFactura(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar la factura:', error);
        return throwError(() => error);
      })
    );
  }

  generarFacturaDesdePago(idPago: number, montoTotal: number, items: any[], email: string): Observable<Factura> {
    const factura = {
      id_pago: idPago,
      numero_factura: `FAC-${Date.now()}`,
      monto_total: montoTotal,
      fecha_factura: new Date().toISOString(),
      items: items,
      email: email
    };

    console.log('Generando factura con datos:', factura);
    return this.createFactura(factura);
  }
}
