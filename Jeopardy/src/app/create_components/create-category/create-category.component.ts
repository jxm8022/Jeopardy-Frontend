import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Type } from 'src/app/models/Type';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getTypes().subscribe(res => {
      this.categories = res;
    });
  }

  categories: Type[] = [];
  message: string = "";
  errorMessage: string = "";

  category: string = "";
  createCategory(): void {
    if (this.categories) {
      if (this.categories.find(element => { return element.category.category_name === this.category })) {
        this.errorMessage = `Category ${this.category} already exists!`;
      } else if (this.category) {
        this.categoryService.createCategory(this.category).subscribe({
          'next': (res) => {
            if (res.status === 200) {
              this.message = `Category ${this.category} created successfully!`;
              this.categories.push(new Type(new Category(0, this.category), []));
              this.category = "";
              this.errorMessage = "";
            }
            if (res.status === 204) {
              this.errorMessage = "Could not create category!";
            }
          }
        });
      }
    } else {
      this.errorMessage = "Please enter a category name!"
    }
  }
}
