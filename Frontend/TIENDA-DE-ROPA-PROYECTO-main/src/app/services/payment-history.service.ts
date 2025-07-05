import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface PaymentHistory {
  id: string;
  date: Date;
  amount: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  userId: string;
  userEmail: string;
  transactionDetails: {
    items: {
      productName: string;
      quantity: number;
      price: number;
    }[];
  };
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
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  getAllPaymentHistory(filters?: PaymentHistoryFilter): Observable<PaymentHistory[]> {
    let params = new URLSearchParams();
    if (filters) {
      if (filters.startDate) params.append('startDate', filters.startDate.toISOString());
      if (filters.endDate) params.append('endDate', filters.endDate.toISOString());
      if (filters.status) params.append('status', filters.status);
      if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
    }
    const url = `${this.apiUrl}${params.toString() ? '?' + params.toString() : ''}`;
    return this.http.get<PaymentHistory[]>(url);
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