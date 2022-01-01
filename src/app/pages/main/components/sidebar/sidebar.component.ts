import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  selectEmployees: boolean = false
  selectWelcome: boolean = false
  constructor(private router: Router) {

  }
  ngAfterViewInit(): void {
    if(this.router.url == '/welcome'){      
      Promise.resolve(null).then(()=>this.selectWelcome = true)
    }else if(this.router.url == '/employees' || this.router.url == '/employees/list'){
      Promise.resolve(null).then(()=>this.selectEmployees = true)
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let { url } = event
        if(url == "/employees" || url == "/main"){
          this.selectEmployees = true
          this.selectWelcome = false
        }else if(url == "/welcome"){
          this.selectEmployees = false
          this.selectWelcome = true
        }
      }

    })
  }
}
