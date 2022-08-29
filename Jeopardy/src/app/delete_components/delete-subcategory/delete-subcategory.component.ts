import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategory } from 'src/app/models/SubCategory';
import { Type } from 'src/app/models/Type';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-delete-subcategory',
  templateUrl: './delete-subcategory.component.html',
  styleUrls: ['./delete-subcategory.component.css']
})
export class DeleteSubcategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getTypes().subscribe(res => {
      this.categories = res;
      this.message = "Categories loaded successfully!";
    });
  }

  categories: Type[] = [];
  message: string = "";
  errorMessage: string = "";
  update: boolean = false;

  categoryChosen: boolean = false;
  subcategories: SubCategory[] = [];
  chooseCategory(category_index: number): void {
    this.subcategories = this.categories[category_index].subcategories;
    this.message = `Subcategories for ${this.categories[category_index].category.category_name} loaded successfully!`;
    this.categoryChosen = true;
  }

  checkCategory(subcategory: SubCategory): any {
    this.message = "";
    this.errorMessage = "";
    this.questionService.getAllQuestions(subcategory.subcategory_id).subscribe({
      'next': res => {
        if (res.status === 200) {
          this.errorMessage = "Cannot delete a subcategory that has questions!";
          this.message = "Delete questions first!";
          return false;
        } else {
          return true;
        }
      }
    });
  }

  deleteSubcategory(subcategory: SubCategory): void {
    if (this.checkCategory(subcategory)) {
      if (confirm(`Delete subcategory ${subcategory.subcategory_name}?`)) {
        this.categoryService.deleteSubcategory(subcategory.subcategory_id).subscribe({
          'next': res => {
            if (res.status === 200) {
              alert(`Subcategory ${subcategory.subcategory_name} deleted!`);
              this.router.navigate(['home/delete']);
            }
          }
        });
      }
    }
  }

}
