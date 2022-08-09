import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Category } from '../models/Category';
import { QA } from '../models/QA';
import { SubCategory } from '../models/SubCategory';
import { Type } from '../models/Type';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  // data parameters for create.component.ts
  categories!: Type[];
  type!: string;

  // variables for category.component.html
  selection!: Type[];
  errorMessage = '';

  constructor(private api: HttpService, public modalRef: MdbModalRef<CategoryComponent>) { }

  ngOnInit(): void {
    if (this.type) {
      this.selection = this.categories;
    } else {
      this.api.getTypes().subscribe(res => {
        this.selection = res;
      });
    }
  }

  categorySelected!: Category;
  blank!: Category;
  beepBoop: boolean = false;
  selected(index: number) {
    if (this.beepBoop) {
      this.categorySelected = this.blank;
      this.beepBoop = !this.beepBoop;
    } else {
      this.categorySelected = this.selection[index].category;
      this.beepBoop = !this.beepBoop;
    }
  }

  subcategorySelected!: SubCategory;
  blankSub!: SubCategory;
  selectedSubcategory(index_i: number, index_j: number) {
    if (this.beepBoop) {
      this.subcategorySelected = this.blankSub;
      this.beepBoop = !this.beepBoop;
    } else {
      this.subcategorySelected = this.selection[index_i].subcategories[index_j];
      this.beepBoop = !this.beepBoop;
    }
  }

  gameCategories: SubCategory[] = [];
  changed(index_i: number, index_j: number) {
    if (this.gameCategories.includes(this.selection[index_i].subcategories[index_j])) {
      this.gameCategories = this.gameCategories.filter(element => { return element !== this.selection[index_i].subcategories[index_j] });
    } else {
      this.gameCategories.push(this.selection[index_i].subcategories[index_j]);
    }
  }

  submit() {
    if (this.type) {
      if (this.type === "subcategory") {
        if (this.categorySelected) {
          this.modalRef.close(this.categorySelected);
        } else {
          this.errorMessage = "Select a category!";
        }
      } else if (this.type === "question") {
        if (this.subcategorySelected) {
          this.modalRef.close(this.subcategorySelected);
        } else {
          this.errorMessage = "Select a subcategory!";
        }
      }
    } else {
      if (this.gameCategories.length === 5) {
        this.api.getQuestions(this.gameCategories).subscribe({
          'next': (res) => {
            if (res.status === 200) {
              this.modalRef.close([this.gameCategories, res.body]);
            }
          }
        });
      } else {
        this.errorMessage = "Select 5 categories!"
      }
    }
  }
}
