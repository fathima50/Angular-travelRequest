import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TravelRequestViewService } from '../../services/travel-request-view.service';
import { AuthLoginService } from '../../services/auth-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  travelRequests: any[] = [];
  selectedRequest: any = null;
  filterForm: FormGroup;
  managerNotesForm: FormGroup;

  constructor(
    private travelRequestService: TravelRequestViewService,
    private fb: FormBuilder,
    private authservice: AuthLoginService,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      employee: [''],
      start_date: [''],
      end_date: [''],
      status: ['']
    });
    this.managerNotesForm = this.fb.group({
      manager_notes: ['']
    });
  }

  manager = {
    name: '',
    email: '',
    status: '',
    manager_id: ''
  };

  filters = {
    employee: '',
    start_date: '',
    end_date: '',
    status: ''
  };

  

  ngOnInit() {
    this.fetchTravelRequests();
    this.loadManagerFromLocalStorage()
    setInterval(() => this.fetchTravelRequests(), 30000); // Refresh every 30 sec
  }

  loadManagerFromLocalStorage(): void {
    this.manager.name = localStorage.getItem('manager_name') || 'N/A';
    this.manager.email = localStorage.getItem('manager_email') || 'N/A';
    this.manager.status = localStorage.getItem('manager_status') || 'N/A';
    this.manager.manager_id = localStorage.getItem('manager_id') || 'N/A';
  
    console.log("Loaded Employee Data from Local Storage:", this.manager);
  }
   
  fetchTravelRequests() {
    this.travelRequestService.getManagerRequests().subscribe({
      next: (data: any) => {
        console.log(data)
        this.travelRequests = data; 
        console.log(this.travelRequests); 
      },
      error: (error: any) => {
        console.error('Error fetching requests:', error);
      }
    });
  }

  fetchTravelRequestsFilter() {
    const filters = this.filterForm.value;
    this.travelRequestService.getManagerRequestsFilter(filters).subscribe({
      next: (data: any) => {
        console.log(data)
        this.travelRequests = data; 
        console.log(this.travelRequests); 
      },
      error: (error: any) => {
        console.error('Error fetching requests:', error);
      }
    });
  }

  viewDetails(request: any) {
    this.selectedRequest = request;
  }

  getfilteredRequests() {
    return this.travelRequests.filter((request) => {
      return (
        (!this.filters.employee || request.employee_name.toLowerCase().includes(this.filters.employee.toLowerCase())) &&
        (!this.filters.start_date || request.start_date >= this.filters.start_date) &&
        (!this.filters.end_date || request.end_date <= this.filters.end_date) &&
        (!this.filters.status || request.status === this.filters.status)
      );
    });
  }
  

  approveRequest(id: number) {
    const notes = this.managerNotesForm.value.manager_notes;

    this.travelRequestService.approveOrRejectRequest(id, 'approve',notes).subscribe({
      next: () => {
        alert('Request approved successfully');
        this.fetchTravelRequests();
      },
      error: (error: any) => console.error('Error approving request:', error)
    });
  }

  rejectRequest(id: number) {
    const notes = this.managerNotesForm.value.manager_notes;

    this.travelRequestService.approveOrRejectRequest(id, 'reject',notes).subscribe({
      next: () => {
        alert('Request rejected successfully');
        this.fetchTravelRequests();
      },
      error: (error: any) => console.error('Error rejecting request:', error)
    });
  }

  requestUpdate(id: number) {
    const notes = this.managerNotesForm.value.manager_notes;
    this.travelRequestService.requestUpdate(id, notes).subscribe({
      next: () => {
        alert('Update request sent successfully');
        this.fetchTravelRequests();
      },
      error: (error: any) => console.error('Error requesting update:', error)
    });
  }

  saveManagerNotes(request: any) {
    const notes = this.managerNotesForm.value.manager_notes;
    this.travelRequestService.requestUpdate(request.id, notes).subscribe({
      next: () => {
        alert('Manager notes saved successfully');
        this.fetchTravelRequests();
      },
      error: (error: any) => console.error('Error saving manager notes:', error)
    });
  }

  
  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
