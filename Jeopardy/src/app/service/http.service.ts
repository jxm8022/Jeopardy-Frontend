import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQA } from '../models/IQA';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // Returns List<QA>
  // QA {Question: Question, Answer: Answer}
  // Input: category id
  // Notes: returns 5 QAs for a category
  getQuestions(category: number): Observable<IQA[]> {
    return this.http.get<IQA[]>(`${environment.apiBaseURL}/Question/GetQuestions/${category}`);
  }

  // Returns List<Team>
  // Team {ID: integer, Name: string, Score: integer}
  // Notes: the list is sorted according to score (highest to lowest)
  getSortedTeams(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseURL}/Team/SortedTeams`);
  }

  // Does not return anything
  // Input: Team {ID: integer, Name: string, Score: integer}
  // Notes: used to update team score
  updateTeam(p: Partial<any>): Observable<unknown> {
    return this.http.put(`${environment.apiBaseURL}/Team/UpdateTeam`, p);
  }

  // Returns id of created Team
  // Input: Team {ID: integer, Name: string, Score: integer}
  createTeam(p: Partial<any>): Observable<any> {
    return this.http.post(`${environment.apiBaseURL}/Team/CreateTeam`, p);
  }

  // Returns List<Player>
  // Player {ID: integer, Name: string, Team_ID: integer}
  // Input: team id
  getMemebers(team_id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseURL}/Player/GetMembers/${team_id}`);
  }

  // Does not return anything
  // Input: Player {ID: integer, Name: string, Team_ID: integer}
  createPlayer(p: Partial<any>): Observable<any> {
    return this.http.post(`${environment.apiBaseURL}/Player/CreatePlayer`, p);
  }

  // Returns List<Type>
  // Type {ID: integer, Category: string}
  getTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseURL}/Type/GetTypes`);
  }
}
