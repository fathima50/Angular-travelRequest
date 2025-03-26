import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TravelRequestViewService } from '../services/travel-request-view.service';
import { AuthLoginService } from '../services/auth-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '', role: '' };
  errorMessage: string = '';

  constructor(private authLoginService: AuthLoginService, private router: Router) {}

 

  onSubmit() {
    this.authLoginService.login(this.loginData.username, this.loginData.password, this.loginData.role).subscribe({
      next: (response) => {
        console.log("🔹 Full Login Response from Server:", response);  // Debugging

        if (!response || !response.token || !response.role) {
          console.error("🔴 Invalid Response from Server:", response);
          this.errorMessage = 'Invalid response from server!';
          return;
        }

        localStorage.setItem('access_token', response.token);
        localStorage.setItem('role', response.role);

        if (response.profile) {
          if (response.role === 'employee') {
              // Store Employee Details
              localStorage.setItem('employee_name', response.profile.name || 'N/A');
              localStorage.setItem('employee_email', response.profile.email || 'N/A');
              localStorage.setItem('employee_status', response.profile.status || 'N/A');
              localStorage.setItem('manager_id', response.profile.manager_id ? response.profile.manager_id.toString() : '');
            } else if (response.role === 'manager') {
              // Store Manager Details
              localStorage.setItem('manager_name', response.profile.name || 'N/A');
              localStorage.setItem('manager_email', response.profile.email || 'N/A');
              localStorage.setItem('manager_status', response.profile.status || 'N/A');
            }
          } else {
            console.warn('⚠️ Profile data is missing in the response.');
          }

        this.redirectUser(response.role);
      },
      error: (error) => {
        console.error("🔴 Login Error:", error);
        this.errorMessage = 'Invalid username or password!';
      }
    });
}
  

  redirectUser(role: string) {
    if (role === 'employee') {
      this.router.navigate(['/employee/dashboard']);
    } else if (role === 'manager') {
      this.router.navigate(['/manager/dashboard']);
    } else if (role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMessage = 'Unknown role';
    }
  }

 
}


 






 
  






