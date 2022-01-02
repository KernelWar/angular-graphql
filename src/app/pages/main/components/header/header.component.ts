import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toogleEvent: EventEmitter<Boolean> = new EventEmitter();
  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  toggleActive(){
    this.toogleEvent.emit(true)
  }

}
