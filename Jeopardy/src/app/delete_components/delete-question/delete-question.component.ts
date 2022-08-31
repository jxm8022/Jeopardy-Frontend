import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from 'src/app/models/Answer';
import { QA } from 'src/app/models/QA';
import { Question } from 'src/app/models/Question';
import { SubCategory } from 'src/app/models/SubCategory';
import { Type } from 'src/app/models/Type';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.css']
})
export class DeleteQuestionComponent implements OnInit {

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

  subcategoryChosen: boolean = false;
  questions: QA[] = [];
  chooseSubcategory(subcategory_index: number): void {
    this.questionService.getAllQuestions(this.subcategories[subcategory_index].subcategory_id).subscribe({
      'next': res => {
        if (res.status === 200) {
          this.questions = res.body;
          this.categoryChosen = false;
          this.subcategoryChosen = true;
          this.message = `Questions for ${this.subcategories[subcategory_index].subcategory_name} loaded successfully!`;
        }
        if (res.status === 204) {
          alert(`No questions for this category!`);
          this.router.navigate(['home/delete']);
        }
      }
    });
  }

  deleteQuestion(question: QA): void {
    if (confirm(`Delete question ${question.question.question_entry}?`)) {
      this.questionService.deleteQuestion(question.question.question_id, question.answer.answer_id).subscribe({
        'next': res => {
          if (res.status === 200) {
            alert(`Question ${question.question.question_entry} deleted!`);
            this.router.navigate(['home/delete']);
          }
        }
      });
    }
  }
}
