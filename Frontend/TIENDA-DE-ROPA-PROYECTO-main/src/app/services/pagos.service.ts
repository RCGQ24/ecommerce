import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Pago {
  id_metodo_pago: number;
  monto_pago: number;
  estado_pago: string;
  email_usuario: string;
  productos?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private apiUrl = `${environment.apiUrl}/pagos`;

  constructor(private http: HttpClient) { }

  registrarPago(pago: Pago): Observable<any> {
    return this.http.post(this.apiUrl, pago);
  }

  getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deletePago(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
