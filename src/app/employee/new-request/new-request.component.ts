

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent {
  travelRequestForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form with validation
    this.travelRequestForm = this.fb.group({
      fromLocation: ['', Validators.required],
      toLocation: ['', Validators.required],
      travelMode: ['', Validators.required],
      travelFromDate: ['', Validators.required],
      travelToDate: ['', Validators.required],
      additionalRequests: [''],
      isLodgingRequired: [false],
      lodgingLocation: [''],
      purposeOfTravel: ['', Validators.required],
      managerId: [1] // You can set this dynamically later
    });
  }

  // Handle form submission
  submitRequest() {
    if (this.travelRequestForm.valid) {
      console.log(this.travelRequestForm.value);
      alert('Travel request submitted successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
