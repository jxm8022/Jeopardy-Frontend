import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.adminAccess = Number(sessionStorage.getItem("adminAccess")) || 0;
    if (sessionStorage.getItem("adminActive") === "true") {
      this.adminActive = true;
    }
  }

  adminActive: boolean = false;
  adminAccess: number = 0;

  checkAdminAccess(): void {
    if (sessionStorage.getItem("adminAccess") === "1") {
      this.router.navigate(['home/admin/settings']);
    } else {
      alert("You do not have access to admin settings!");
    }
  }

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
