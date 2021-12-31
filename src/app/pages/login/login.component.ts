import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public textHello = 'Good morning'
  constructor() { }

  ngOnInit(): void {    
    let hour = moment().hour()
    if(hour < 12){
      this.textHello = 'Good morning'
    }else if(hour >= 12 && hour < 19){
      this.textHello = 'Good afternon'
    }else if(hour >= 19){
      this.textHello = 'Good evening'
    }
  }

}
