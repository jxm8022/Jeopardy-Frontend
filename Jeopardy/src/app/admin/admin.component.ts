import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { Admin } from '../models/Admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  admin: Admin = { admin_id: -1, admin_name: "", admin_password: "", admin_access: -1 };

  username: string = "";
  password: string = "";
  errorMessage: string = "";

  login(): void {
    this.adminService.getAdmin(this.username, sha256(this.password)).subscribe({
      'next': (res) => {
        if (res.status === 200) {
          this.admin = res.body;
          sessionStorage.setItem("adminActive", "true");
          this.router.navigate(['home']);
        }
        if (res.status === 204) {
          this.errorMessage = "Not an admin!";
        }
      }
    });
  }

}
