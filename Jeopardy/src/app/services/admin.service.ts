import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // Returns Admin
  // Admin {ID: integer, Name: string, Password: string, Access: integer}
  // Input: username, password
  getAdmin(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.get(`${environment.apiAzureURL}/Admin/GetAdmin/${username}/${password}`, {
      'observe': 'response'
    });
  }

  // Returns List<Admin>
  // Admin {ID: integer, Name: string, Password: string, Access: integer}
  // Input: none
  getAllAdmins(): Observable<HttpResponse<any>> {
    return this.http.get(`${environment.apiAzureURL}/Admin/GetAllAdmins`, {
      'observe': 'response'
    });
  }

  // Returns nothing
  // Admin {ID: integer, Name: string, Password: string, Access: integer}
  // Input: Admin
  createAdmin(admin: Partial<any>): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.apiAzureURL}/Admin/CreateAdmin`, admin, {
      'observe': 'response'
    });
  }

  // Returns nothing
  // Admin {ID: integer, Name: string, Password: string, Access: integer}
  // Input: Admin
  updateAdmin(admin: Partial<any>): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.apiAzureURL}/Admin/UpdateAdmin`, admin, {
      'observe': 'response'
    });
  }


  // Returns nothing
  // Admin {ID: integer, Name: string, Password: string, Access: integer}
  // Input: admin_id
  deleteAdmin(admin_id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${environment.apiAzureURL}/Admin/DeleteAdmin/${admin_id}`, {
      'observe': 'response'
    });
  }
}
