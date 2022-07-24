import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // Returns List<QA>
  // QA {Question: Question, Answer: Answer}
  // Input: category id
  // Notes: returns 5 QAs for a category
  getQuestions(category: number): Observable<any> {
    return this.http.get<any>(`${environment.apiAzureURL}/Question/GetQuestions/${category}`);
    // return this.http.get<any>(`${environment.apiBaseURL}/Question/GetQuestions/${category}`);
  }

  // Returns List<Team>
  // Team {ID: integer, Name: string, Score: integer}
  // Notes: the list is sorted according to score (highest to lowest)
  getSortedTeams(): Observable<any> {
    return this.http.get<any>(`${environment.apiAzureURL}/Team/SortedTeams`);
    // return this.http.get<any>(`${environment.apiBaseURL}/Team/SortedTeams`);
  }

  // Does not return anything
  // Input: Team {ID: integer, Name: string, Score: integer}
  // Notes: used to update team score
  updateTeam(p: Partial<any>): Observable<unknown> {
    return this.http.put(`${environment.apiAzureURL}/Team/UpdateTeam`, p);
    // return this.http.put(`${environment.apiBaseURL}/Team/UpdateTeam`, p);
  }

  // Returns id of created Team
  // Input: Team {ID: integer, Name: string, Score: integer}
  createTeams(p: Partial<any>): Observable<any> {
    return this.http.post(`${environment.apiAzureURL}/Team/CreateTeams`, p);
    // return this.http.post(`${environment.apiBaseURL}/Team/CreateTeams`, p);
  }

  // Returns Admin
  // Admin {ID: integer, Name: string, Password: string, Access: integer}
  // Input: username, password
  getAdmin(username: string, password: string): Observable<any> {
    return this.http.get(`${environment.apiAzureURL}/Admin/${username}/${password}`)
  }

  // Returns List<Player>
  // Player {ID: integer, Name: string, Team_ID: integer}
  // Input: team id
  getMemebers(team_id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiAzureURL}/Player/GetMembers/${team_id}`);
    // return this.http.get<any>(`${environment.apiBaseURL}/Player/GetMembers/${team_id}`);
  }

  // Does not return anything
  // Input: Player {ID: integer, Name: string, Team_ID: integer}
  createPlayers(p: Partial<any>): Observable<any> {
    return this.http.post(`${environment.apiAzureURL}/Player/CreatePlayers`, p);
    // return this.http.post(`${environment.apiBaseURL}/Player/CreatePlayers`, p);
  }

  // Returns List<Type>
  // Type {ID: integer, Category: string}
  getTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiAzureURL}/Category/GetCategories`);
    // return this.http.get<any>(`${environment.apiBaseURL}/Type/GetTypes`);
  }
}
