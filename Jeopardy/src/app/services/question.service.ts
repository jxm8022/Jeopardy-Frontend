import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubCategory } from '../models/SubCategory';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  // Returns List<QA>
  // QA {Question: Question, Answer: Answer}
  // Input: category id
  // Notes: returns 5 QAs for a category
  getQuestions(subcategories: SubCategory[]): Observable<HttpResponse<any>> {
    var url = "";
    for (let i = 0; i < subcategories.length; i++) {
      url += `${subcategories[i].subcategory_id}`;
      if (i < subcategories.length - 1) {
        url += "&";
      }
    }
    return this.http.get<any>(`${environment.apiAzureURL}/Question/GetQuestions/${url}`, {
      'observe': 'response'
    });
    // return this.http.get<any>(`${environment.apiBaseURL}/Question/GetQuestions/${category}`);
  }

  // Returns List<Question>
  // Question {question_id: int, question_entry: string, category_id: int}
  getAllQuestions(subcategory: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${environment.apiAzureURL}/Question/GetAllQuestions/${subcategory}`, {
      'observe': 'response'
    });
  }

  // Returns HttpResponse
  // Input: QA
  // QA {question: Question, subcategories: SubCategory[]}
  createQuestion(question: Partial<any>): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.apiAzureURL}/Question/CreateQuestion`, question, {
      'observe': 'response'
    });
  }
}
