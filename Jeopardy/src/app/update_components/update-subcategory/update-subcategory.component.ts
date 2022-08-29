import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategory } from 'src/app/models/SubCategory';
import { Type } from 'src/app/models/Type';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-subcategory',
  templateUrl: './update-subcategory.component.html',
  styleUrls: ['./update-subcategory.component.css']
})
export class UpdateSubcategoryComponent implements OnInit {

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

  categoryChosen: boolean = false;
  subcategories: SubCategory[] = [];
  chooseCategory(category_index: number): void {
    this.subcategories = this.categories[category_index].subcategories;
    this.message = `Subcategories for ${this.categories[category_index].category.category_name} loaded successfully!`;
    this.categoryChosen = true;
  }

  subcategoryToUpdate!: SubCategory;
  newSubcategory: SubCategory = new SubCategory(0, "", 0);
  chooseSubcategory(subcategory: SubCategory): void {
    this.subcategoryToUpdate = subcategory;
    this.newSubcategory.subcategory_id = this.subcategoryToUpdate.subcategory_id;
    this.newSubcategory.subcategory_name = this.subcategoryToUpdate.subcategory_name;
    this.update = true;
    this.message = `Selected subcategory ${this.subcategoryToUpdate.subcategory_name} to update!`;
  }

  checkCategory(): boolean {
    this.errorMessage = "";
    if (this.newSubcategory.subcategory_name.length < 1) {
      this.errorMessage = "Subcategory name must be more than 1 character long!";
      return false;
    }
    for (let i = 0; i < this.subcategories.length; i++) {
      if (this.subcategories[i].category_id !== this.newSubcategory.category_id) {
        if (this.subcategories[i].subcategory_name === this.newSubcategory.subcategory_name) {
          this.errorMessage = `Subcategory ${this.subcategories[i].subcategory_name} already exists!`;
          return false;
        }
      }
    }
    return true;
  }

  updateSubcategory(): void {
    if (this.checkCategory()) {
      this.categoryService.updateSubcategory(this.newSubcategory).subscribe({
        'next': res => {
          if (res.status === 200) {
            alert(`Subcategory ${this.subcategoryToUpdate.subcategory_name} updated to ${this.newSubcategory.subcategory_name}!`);
            this.router.navigate(['home/update']);
          }
        }
      });
    }
  }

}
