import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  // Returns List<Player>
  // Player {ID: integer, Name: string, Team_ID: integer}
  // Notes: the list is all players to make sure no duplicate players
  getPlayers(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${environment.apiAzureURL}/Player/GetPlayers`, {
      'observe': 'response'
    });
    // return this.http.get<any>(`${environment.apiBaseURL}/Team/SortedTeams`);
  }

  // Returns List<Player>
  // Player {ID: integer, Name: string, Team_ID: integer}
  // Input: team id
  getMemebers(team_id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiAzureURL}/Player/GetMembers/${team_id}`);
    // return this.http.get<any>(`${environment.apiBaseURL}/Player/GetMembers/${team_id}`);
  }
}
