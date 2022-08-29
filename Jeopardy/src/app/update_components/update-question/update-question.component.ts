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
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

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
      }
    });
  }

  questionToUpdate!: QA;
  newQuestion: QA = new QA(new Question(0, "", 0), new Answer(0, "", 0));
  chooseQuestion(question: QA): void {
    this.questionToUpdate = question;
    this.newQuestion.question.question_id = this.questionToUpdate.question.question_id;
    this.newQuestion.question.question_entry = this.questionToUpdate.question.question_entry;
    this.newQuestion.question.category_id = this.questionToUpdate.question.category_id;
    this.newQuestion.answer.answer_id = this.questionToUpdate.answer.answer_id;
    this.newQuestion.answer.answer_entry = this.questionToUpdate.answer.answer_entry;
    this.newQuestion.answer.question_id = this.questionToUpdate.answer.question_id;
    this.update = true;
    this.message = `Selected question ${this.questionToUpdate.question.question_entry} to update!`;
  }

  checkQuestion(): boolean {
    this.errorMessage = "";
    if (this.newQuestion.question.question_entry.length < 1) {
      this.errorMessage = "Question entry must be more than 1 character long!";
      return false;
    }
    if (this.newQuestion.answer.answer_entry.length < 1) {
      this.errorMessage = "Answer entry must be more than 1 character long!";
      return false;
    }
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].question.question_id !== this.newQuestion.question.question_id) {
        if (this.questions[i].question.question_id === this.newQuestion.question.question_id) {
          this.errorMessage = `Question ${this.questions[i].question.question_entry} already exists!`;
          return false;
        }
      }
    }
    return true;
  }

  updateQuestion(): void {
    if (this.checkQuestion()) {
      this.questionService.updateQuestion(this.newQuestion).subscribe({
        'next': res => {
          if (res.status === 200) {
            alert(`Question ${this.questionToUpdate.question.question_entry} updated to ${this.newQuestion.question.question_entry} and answer ${this.questionToUpdate.answer.answer_entry} updated to ${this.newQuestion.answer.answer_entry}!`);
            this.router.navigate(['home/update']);
          }
        }
      });
    }
  }
}
