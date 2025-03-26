import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthLoginService } from './auth-login.service';


@Injectable({
  providedIn: 'root',
})
export class TravelRequestViewService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Django API base URL

  constructor(private http: HttpClient, private authservice: AuthLoginService,private router: Router) {}

  // employee login
  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/login/`, { username, password });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  //to view employee requests
  getEmployeeTravelRequests(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    return this.http.get<any>(`${this.baseUrl}/travel-requests/view/`, { headers });
  }


  //create new travel request
  createTravelRequest(requestData: any): Observable<any> {
    const token = localStorage.getItem('access_token'); // ✅ Ensure the token is present
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });

    return this.http.post('http://127.0.0.1:8000/api/travel-requests/', requestData, {headers})
    };

    // cancel request
  cancelTravelRequest(requestId: number) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    console.log('Cancelling request with ID:', requestId);
    console.log(headers);
    return this.http.post(`${this.baseUrl}/travel-requests/cancel/${requestId}/`, {},{ headers});
  }


  //to view manager requests
  getManagerRequests(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    return this.http.get<any>(`${this.baseUrl}/manager/requests/`, { headers });
  }
  getManagerRequestsFilter(filters: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    return this.http.get<any>(`${this.baseUrl}/manager/requests/`, { headers, params: filters });
  }

  // to approve or reject request
  approveOrRejectRequest(requestId: number, action: string, managerNotes: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    return this.http.post(`${this.baseUrl}/travel-requests/approve-reject/${requestId}/`, { action, manager_notes: managerNotes }, { headers });
  }

  // to re request the request
  requestUpdate(requestId: number, notes : string): Observable<any> { 
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    console.log('before api call')
    return this.http.put(`${this.baseUrl}/manager/requests/update/${requestId}/`, { manager_notes: notes }, { headers });
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  //admin
  getAllRequests(filters: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    return this.http.get(`${this.baseUrl}/admin/requests/`, { headers , params: filters });
  }

  getRequestDetails(requestId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
    return this.http.get(`${this.baseUrl}/admin/requests/${requestId}/`, { } );
  }

  AdminrequestAdditionalInfo(requestId: number, adminNotes: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    return this.http.put(`${this.baseUrl}/admin/requests/${requestId}/request-info/`, { admin_notes: adminNotes }, { headers});
  }

  closeRequest(requestId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    return this.http.put(`${this.baseUrl}/admin/requests/${requestId}/close/`, {} ,{ headers });
  }
  
  //add a new user
  addUser(userData: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
  
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    return this.http.post(`${this.baseUrl}/add-manager-employee/`, userData, { headers });
  }

  getManagers(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("Token not found! User is not authenticated.");
      return new Observable(observer => {
        observer.error("User is not authenticated.");
      });
    }
  
    console.log("Using token:", token);  // Debugging log
  
    const headers = new HttpHeaders({'Authorization': `Token ${token}`});
  
    return this.http.get<any[]>(`${this.baseUrl}/get-managers/`, { headers });
  }
  
}
  
