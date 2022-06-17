import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryComponent } from '../category/category.component';
import { Player } from '../models/Player';
import { QA } from '../models/QA';
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
  questionAndAnswer: QA[][] = [];
  isQuestionAnswered: boolean[][] = [];
  questionCost: number[] = [0, 100, 200, 300, 400, 500];

  score: number[] = [];

  currentQuestion: string = "Question";
  currentAnswer: string = "Answer";

  questionSelected: boolean = false;
  showAnswer: boolean = false;

  winner: boolean = false;
  displayWinner: boolean = false;

  opacity: string = '100%';
  width: string = "";
  modalRef: MdbModalRef<CategoryComponent> | null = null;

  constructor(private route: Router, private api: HttpService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.width = this.width + (100 / this.teams.length) + '%';
    this.score = new Array(this.teams.length).fill(0);
    this.isQuestionAnswered = new Array(5).fill([]);
    for (let i = 0; i < this.isQuestionAnswered.length; i++) {
      this.isQuestionAnswered[i] = new Array(5).fill(false);
    }
    this.displayCategorySelector();
  }

  displayCategorySelector(): void {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(CategoryComponent, {
      modalClass: 'modal-dialog-centered'
    })
    this.modalRef.onClose.subscribe((message: any) => {
      this.api.getTypes().subscribe(res => {
        if (message) {
          for (let i = 0; i < message.length; i++) {
            for (let j = 0; j < res.length; j++) {
              if (message[i][0].Question.Type_id === res[j].Id) {
                this.categories[i] = res[j];
              }
            }
            this.questionAndAnswer.push(message[i]);
          }
          this.opacity = "100%";
        }
        else
          this.displayCategorySelector();
      });
    })
  }

  getColor(question: number, category: number): string {
    if (question !== 0) {
      if (this.isQuestionAnswered[category][question - 1]) {
        return '#2bbfe066';
      } else {
        return '#2bbfe0';
      }
    }
    return '#2bbfe0';
  }

  flipCard(question: number, category: number): void {
    if (question === 0) {
      this.showAnswer = !this.showAnswer;
      if (!this.showAnswer) {
        this.questionSelected = !this.questionSelected;
        let counter = 0;
        for (let i = 0; i < this.isQuestionAnswered.length; i++) {
          for (let j = 0; j < this.isQuestionAnswered[i].length; j++) {
            if (this.isQuestionAnswered[i][j])
              counter++;
          }
        }
        if (counter === (this.isQuestionAnswered.length * this.isQuestionAnswered[0].length)) {
          this.winner = true;
        }
      }
    } else if ((question !== 0 || this.questionSelected)) {
      if (question !== 0) { // this is here because when showing the question, exiting out has question and category set to 0
        this.currentQuestion = this.questionAndAnswer[category][question - 1].Question.Entry; // -1 from question because the category row
        this.currentAnswer = this.questionAndAnswer[category][question - 1].Answer.Entry;
        this.isQuestionAnswered[category][question - 1] = true;
      }
      this.questionSelected = !this.questionSelected;
    }
  }

  winnerWinnerChickenDinner(): void {
    this.route.navigate(['home']);
  }

  trackBy(index: any, item: any) {
    return index;
  }
}
