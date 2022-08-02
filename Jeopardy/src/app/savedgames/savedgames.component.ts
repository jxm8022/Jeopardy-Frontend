import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Answer } from '../models/Answer';
import { Boardstate } from '../models/Boardstate';
import { Game } from '../models/Game';
import { GameUI } from '../models/GameUI';
import { QA } from '../models/QA';
import { Question } from '../models/Question';
import { SubCategory } from '../models/SubCategory';
import { Team } from '../models/Team';

@Component({
  selector: 'app-savedgames',
  templateUrl: './savedgames.component.html',
  styleUrls: ['./savedgames.component.css']
})
export class SavedgamesComponent implements OnInit {

  @Input()
  savedGames: GameUI[] = [];

  @Output()
  itemEvent = new EventEmitter<GameUI>();

  constructor() { }

  ngOnInit(): void {
    if (this.savedGames.length > 0) {
      this.message = "Games retrieved successfully!";
      this.savedGames.push(new GameUI(new Game(0, 0, 0), [new Team(0, "boop", 0)], [new SubCategory(0, "beep", 0)], [new QA(new Question(0, "", 0), new Answer(0, "", 0))], [new Boardstate(0, 0, 0, false, 0, 0)]));
      this.savedGames.push(new GameUI(new Game(0, 0, 0), [new Team(0, "boop", 0)], [new SubCategory(0, "beep", 0)], [new QA(new Question(0, "", 0), new Answer(0, "", 0))], [new Boardstate(0, 0, 0, false, 0, 0)]));
    }
  }

  message: string = "";
  errorMessage: string = "";

  chooseGame(game: GameUI): void {
    this.itemEvent.emit(game);
  }

}
