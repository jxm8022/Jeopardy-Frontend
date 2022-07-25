import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryComponent } from '../category/category.component';
import { HttpService } from '../service/http.service';
import { Type } from '../models/Type';
import { tick } from '@angular/core/testing';

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
    this.api.getTypes().subscribe(res => {
      this.categories = res;
      if (this.createType === "subcategory" || this.createType === "question") {
        this.displayCategorySelector(this.createType);
      }
    });
  }

  createType: string = "";
  errorMessage: string = "";
  opacity: string = "100%";
  modalRef: MdbModalRef<CategoryComponent> | null = null;
  categories: Type[] = [];

  displayCategorySelector(type: string): void {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(CategoryComponent, {
      modalClass: 'modal-dialog-centered',
      data: { type }
    })
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    })
  }

  // CREATE CATEGORY
  category: string = "";
  createCategory(): void {
    if (this.categories.find(element => { return element.category.category_name === this.category })) {
      this.errorMessage = "Category already exists!";
    } else {
      this.api.createCategory(this.category).subscribe({
        'next': (res) => {
          if (res.status === 200) {
            this.errorMessage = "Category created successfully!";
            this.category = "";
          }
          if (res.status === 204) {
            this.errorMessage = "Could not create category!";
          }
        }
      });
    }
  }

  // CREATE SUBCATEGORY
  subcategory: string = "";
  createSubcategory(): void {

  }

  // CREATE QUESTION
  question: string = "";
  answer: string = "";
  createQuestion(): void {

  }
}
