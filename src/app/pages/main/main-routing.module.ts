import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { ListEmployeesComponent } from '../employees/components/list-employees/list-employees.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,    
    canActivate: [AuthGuard],
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
      }      
    ]    
  },
  {
    path: 'page-not-found',
    component: NotFoundComponent
  },
  {path: '**', redirectTo: '/page-not-found'}
  
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
