import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryComponent } from '../category/category.component';
import { HttpService } from '../service/http.service';
import { Type } from '../models/Type';
import { Category } from '../models/Category';
import { SubCategory } from '../models/SubCategory';
import { QA } from '../models/QA';
import { Question } from '../models/Question';
import { Answer } from '../models/Answer';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private api: HttpService, private router: Router, private modalService: MdbModalService) {
    var url = this.router.url.split("/");
    this.createType = url[url.length - 1];
  }

  ngOnInit(): void {
    this.message = "Loading categories...";
    this.api.getTypes().subscribe(res => {
      this.message = "";
      this.categories = res;
      if ((this.createType === "subcategory" || this.createType === "question") && this.categories != null) {
        this.displayCategorySelector(this.categories, this.createType);
      } else if (this.createType === "category") {
        this.message = "There are no categories!";
      } else {
        this.canCreate = false;
        this.message = "There are no categories or subcategories!";
      }
    });
  }

  canCreate: boolean = true;
  createType: string = "";
  message: string = "";
  errorMessage: string = "";
  opacity: string = "100%";
  modalRef: MdbModalRef<CategoryComponent> | null = null;
  categories: Type[] = [];

  displayCategorySelector(categories: Type[], type: string): any {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(CategoryComponent, {
      modalClass: 'modal-dialog-centered',
      data: { categories, type }
    })
    this.modalRef.onClose.subscribe((message: any) => {
      if (message) {
        this.opacity = "100%";
        if (this.createType === "subcategory") {
          this.categoryToAddTo = message;
        }
        if (this.createType === "question") {
          this.subcategoryToAddTo = message;
          this.api.getAllQuestions(this.subcategoryToAddTo.subcategory_id).subscribe({
            'next': (res) => {
              if (res.status === 200) {
                this.existingQuestions = res.body;
              }
            }
          });
        }
      } else {
        this.displayCategorySelector(categories, type);
      }
    })
  }

  // CREATE CATEGORY
  category: string = "";
  createCategory(): void {
    if (this.categories) {
      if (this.categories.find(element => { return element.category.category_name === this.category })) {
        this.errorMessage = `Category ${this.category} already exists!`;
      }
    } else if (this.category) {
      this.api.createCategory(this.category).subscribe({
        'next': (res) => {
          if (res.status === 200) {
            this.message = `Category ${this.category} created successfully!`;
            this.category = "";
            this.errorMessage = "";
          }
          if (res.status === 204) {
            this.errorMessage = "Could not create category!";
          }
        }
      });
    } else {
      this.errorMessage = "Please enter a category name!"
    }
  }

  // CREATE SUBCATEGORY
  categoryToAddTo!: Category;
  subcategory: string = "";
  createSubcategory(): void {
    var alreadyExists = false;
    this.categories.forEach(element => {
      if (element.subcategories) {
        element.subcategories.forEach(sub => {
          if (sub.subcategory_name === this.subcategory)
            alreadyExists = true;
        })
      }
    })
    if (alreadyExists) {
      this.errorMessage = `Subcategory ${this.subcategory} already exists!`;
    } else if (this.subcategory) {
      this.api.createSubcategory(new SubCategory(-1, this.subcategory, this.categoryToAddTo.category_id)).subscribe({
        'next': (res) => {
          if (res.status === 200) {
            this.message = `Subcategory ${this.subcategory} created successfully!`;
            this.subcategory = "";
            this.errorMessage = "";
            this.ngOnInit();
          }
          if (res.status === 204) {
            this.errorMessage = "Could not create subcategory!";
          }
        }
      });
    } else {
      this.errorMessage = "Please enter a subcategory name!";
    }
  }

  // CREATE QUESTION
  subcategoryToAddTo!: SubCategory;
  existingQuestions: Question[] = [];
  question: string = "";
  answer: string = "";
  createQuestion(): void {
    if (this.question && this.answer) {
      this.api.createQuestion(new QA(new Question(-1, this.question, this.subcategoryToAddTo.subcategory_id), new Answer(-1, this.answer, -1))).subscribe({
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
}
