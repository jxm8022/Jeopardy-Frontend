import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Type } from '../models/Type';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Type[] = [];
  selection!: Type[];
  errorMessage = '';

  constructor(private api: HttpService, public modalRef: MdbModalRef<CategoryComponent>) { }

  ngOnInit(): void {
    this.api.getTypes().subscribe(res => {
      this.selection = res;
    });
  }

  changed(index: number) {
    if (this.categories.includes(this.selection[index])) {
      this.categories[this.categories.indexOf(this.selection[index])] = new Type(-1, "");
      this.categories = this.categories.filter(element => { return element.Category !== "" });
    } else {
      this.categories.push(this.selection[index]);
    }
    console.log(this.categories)
  }

  submit() {
    if (this.categories.length === 5) {
      this.modalRef.close(this.categories);
    } else {
      this.errorMessage = "Select 5 categories!"
    }
  }
}
