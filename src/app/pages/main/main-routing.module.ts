import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from '../employees/components/list-employees/list-employees.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'employees',
        redirectTo: 'employees/list'
      },
      {
        path:'employees/list',
        component: ListEmployeesComponent
      }
    ]
  }
  
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
