import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Type } from 'src/app/models/Type';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router) { }

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

  categoryToUpdate!: Category;
  newCategory: Category = new Category(0, "");
  chooseCategory(category: Type): void {
    this.categoryToUpdate = category.category;
    this.newCategory.category_id = this.categoryToUpdate.category_id;
    this.newCategory.category_name = this.categoryToUpdate.category_name;
    this.update = true;
    this.message = `Selected category ${this.categoryToUpdate.category_name} to update!`;
  }

  checkCategory(): boolean {
    this.errorMessage = "";
    if (this.newCategory.category_name.length < 1) {
      this.errorMessage = "Category name must be more than 1 character long!";
      return false;
    }
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].category.category_id !== this.newCategory.category_id) {
        if (this.categories[i].category.category_name === this.newCategory.category_name) {
          this.errorMessage = `Category ${this.categories[i].category.category_name} already exists!`;
          return false;
        }
      }
    }
    return true;
  }

  updateCategory(): void {
    if (this.checkCategory()) {
      this.categoryService.updateCategory(this.newCategory).subscribe({
        'next': res => {
          if (res.status === 200) {
            alert(`Category ${this.categoryToUpdate.category_name} updated to ${this.newCategory.category_name}!`);
            this.router.navigate(['home/update']);
          }
        }
      })
    }
  }

}
