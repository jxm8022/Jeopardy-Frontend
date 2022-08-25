import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/Admin';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrls: ['./delete-admin.component.css']
})
export class DeleteAdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getAllAdmins().subscribe({
      'next': res => {
        if (res.status === 200) {
          this.admins = res.body;
        }
      }
    });
  }

  admins: Admin[] = [];

  deleteAdmin(admin: Admin): void {
    if (sessionStorage.getItem("adminName") !== admin.admin_name) {
      if (confirm(`Are you sure you want to delete admin ${admin.admin_name}?`)) {
        this.adminService.deleteAdmin(admin.admin_id).subscribe({
          'next': res => {
            if (res.status === 200) {
              alert(`Admin ${admin.admin_name} deleted successfully!`);
              this.router.navigate(['home']);
            }
          }
        });
      } else {
        this.router.navigate(['home']);
      }
    } else {
      alert(`You are unable to delete yourself!`);
    }
  }
}
