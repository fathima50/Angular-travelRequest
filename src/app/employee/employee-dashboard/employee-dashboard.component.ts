
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelRequestViewService } from '../../services/travel-request-view.service';
import { HttpClient } from '@angular/common/http';
import { Travelrequest } from '../../models/travelrequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLoginService } from '../../services/auth-login.service';
import { DatePipe } from '@angular/common';
declare var bootstrap: any;




@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
  providers: [DatePipe] 
})
export class EmployeeDashboardComponent implements OnInit {

//employee: any = null;
travelRequests: Travelrequest[] = [];
travelRequestForm: FormGroup;
errorMessage: string | null = null;
showRequestForm = false;

constructor(private fb: FormBuilder, private http: HttpClient, private authservice: AuthLoginService, private travelRequestViewService: TravelRequestViewService, private router: Router,private datePipe: DatePipe) {
  this.travelRequestForm = this.fb.group({
    from_location: ['', Validators.required],
    to_location: ['', Validators.required],
    travel_mode: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    purpose_of_travel: ['', Validators.required],
    lodging_required: [false],
    lodging_location: [''],
  });
}
employee = {
  name: '',
  email: '',
  status: '',
  manager_id: ''
};

ngOnInit(): void {
  this.loadEmployeeFromLocalStorage();
  this.fetchEmployeeDetails(); // Call API to get updated employee details
  this.fetchTravelRequests();
  setTimeout(() => {
    console.log("Final Travel Requests:", this.travelRequests);
  }, 2000); // ✅ Ensures it has time to fetch // Call API to get travel requests
}


loadEmployeeFromLocalStorage(): void {
  this.employee.name = localStorage.getItem('employee_name') || 'N/A';
  this.employee.email = localStorage.getItem('employee_email') || 'N/A';
  this.employee.status = localStorage.getItem('employee_status') || 'N/A';
  this.employee.manager_id = localStorage.getItem('manager_id') || 'N/A';

  console.log("Loaded Employee Data from Local Storage:", this.employee);
}

fetchEmployeeDetails(): void {
  const token = localStorage.getItem('access_token'); // Get token from local storage
  if (!token) {
    this.errorMessage = 'User is not authenticated.';
    return;
  }

  this.http.get<any>('http://127.0.0.1:8000/api/employee/details/', {
    headers: { Authorization: `Token ${token}` }
  }).subscribe(
    response => {
      this.employee = response.profile; // Employee details
        this.travelRequests = response.travel_requests; // Travel requests
        
        // Store updated details in localStorage for future use
        localStorage.setItem('employee_name', response.profile.name);
        localStorage.setItem('employee_email', response.profile.email);
        localStorage.setItem('employee_status', response.profile.status);
        if (response.profile.manager_id) {
          localStorage.setItem('manager_id', response.profile.manager_id);
      }
    },
    error => {
      this.errorMessage = 'Failed to load employee details.';
    }
  );
}




submitRequest() {
  if (this.travelRequestForm.valid) {
    const formData = { ...this.travelRequestForm.value };

    // Ensure date fields are in 'YYYY-MM-DD' format
    formData.start_date = this.formatDate(formData.start_date);
    formData.end_date = this.formatDate(formData.end_date);

    console.log("🔹 Sending Data to Django:", formData);  // ✅ Debugging Step

    this.travelRequestViewService.createTravelRequest(formData).subscribe({
      next: () => {
        alert('Travel request submitted successfully!');
        this.showRequestForm = false;
        this.fetchTravelRequests();
      },
      error: (error) => {
        alert('Failed to submit request');
        console.error("❌ Submission Error:", error); 
      }
    });
  }
}

formatDate(date: any): string {
  if (!date) return ''; // Ensure it's not undefined

  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
}


fetchTravelRequests(): void {
  this.travelRequestViewService.getEmployeeTravelRequests().subscribe({
    next: (response: any) => {
      console.log("API Response:", response); // ✅ Ensure it's an array
      if (Array.isArray(response)) {
        this.travelRequests = response; // ✅ Set only if it's an array
      } else {
        console.error("Invalid API response format:", response);
        this.travelRequests = []; // Ensure it doesn't break the template
      }
    },
    error: (error: any) => {
      console.error("Error fetching travel requests:", error);
      this.errorMessage = "Failed to load travel requests.";
    }
  });
}

selectedRequest: any = null;

viewDetails(request: any) {
  this.selectedRequest = request;
}


cancelRequest(requestId: number) {
  if (confirm('Are you sure you want to cancel this request?')) {
    this.travelRequestViewService.cancelTravelRequest(requestId).subscribe({
      next: () => {
        alert('Travel request cancelled successfully!');
        this.fetchTravelRequests(); // Refresh list
      },
      error:  (error) => {
        console.log(error)
        alert(error);
      }
    });
  }
}

logout() {
  this.authservice.logout();
  this.router.navigate(['/login']);
}

}

