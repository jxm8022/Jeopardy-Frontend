import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/Admin';
import { AdminService } from 'src/app/services/admin.service';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  admins: Admin[] = [];

  ngOnInit(): void {
    this.adminService.getAllAdmins().subscribe({
      'next': res => {
        if (res.status === 200) {
          this.admins = res.body;
        }
      }
    })
  }

  admin: Admin = new Admin(0, "", "", 3);
  errorMessage: string = "";

  addAdmin(): void {
    if (this.checkAdmins()) {
      this.admin.admin_password = sha256(this.admin.admin_password);
      this.adminService.createAdmin(this.admin).subscribe({
        'next': res => {
          if (res.status === 200) {
            alert(`Admin ${this.admin.admin_name} added successfully!`);
            this.router.navigate(['home']);
          }
        }
      });
    }
  }

  checkAdmins(): boolean {
    this.errorMessage = "";
    if (this.admin.admin_name.length < 1) {
      this.errorMessage = "Admin name must be more than 1 character long!";
      return false;
    }
    if (this.admin.admin_password.length < 5) {
      this.errorMessage = "Admin password must be at least 5 characters long!";
      return false;
    }
    if ((this.admin.admin_access < 1 || this.admin.admin_access > 3)) {
      this.errorMessage = "Admin access cannot be less than 1 or greater than 3!";
      return false;
    }
    for (let i = 0; i < this.admins.length; i++) {
      if (this.admins[i].admin_name === this.admin.admin_name) {
        this.errorMessage = `Admin ${this.admins[i].admin_name} already exists!`;
        return false;
      }
    }
    return true;
  }
}
