import { EmployeeComponent } from './employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NewRequestComponent,
    EmployeeComponent,
    EmployeeDashboardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    RouterModule
  ],
  exports: [NavbarComponent]
})
export class EmployeeModule {}


