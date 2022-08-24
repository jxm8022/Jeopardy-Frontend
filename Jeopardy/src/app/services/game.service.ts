import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  // Returns List<GameUI>
  // GameUI {game: Game, teams: Team[], subcategories: Subcategory[], questions: QA[], boardstate: Boardstate[]}
  getSavedGames(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${environment.apiAzureURL}/Game/GetSavedGames`, {
      'observe': 'response'
    });
  }

  // Returns HttpResponse
  // Input: GameUI
  updateSavedGame(gameUI: Partial<any>): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.apiAzureURL}/Game/UpdatingSavedGame`, gameUI, {
      'observe': 'response'
    });
  }

  // Returns HttpResponse
  // Input: GameUI
  // GameUI {game: Game, teams: Team[], subcategories: Subcategory[], questions: QA[], boardstate: Boardstate[]}
  createSavedGame(gameUI: Partial<any>): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.apiAzureURL}/Game/CreateSavedGame`, gameUI, {
      'observe': 'response'
    });
  }
}
