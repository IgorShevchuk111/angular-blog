import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './services/auth.guard';
import { SearchPipe } from './search.pipe';
import { AlertComponent } from './components/alert/alert.component';




@NgModule({
  declarations: [
    AdminLayoutComponent,
     LoginPageComponent,
     CreatePageComponent,
     DashboardPageComponent,
     EditPageComponent,
      SearchPipe,
      AlertComponent
    ],

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
        {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
        {path: 'login', component: LoginPageComponent},
        {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
        {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
        {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
      ]}
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AdminModule { }


