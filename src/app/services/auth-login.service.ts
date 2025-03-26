import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  private apiUrl = 'http://127.0.0.1:8000/api/login_user/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password, role });
  }

  logout() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
    localStorage.removeItem('token');
    return this.http.post('http://127.0.0.1:8000/api/login_user/', {
      headers,
    });
  }
  
}


