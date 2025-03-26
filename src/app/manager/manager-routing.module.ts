import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

const routes: Routes = [
  { path: '', component: ManagerComponent },
  { path: 'dashboard', component: ManagerDashboardComponent },
  { path: 'approvals', component: ApprovalListComponent },
  { path: 'request/:id', component: RequestDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }




