import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface PaymentHistory {
  id: number;
  fecha_pago: string;
  monto_pago: number;
  id_metodo_pago: number;
  estado_pago: string;
  email_usuario: string;
  productos: any[];
}

interface PaymentHistoryFilter {
  startDate?: Date;
  endDate?: Date;
  status?: string;
  paymentMethod?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {
  private apiUrl = `${environment.apiUrl}/pagos`;

  constructor(private http: HttpClient) {}

  getAllPaymentHistory(filters?: PaymentHistoryFilter): Observable<any[]> {
    let params = new URLSearchParams();
    if (filters) {
      if (filters.startDate) params.append('startDate', filters.startDate.toISOString());
      if (filters.endDate) params.append('endDate', filters.endDate.toISOString());
      if (filters.status) params.append('status', filters.status);
      if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
    }
    const url = `${this.apiUrl}${params.toString() ? '?' + params.toString() : ''}`;
    return this.http.get<any[]>(url);
  }

  getUserPaymentHistory(userId: string, filters?: PaymentHistoryFilter): Observable<PaymentHistory[]> {
    let params = new URLSearchParams();
    if (filters) {
      if (filters.startDate) params.append('startDate', filters.startDate.toISOString());
      if (filters.endDate) params.append('endDate', filters.endDate.toISOString());
      if (filters.status) params.append('status', filters.status);
      if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
    }
    const url = `${this.apiUrl}/user/${userId}${params.toString() ? '?' + params.toString() : ''}`;
    return this.http.get<PaymentHistory[]>(url);
  }

  getUserPaymentHistoryByEmail(email: string): Observable<any[]> {
    const url = `${environment.apiUrl}/pagos?email_usuario=${encodeURIComponent(email)}`;
    return this.http.get<any[]>(url);
  }
} 