import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { MaterialModule } from 'src/app/material.module';
import { CardEmployeeComponent } from './components/card-employee/card-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';



@NgModule({
  declarations: [
    ListEmployeesComponent,
    CardEmployeeComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EmployeesModule { }
