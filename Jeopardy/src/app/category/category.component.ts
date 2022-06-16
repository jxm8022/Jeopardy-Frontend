import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Answer } from '../models/Answer';
import { QA } from '../models/QA';
import { Question } from '../models/Question';
import { Type } from '../models/Type';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  questions: QA[][] = [];
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
    this.api.getQuestions(index + 1).subscribe(res => {
      if (this.categories.includes(this.selection[index])) {
        // categories
        this.categories[this.categories.indexOf(this.selection[index])] = new Type(-1, "");
        this.categories = this.categories.filter(element => { return element.Category !== "" });

        // questions
        for (let i = 0; i < this.questions.length; i++) {
          console.log(this.questions[i][0]);
          console.log(this.questions[i][0].Question);
          console.log(this.questions[i][0].Question.Type_ID);
          if (this.questions[i][0].Question.Type_ID === index + 1) {
            console.log("removing at index" + i)
          }
        }
        this.questions = this.questions.filter(element => { return element.length !== 0 });
      } else {
        this.categories.push(this.selection[index]);
        this.questions.push(res);
      }
      console.log(this.questions.length);
    });
  }

  submit() {
    if (this.questions.length === 5) {
      this.modalRef.close(this.questions);
    } else {
      this.errorMessage = "Select 5 categories!"
    }
  }
}
