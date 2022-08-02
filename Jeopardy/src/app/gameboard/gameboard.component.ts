import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryComponent } from '../category/category.component';
import { Answer } from '../models/Answer';
import { Category } from '../models/Category';
import { GameUI } from '../models/GameUI';
import { Player } from '../models/Player';
import { QA } from '../models/QA';
import { Question } from '../models/Question';
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

  @Input()
  gameToPlay!: GameUI;

  subcategories: SubCategory[] = [
    new SubCategory(0, "", 0),
    new SubCategory(0, "", 0),
    new SubCategory(0, "", 0),
    new SubCategory(0, "", 0),
    new SubCategory(0, "", 0)
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
  canSaveGame: boolean = true;

  opacity: string = '100%';
  width: string = "";
  modalRef: MdbModalRef<CategoryComponent> | null = null;

  constructor(private route: Router, private api: HttpService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    if (this.gameToPlay) {
      this.buttonName = "Submit Team";
      this.teams = this.gameToPlay.teams;
      this.width = this.width + (100 / this.teams.length) + '%';
      this.isQuestionAnswered = new Array(5).fill([]);
      this.questionAndAnswer = new Array(5).fill([]);
      for (let i = 0; i < this.isQuestionAnswered.length; i++) {
        this.isQuestionAnswered[i] = new Array(5).fill(false);
        this.questionAndAnswer[i] = new Array(5).fill(new QA(new Question(0, "", 0), new Answer(0, "", 0)));
      }
      for (let i = 0; i < this.gameToPlay.boardstate.length; i++) {
        this.isQuestionAnswered[this.gameToPlay.boardstate[i].x_position][this.gameToPlay.boardstate[i].y_position] = this.gameToPlay.boardstate[i].answered;
        this.questionAndAnswer[this.gameToPlay.boardstate[i].x_position][this.gameToPlay.boardstate[i].y_position] = this.gameToPlay.questions.filter(element => { return this.gameToPlay.boardstate[i].question_id === element.question.question_id })[0];
      }
      for (let i = 0; i < this.questionAndAnswer.length; i++) {
        for (let j = 0; j < this.gameToPlay.subcategories.length; j++) {
          if (this.gameToPlay.subcategories[j].subcategory_id === this.questionAndAnswer[i][0].question.category_id) {
            this.subcategories[i] = this.gameToPlay.subcategories[j];
          }
        }
      }
      for (let i = 0; i < this.gameToPlay.teams.length; i++) {
        this.score.push(this.gameToPlay.teams[i].team_score);
      }
      console.log(this.score);
    } else {
      if (this.teams.length > 1) {
        this.buttonName = "Submit Team";
      } else {
        this.canSaveGame = false;
        // if no team name was specified for team size 1
        if (this.teams.length === 1) {
          if (this.teams[0].team_name.length < 1)
            this.teams[0].team_name = "PredefinedTeam";
        }
      }
      this.width = this.width + (100 / this.teams.length) + '%';
      this.score = new Array(this.teams.length).fill(0);
      // boolean array to hold questions answered
      this.isQuestionAnswered = new Array(5).fill([]);
      for (let i = 0; i < this.isQuestionAnswered.length; i++) {
        this.isQuestionAnswered[i] = new Array(5).fill(false);
      }

      this.displayCategorySelector();
    }
  }

  displayCategorySelector(): void {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(CategoryComponent, {
      modalClass: 'modal-dialog-centered'
    })
    this.modalRef.onClose.subscribe((message: any) => {
      if (message) {
        this.opacity = "100%";
        this.subcategories = message[0];
        this.questionAndAnswer = message[1];
      } else {
        this.displayCategorySelector();
      }
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
    this.message = "";
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
          this.canSaveGame = false;
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

  saveGame(): void {

  }

  message: string = "";
  winnerWinnerChickenDinner(): void {
    if (this.buttonName === "Go Home")
      this.route.navigate(['home']);
    else if (!this.winner) {
      this.message = "The game is not complete! Consider saving...";
    } else {
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

  trackBy(index: any, item: any): any {
    return index;
  }
}
