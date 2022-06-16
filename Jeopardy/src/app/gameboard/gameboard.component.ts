import { Component, Input, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryComponent } from '../category/category.component';
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { Type } from '../models/Type';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  @Input()
  teams: Team[] = [];

  @Input()
  players: Player[][] = [];

  categories: Type[] = [
    new Type(-1, "Category 1"),
    new Type(-1, "Category 2"),
    new Type(-1, "Category 3"),
    new Type(-1, "Category 4"),
    new Type(-1, "Category 5"),
  ];
  questions: number[] = [1, 2, 3, 4, 5, 6];
  questionCost: number[] = [100, 200, 300, 400, 500];

  opacity: string = '100%';
  modalRef: MdbModalRef<CategoryComponent> | null = null;

  constructor(private api: HttpService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.displayCategorySelector();
  }

  displayCategorySelector(): void {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(CategoryComponent, {
      modalClass: 'modal-dialog-centered'
    })
    this.modalRef.onClose.subscribe((message: any) => {
      if (message) {
        this.categories = message;
        this.opacity = "100%";
        this.getCategoryQuestions(message);
      }
      else
        this.displayCategorySelector();
    })
  }

  getCategoryQuestions(category: string[]): void {
    this.api.getQuestions
  }

  flipCard(question: number, category: number): void {
    console.log(category, question);
  }

}
