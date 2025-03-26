import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RequestListComponent } from './request-list/request-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AdminComponent,
    NavbarAdminComponent,
    AdminDashboardComponent,
    RequestListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
