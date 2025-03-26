
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelRequestViewService } from '../../services/travel-request-view.service';
import { AuthLoginService } from '../../services/auth-login.service';
import { Router } from '@angular/router';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isAdmin = true;
  showAddUserModal = false;
  travelRequests: any[] = [];
  selectedRequest: any = null;
  filterForm: FormGroup;
  managers: any[] | undefined;
  addUserForm: any;

  constructor(
    private travelRequestService: TravelRequestViewService,
    private emailService:EmailService,
    private fb: FormBuilder,
    private authservice: AuthLoginService,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      employee: [''],
      manager: [''],
      start_date: [''],
      end_date: [''],
      status: [''],
      Admin_notes: ['']
    });

    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['employee', Validators.required],
      manager_id: [''],
      status: ['active', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchTravelRequests();
    this.checkAdminRole();
    this.fetchManagers();

  }
   
  fetchTravelRequests() {
    this.travelRequestService.getAllRequests({}).subscribe({
      next: (data: any) => {
        this.travelRequests = data; 
      },
      error: (error: any) => {
        console.error('Error fetching requests:', error);
      }
    });
  }

  filterRequests() {
    const filters = this.filterForm.value;
    this.travelRequestService.getAllRequests(filters).subscribe({
      next: (data: any) => {
        this.travelRequests = data; 
      },
      error: (error: any) => {
        console.error('Error fetching filtered requests:', error);
      }
    });
  }

  viewDetails(request: any) {
    this.selectedRequest = request;
  }

  // requestAdditionalInfo(id: number) {
  //   const Admin_notes= this.filterForm.get('Admin_notes')?.value || '';    
  //   this.travelRequestService.AdminrequestAdditionalInfo(id, Admin_notes).subscribe({
  //     next: () => {
  //       alert('Additional information requested successfully');
  //       this.fetchTravelRequests();
  //     },
  //     error: (error: any) => console.error('Error requesting additional info:', error)
  //   });
  // }

  closeRequest(id: number) {
    this.travelRequestService.closeRequest(id).subscribe({
      next: () => {
        alert('Request closed successfully');
        this.fetchTravelRequests();
      },
      error: (error: any) => console.error('Error closing request:', error)
    });
  }

  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

//add new user
  checkAdminRole() {
    // Check user role from local storage or an API call
    const userRole = localStorage.getItem('user_role'); 
    this.isAdmin = userRole === 'admin';
  }

  fetchManagers() {
    this.travelRequestService.getManagers().subscribe({
      next: (data) => {this.managers = data},
      error: (err) => console.error('Error fetching managers:', err)
    });
  }

  openAddUserModal() {
    this.fetchManagers(); // Ensure managers list is loaded before modal opens
    this.showAddUserModal = true;
  }

  closeAddUserModal() {
    this.showAddUserModal = false;
  }

  addUser() {
    const userData = { ...this.addUserForm.value };
    // If the user is a manager, remove `manager_id`
      if (userData.role === 'manager') {
        delete userData.manager_id;
      } else if (userData.role === 'employee') {
        if (!userData.manager_id) {
          delete userData.manager_id;  // Remove if it's empty
        } else {
          userData.manager_id = Number(userData.manager_id); // Convert to integer
        }
      }
      console.log("Final user data being sent:", JSON.stringify(userData)); // Debugging    
      this.travelRequestService.addUser(this.addUserForm.value).subscribe({
      next: (res) => {
        alert('User added successfully!');
        this.closeAddUserModal();
      },
      error: (err) => {
        console.error('Error adding user:', err);
        alert('Failed to add user');
      }
    });
  }

  requestAdditionalInfo(id: number) {
    const Admin_notes = this.filterForm.get('Admin_notes')?.value?.trim(); // Trim to remove spaces
  
    if (!Admin_notes) {
      alert('Admin notes are required before requesting additional info.');
      return;
    }
  
    this.emailService.sendEmail(id, Admin_notes).subscribe({
      next: () => {
        alert('Additional information requested successfully');
        this.fetchTravelRequests();
        this.selectedRequest = null; // Close modal after request
      },
      error: (error: any) => {
        console.error('Error requesting additional info:', error);
        alert('Failed to request additional information. Please try again.');
      }
    });
  }

}
