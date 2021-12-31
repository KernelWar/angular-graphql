import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(MatDrawer) matDrawer: MatDrawer;
  constructor() { }

  ngOnInit(): void {
  }

  drawerToogle(event){
    this.matDrawer.toggle()
  }

}
