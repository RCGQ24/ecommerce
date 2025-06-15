import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Factura {
  id: number;
  id_pago: number;
  numero_factura: string;
  monto_total: number;
  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = `${environment.apiUrl}/facturas`;

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`);
  }

  createFactura(factura: Partial<Factura>): Observable<Factura> {
    return this.http.post<Factura>(this.apiUrl, factura);
  }

  updateFactura(id: number, factura: Partial<Factura>): Observable<Factura> {
    return this.http.put<Factura>(`${this.apiUrl}/${id}`, factura);
  }

  deleteFactura(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
