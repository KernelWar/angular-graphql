import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';
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
        redirectTo: '/employees/list',        
        pathMatch: 'full',
      },
      {
        path:'employees',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ListEmployeesComponent
          }
        ]
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
    
  }
  
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
