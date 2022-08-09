import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryComponent } from '../category/category.component';
import { Answer } from '../models/Answer';
import { Boardstate } from '../models/Boardstate';
import { GameUI } from '../models/GameUI';
import { QA } from '../models/QA';
import { Question } from '../models/Question';
import { SubCategory } from '../models/SubCategory';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  adminActive: boolean = false;

  @Input()
  newGameToPlay!: GameUI;

  @Input()
  gameToPlay!: GameUI;
  gameToSave!: GameUI;
  currentGame!: GameUI;
  existingGame: boolean = false;

  questionAndAnswer: QA[][] = [];
  isQuestionAnswered: boolean[][] = [];
  questionCost: number[] = [0, 100, 200, 300, 400, 500];

  score: number[] = [];

  currentQuestion: string = "Question";
  currentAnswer: string = "Answer";
  currentTeam: number = 0; // index of current team

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
    if (sessionStorage.getItem("adminActive") === "true") {
      this.adminActive = true;
    }
    if (this.gameToPlay) {
      // LOADING IN A PREVIOUSLY SAVED GAME TO THE CURRENT GAME
      this.existingGame = true;
      this.currentGame = this.gameToPlay;
      this.buttonName = "Submit";
      this.currentGame.teams = this.gameToPlay.teams;
      this.width = this.width + (100 / this.currentGame.teams.length) + '%';
      this.currentTeam = this.gameToPlay.game.current_team;
      this.isQuestionAnswered = new Array(5).fill([]);
      this.questionAndAnswer = new Array(5).fill([]);
      this.score = new Array(this.gameToPlay.teams.length).fill(0);
      for (let i = 0; i < this.isQuestionAnswered.length; i++) {
        this.isQuestionAnswered[i] = new Array(5).fill(false);
        this.questionAndAnswer[i] = new Array(5).fill(new QA(new Question(0, "", 0), new Answer(0, "", 0)));
      }
      for (let i = 0; i < this.gameToPlay.boardstate.length; i++) {
        this.isQuestionAnswered[this.gameToPlay.boardstate[i].x_position][this.gameToPlay.boardstate[i].y_position] = this.gameToPlay.boardstate[i].answered;
        this.questionAndAnswer[this.gameToPlay.boardstate[i].x_position][this.gameToPlay.boardstate[i].y_position] = this.gameToPlay.questions.filter(element => { return this.gameToPlay.boardstate[i].question_id === element.question.question_id })[0];
      }
      let correctSubcategoryOrder = [];
      for (let i = 0; i < this.questionAndAnswer.length; i++) {
        for (let j = 0; j < this.gameToPlay.subcategories.length; j++) {
          if (this.questionAndAnswer[i][0].question.category_id === this.gameToPlay.subcategories[j].subcategory_id) {
            correctSubcategoryOrder.push(this.gameToPlay.subcategories[j]);
          }
        }
      }
      this.currentGame.subcategories = correctSubcategoryOrder;
    } else {
      this.currentGame = this.newGameToPlay;
      this.currentGame.subcategories = new Array(5).fill(new SubCategory(0, "", 0));
      if (this.currentGame.teams.length > 1) {
        // MORE THAN ONE TEAM MEANS INFORMATION CAN/WILL BE SAVED TO THE DATABASE
        this.buttonName = "Submit";
      } else {
        // ONE TEAM OR NO TEAM WAS SELECTED TO PLAY AND THE INFORMATION WILL NOT BE SAVED
        this.canSaveGame = false;
        if (this.currentGame.teams[0].team_name === "solo") {
          this.currentGame.teams = [];
        }
        // if no team name was specified for team size 1
        if (this.currentGame.teams.length === 1) {
          if (this.currentGame.teams[0].team_name.length < 1)
            this.currentGame.teams[0].team_name = "PredefinedTeam";
        }
      }
      this.width = this.width + (100 / this.currentGame.teams.length) + '%';
      this.score = new Array(this.currentGame.teams.length).fill(0);
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
        this.currentGame.subcategories = message[0];
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
        if (this.currentTeam < this.currentGame.teams.length - 1) {
          this.currentTeam++;
        } else {
          this.currentTeam = 0;
        }
        this.currentGame.game.current_team = this.currentTeam;
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
    this.message = "";
    if (this.canSaveGame) {
      if (this.adminActive) {
        for (let i = 0; i < this.score.length; i++) {
          this.currentGame.teams[i].team_score += this.score[i];
        }
        this.gameToSave = this.currentGame;
        let newBoardstate = [];
        this.message = "Saving game...";
        if (this.existingGame) {
          for (let i = 0; i < this.questionAndAnswer.length; i++) {
            for (let j = 0; j < this.questionAndAnswer[i].length; j++) {
              for (let k = 0; k < this.currentGame.boardstate.length; k++) {
                if (this.currentGame.boardstate[k].question_id === this.questionAndAnswer[i][j].question.question_id)
                  newBoardstate.push(new Boardstate(this.currentGame.boardstate[k].boardstate_id, i, j, this.isQuestionAnswered[i][j], this.questionAndAnswer[i][j].question.question_id, 0));
              }
            }
          }
          this.gameToSave.boardstate = newBoardstate;
          this.api.updateSavedGame(this.gameToSave).subscribe({
            'next': (res) => {
              if (res.status === 200) {
                this.message = "Game saved successfully!";
                this.canSaveGame = false;
                this.buttonName = "Go Home";
                this.winner = true;
              }
              if (res.status === 204) {
                this.message = "Could not save game!";
              }
            },
            'error': (err) => {
              this.message = "An error occurred. Contact the game creator!";
            }
          });
        } else {
          for (let i = 0; i < this.questionAndAnswer.length; i++) {
            for (let j = 0; j < this.questionAndAnswer[i].length; j++) {
              newBoardstate.push(new Boardstate(0, i, j, this.isQuestionAnswered[i][j], this.questionAndAnswer[i][j].question.question_id, 0));
            }
          }
          this.gameToSave.boardstate = newBoardstate;
          this.api.createSavedGame(this.gameToSave).subscribe({
            'next': (res) => {
              if (res.status === 200) {
                this.message = "Game saved successfully!";
                this.canSaveGame = false;
                this.buttonName = "Go Home";
                this.winner = true;
              }
              if (res.status === 204) {
                this.message = "Could not save game!";
              }
            },
            'error': (err) => {
              this.message = "An error occurred. Contact the game creator!";
            }
          });
        }
      } else {
        this.message = "You are not logged in as an admin! Return to the home screen to log in as admin! This game will not be saved!";
      }
    }
  }

  message: string = "";
  winnerWinnerChickenDinner(): void {
    if (this.buttonName === "Go Home")
      this.route.navigate(['home']);
    else if (!this.winner) {
      this.message = "The game is not complete! Consider saving...";
    } else {
      for (let i = 0; i < this.score.length; i++) {
        this.currentGame.teams[i].team_score += this.score[i];
      }
      this.currentGame.game.game_winner = 1;
      if (this.adminActive) {
        this.api.updateSavedGame(this.currentGame).subscribe({
          'next': (res) => {
            if (res.status === 200) {
              this.message = "Game finished successfully!";
              this.canSaveGame = false;
              this.buttonName = "Go Home";
              this.winner = true;
            }
            if (res.status === 204) {
              this.message = "Could not finish game!";
            }
          }
        });
      } else {
        this.message = "You are not logged in as an admin! Return to the home screen to log in as admin! This game will not be saved!";
      }
    }
  }

  trackBy(index: any, item: any): any {
    return index;
  }
}
