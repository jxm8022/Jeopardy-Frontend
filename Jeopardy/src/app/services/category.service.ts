import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // Returns List<Type>
  // Type {category: Category, subcategories: SubCategories[]}
  getTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiAzureURL}/Category/GetCategories`);
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

  // Returns HttpResponse
  // Input: Category
  // Category {ID: integer, Name: string}
  updateCategory(category: Partial<any>): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.apiAzureURL}/Category/UpdateCategory`, category, {
      'observe': 'response'
    });
  }

  // Returns HttpResponse
  // Input: SubCategory
  // SubCategory {ID: integer, Name: string, CategoryID: integer}
  updateSubcategory(subcategory: Partial<any>): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.apiAzureURL}/Category/UpdateSubcategory`, subcategory, {
      'observe': 'response'
    });
  }

  deleteCategory(category_id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${environment.apiAzureURL}/Category/DeleteCategory/${category_id}`, {
      'observe': 'response'
    });
  }

  deleteSubcategory(subcategory_id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${environment.apiAzureURL}/Category/DeleteSubcategory/${subcategory_id}`, {
      'observe': 'response'
    });
  }
}
