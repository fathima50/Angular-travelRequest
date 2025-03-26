import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  sendEmail(requestId: number, adminNotes: string): Observable<any> {
    const token = localStorage.getItem('access_token'); 
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    const url = `${this.apiUrl}/travel-request/${requestId}/send-email/`;
    return this.http.post(url, { admin_notes: adminNotes },{headers});
  }
}
