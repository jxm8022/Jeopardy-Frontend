import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/Answer';
import { QA } from 'src/app/models/QA';
import { Question } from 'src/app/models/Question';
import { SubCategory } from 'src/app/models/SubCategory';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryComponent } from 'src/app/category/category.component';
import { Type } from 'src/app/models/Type';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  constructor(private categoryService: CategoryService, private questionService: QuestionService, private router: Router, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.categoryService.getTypes().subscribe(res => {
      this.categories = res;
      if (this.categories.length > 0) {
        this.displayCategorySelector(this.categories, "question");
        this.canCreate = true;
      } else {
        this.canCreate = false;
        this.message = "There are no categories or subcategories!";
      }
    });
  }

  message: string = "";
  errorMessage: string = "";

  opacity: string = "100%";
  modalRef: MdbModalRef<CategoryComponent> | null = null;
  categories: Type[] = [];

  canCreate: boolean = false;

  subcategoryToAddTo!: SubCategory;
  existingQuestions: QA[] = [];
  question: string = "";
  answer: string = "";
  createQuestion(): void {
    if (this.question && this.answer) {
      this.existingQuestions = [];
      this.questionService.createQuestion(new QA(new Question(-1, this.question, this.subcategoryToAddTo.subcategory_id), new Answer(-1, this.answer, -1))).subscribe({
        'next': (res) => {
          if (res.status === 200) {
            this.message = `Question '${this.question}' created successfully!`;
            this.question = "";
            this.answer = "";
            this.errorMessage = "";
            this.ngOnInit();
          }
          if (res.status === 204) {
            this.errorMessage = "Could not create question!";
          }
        }
      });
    } else {
      if (!this.question && this.answer) { this.errorMessage = "Please enter a question!" }
      else if (this.question && !this.answer) { this.errorMessage = "Please enter an answer!" }
      else { this.errorMessage = "Please enter a question and answer!" }
    }
  }

  displayCategorySelector(categories: Type[], type: string): any {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(CategoryComponent, {
      modalClass: 'modal-dialog-centered',
      data: { categories, type }
    })
    this.modalRef.onClose.subscribe((message: any) => {
      if (message) {
        this.opacity = "100%";
        if (message === "goodbye") {
          this.router.navigate(['home']);
        }
        this.subcategoryToAddTo = message;
        this.questionService.getAllQuestions(this.subcategoryToAddTo.subcategory_id).subscribe({
          'next': (res) => {
            if (res.status === 200) {
              this.existingQuestions = res.body;
            }
          }
        });
      } else {
        this.displayCategorySelector(categories, type);
      }
    })
  }
}
