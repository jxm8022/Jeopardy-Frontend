import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubCategory } from '../models/SubCategory';

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
  getAdmin(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.get(`${environment.apiAzureURL}/Player/Admin/${username}/${password}`, {
      'observe': 'response'
    });
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
  // Type {category: Category, subcategories: SubCategories[]}
  getTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiAzureURL}/Category/GetCategories`);
    // return this.http.get<any>(`${environment.apiBaseURL}/Type/GetTypes`);
  }

  // Returns HttpResponse
  // Input: categoryName
  createCategory(categoryName: string): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.apiAzureURL}/Category/CreateCategory/${categoryName}`, categoryName, {
      'observe': 'response'
    });
  }

  // Returns HttpResponse
  // Input: SubCategory
  // SubCategory {ID: integer, Name: string, CategoryID: integer}
  createSubcategory(subcategory: Partial<any>): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.apiAzureURL}/Category/CreateSubcategory`, subcategory, {
      'observe': 'response'
    });
  }
}
