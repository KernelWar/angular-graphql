import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainRoutingModule } from './main-routing.module';
import { EmployeesModule } from '../employees/employees.module';
import { WelcomeComponent } from './components/welcome/welcome.component';




@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    WelcomeComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    MaterialModule,
    EmployeesModule
  ],
  exports: [
    RouterModule
  ]
})
export class MainModule { }
