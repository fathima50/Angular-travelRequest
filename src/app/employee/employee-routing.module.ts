
import { EmployeeComponent } from './employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { NewRequestComponent } from './new-request/new-request.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'dashboard', component: EmployeeDashboardComponent },
  { path: 'new-request', component: NewRequestComponent },
  { path: '', redirectTo: 'new-request', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
