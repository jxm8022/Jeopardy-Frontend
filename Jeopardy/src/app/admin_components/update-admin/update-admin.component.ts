import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/Admin';
import { AdminService } from 'src/app/services/admin.service';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getAllAdmins().subscribe({
      'next': res => {
        if (res.status === 200) {
          this.admins = res.body;
        }
      }
    })
  }

  admins: Admin[] = [];
  message: string = "";
  errorMessage: string = "";
  update: boolean = false;

  adminToUpdate!: Admin;
  newAdmin: Admin = new Admin(0, "", "", 3);
  chooseAdmin(admin: Admin): void {
    this.adminToUpdate = admin;
    this.newAdmin.admin_id = this.adminToUpdate.admin_id;
    this.newAdmin.admin_name = this.adminToUpdate.admin_name;
    this.newAdmin.admin_access = this.adminToUpdate.admin_access;
    this.update = true;
  }

  checkAdmin(): boolean {
    this.errorMessage = "";
    if (this.newAdmin.admin_name.length < 1) {
      this.errorMessage = "Admin name must be more than 1 character long!";
      return false;
    }
    if (this.newAdmin.admin_password.length < 5 && this.newAdmin.admin_password.length !== 0) {
      this.errorMessage = "Admin password must be at least 5 characters long!";
      return false;
    }
    if (this.newAdmin.admin_password.length === 0) {
      alert("Leaving the password field empty will reuse the old password!");
    }
    if ((this.newAdmin.admin_access < 1 || this.newAdmin.admin_access > 3)) {
      this.errorMessage = "Admin access cannot be less than 1 or greater than 3!";
      return false;
    }
    for (let i = 0; i < this.admins.length; i++) {
      if (this.admins[i].admin_id !== this.newAdmin.admin_id) {
        if (this.admins[i].admin_name === this.newAdmin.admin_name) {
          this.errorMessage = `Admin ${this.admins[i].admin_name} already exists!`;
          return false;
        }
      }
    }
    return true;
  }

  comparePasswords(): void {
    if (this.adminToUpdate.admin_password !== sha256(this.newAdmin.admin_password) && this.newAdmin.admin_password.length !== 0) {
      this.newAdmin.admin_password = sha256(this.newAdmin.admin_password);
    } else {
      this.newAdmin.admin_password = this.adminToUpdate.admin_password;
    }
  }

  updateAdmin(): void {
    if (this.checkAdmin()) {
      this.comparePasswords();
      this.adminService.updateAdmin(this.newAdmin).subscribe({
        'next': res => {
          if (res.status === 200) {
            alert(`Admin ${this.newAdmin.admin_name} updated successfully!`);
            this.router.navigate(['home']);
          }
        }
      });
    }
  }
}
