import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public textHello = 'Good morning'
  public formLogin: FormGroup
  public LOAD: boolean = false
  constructor(
    private _form: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.formLogin = this._form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    let hour = moment().hour()
    if (hour < 12) {
      this.textHello = 'Good morning'
    } else if (hour >= 12 && hour < 19) {
      this.textHello = 'Good afternon'
    } else if (hour >= 19) {
      this.textHello = 'Good evening'
    }
  }

  login() {
    this.LOAD = true
    this.formLogin.disable()
    this.loginService.login(this.formLogin.get('username').value, this.formLogin.get('password').value).subscribe((res) => {
      this.formLogin.enable()
      this.LOAD = false
      if (res && res.message == "User valid" && res.token && res.user) {
        this.router.navigate(['/main'])
      }
    }, err => {
      this.formLogin.enable()
      this.LOAD = false
    })
  }
  
}
