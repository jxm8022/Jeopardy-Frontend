import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from 'src/app/models/Type';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

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

  checkCategory(category: Type): boolean {
    this.message = "";
    this.errorMessage = "";
    if (category.subcategories) {
      this.errorMessage = "Cannot delete a category that has subcategories!";
      this.message = "Delete subcategories first!";
      return false;
    }
    return true;
  }

  deleteCategory(category: Type): void {
    if (this.checkCategory(category)) {
      if (confirm(`Delete category ${category.category.category_name}?`)) {
        this.categoryService.deleteCategory(category.category.category_id).subscribe({
          'next': res => {
            if (res.status === 200) {
              alert(`Category ${category.category.category_name} deleted!`);
              this.router.navigate(['home/delete']);
            }
          }
        });
      }
    }
  }
}
