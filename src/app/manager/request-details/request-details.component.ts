
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css'
})
export class RequestDetailsComponent implements OnInit {
  request: any;
  managerNote: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const requestId = this.route.snapshot.paramMap.get('id');
    this.request = {
      id: requestId,
      fromLocation: 'New York',
      toLocation: 'London',
      travelMode: 'Flight',
      status: 'Pending',
      managerNote: '',  // Initialize manager note
    };
  }

  approveRequest() {
    if (this.managerNote.trim()) {
      this.request.status = 'Approved';
      this.request.managerNote = this.managerNote;
      alert('Request Approved with Note!');
    } else {
      alert('Please add a note before approving the request.');
    }
  }

  rejectRequest() {
    if (this.managerNote.trim()) {
      this.request.status = 'Rejected';
      this.request.managerNote = this.managerNote;
      alert('Request Rejected with Note!');
    } else {
      alert('Please add a note before rejecting the request.');
    }
  }
}
