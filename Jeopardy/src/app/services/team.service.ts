import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  // Returns List<Team>
  // Team {ID: integer, Name: string, Score: integer}
  // Notes: the list is sorted according to score (highest to lowest)
  getSortedTeams(): Observable<any> {
    return this.http.get<any>(`${environment.apiAzureURL}/Team/SortedTeams`);
    // return this.http.get<any>(`${environment.apiBaseURL}/Team/SortedTeams`);
  }
}
