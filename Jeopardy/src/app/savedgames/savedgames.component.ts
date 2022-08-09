import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GameUI } from '../models/GameUI';

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
    }
  }

  message: string = "";
  errorMessage: string = "";

  chooseGame(game: GameUI): void {
    this.itemEvent.emit(game);
  }

}
