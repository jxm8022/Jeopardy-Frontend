import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: string[] = ["", "", "", "", ""];

  constructor(private api: HttpService, public modalRef: MdbModalRef<CategoryComponent>) { }

  ngOnInit(): void {
    this.api.getTypes().subscribe(res => {
      console.log(res);
    });
  }

  submit() {
    this.modalRef.close(this.categories);
  }

}
