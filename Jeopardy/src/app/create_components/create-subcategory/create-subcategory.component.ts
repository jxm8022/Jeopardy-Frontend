import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { SubCategory } from 'src/app/models/SubCategory';
import { Type } from 'src/app/models/Type';
import { CategoryService } from 'src/app/services/category.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryComponent } from 'src/app/category/category.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.css']
})
export class CreateSubcategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.categoryService.getTypes().subscribe(res => {
      this.categories = res;
      if (this.categories.length > 0) {
        this.displayCategorySelector(this.categories, "subcategory");
        this.canCreate = true;
      } else {
        this.message = "There are no categories!";
      }
    });
  }

  message: string = "";
  errorMessage: string = "";
  opacity: string = "100%";
  canCreate: boolean = false;
  modalRef: MdbModalRef<CategoryComponent> | null = null;
  categories: Type[] = [];

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
      this.categoryService.createSubcategory(new SubCategory(-1, this.subcategory, this.categoryToAddTo.category_id)).subscribe({
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
        this.categoryToAddTo = message;
      } else {
        this.displayCategorySelector(categories, type);
      }
    })
  }
}
