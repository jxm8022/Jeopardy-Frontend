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
    return this.http.get(`${environment.apiAzureURL}/Player/Admin/${username}/${password}`, {
      'observe': 'response'
    });
  }
}
