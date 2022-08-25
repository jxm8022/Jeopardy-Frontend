import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (sessionStorage.getItem("adminActive") === "true") {
      this.adminActive = true;
    }
  }

  adminActive: boolean = false;

  logout(): void {
    sessionStorage.setItem("adminActive", "false");
    this.adminActive = false;
  }

  open: boolean = false;
  hover(): void {
    this.open = true;
  }

  notHover(): void {
    this.open = false;
  }
}
