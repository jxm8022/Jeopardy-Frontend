import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryComponent } from '../category/category.component';
import { Category } from '../models/Category';
import { Player } from '../models/Player';
import { QA } from '../models/QA';
import { SubCategory } from '../models/SubCategory';
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

  sortedTeams: Team[] = [];

  @Input()
  players: Player[][] = [];

  categories: Type[] = [
    new Type(new Category(0, ""), [new SubCategory(0, "", 0)]),
    new Type(new Category(0, ""), [new SubCategory(0, "", 0)]),
    new Type(new Category(0, ""), [new SubCategory(0, "", 0)]),
    new Type(new Category(0, ""), [new SubCategory(0, "", 0)]),
    new Type(new Category(0, ""), [new SubCategory(0, "", 0)]),
  ];
  questionAndAnswer: QA[][] = [];
  isQuestionAnswered: boolean[][] = [];
  questionCost: number[] = [0, 100, 200, 300, 400, 500];

  score: number[] = [];

  currentQuestion: string = "Question";
  currentAnswer: string = "Answer";

  buttonName: string = "Go Home";

  questionSelected: boolean = false;
  showAnswer: boolean = false;

  winner: boolean = false;

  opacity: string = '100%';
  width: string = "";
  modalRef: MdbModalRef<CategoryComponent> | null = null;

  constructor(private route: Router, private api: HttpService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    if (this.teams[0].team_name && this.teams[1].team_name) {
      this.buttonName = "Submit Team";
      this.teams = this.teams.filter(element => { return element.team_name !== "" });

      let temp = [];
      let temp2d = [];
      for (let i = 0; i < this.players.length; i++) {
        temp = this.players[i].filter(element => { return element.Name !== "" });
        temp2d.push(temp);
      }
      this.players = temp2d;
    }
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
    if (question === 0 && this.questionSelected) {
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
        this.currentQuestion = this.questionAndAnswer[category][question - 1].question.question_entry; // -1 from question because the category row
        this.currentAnswer = this.questionAndAnswer[category][question - 1].answer.answer_entry;
        this.isQuestionAnswered[category][question - 1] = true;
      }
      this.questionSelected = !this.questionSelected;
    }
  }

  winnerWinnerChickenDinner(): void {
    if (this.buttonName === "Go Home")
      this.route.navigate(['home']);
    else {
      for (let i = 0; i < this.score.length; i++) {
        this.teams[i].team_score = this.score[i];
      }
      this.api.createTeams(this.teams).subscribe(res => {
        this.api.getSortedTeams().subscribe(res => {
          this.sortedTeams = res;
          for (let i = 0; i < this.teams.length; i++) {         // iterate through teams
            for (let j = 0; j < this.players[i].length; j++) {  // iterate through players
              for (let k = 0; k < this.sortedTeams.length; k++) {    // iterate through sorted teams to find team id for player
                if ((this.sortedTeams[k].team_name === this.teams[i].team_name) && (this.sortedTeams[k].team_score == this.teams[i].team_score)) { // not sure why team.Score is string but it has '==' because the values match but not the types
                  this.players[i][j].Team_id = this.sortedTeams[k].team_id;
                }
              }
            }
          }
          this.api.createPlayers(this.players).subscribe(res => {
            this.route.navigate(['home']);
          });
        })
      })
    }
  }

  trackBy(index: any, item: any) {
    return index;
  }
}
