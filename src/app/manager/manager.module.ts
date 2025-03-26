import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { NavbarManagerComponent } from './navbar-manager/navbar-manager.component';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    ManagerComponent,
    ManagerDashboardComponent,
    ApprovalListComponent,
    RequestDetailsComponent,
    NavbarManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManagerRoutingModule,
    RouterModule
  ]
})
export class ManagerModule { }

