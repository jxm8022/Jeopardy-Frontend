import { Component, OnInit } from '@angular/core';
import { GameUI } from '../models/GameUI';
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  numberOfTeams: number = 2;

  teamNames: string[] = [];
  playerNames: string[][] = [];

  teams: Team[] = [];
  players: Player[][] = [];

  game: boolean = false;
  newGame: boolean = true;
  savedGames!: GameUI[];
  noGames!: GameUI[];

  width: string = "";

  message: string = "";
  errorMessage: string = "";

  constructor(private api: HttpService) {
    this.teamNames = Array(this.numberOfTeams).fill("");
    this.fillPlayers(2);
  }

  ngOnInit(): void {
    // find saved games HERE
    this.width = this.width = this.width + (100 / this.numberOfTeams) + '%';

    this.api.getSavedGames().subscribe({
      'next': (res) => {
        if (res.status === 200) {
          this.newGame = false;
          this.savedGames = res.body;
        }
        if (res.status === 204) {
          this.errorMessage = "Could not retrieved games!";
        }
      }
    });
  }

  fillPlayers(x: number): void {
    this.playerNames = [];
    for (let i = 0; i < x; i++) {
      this.playerNames.push([]);
      for (let j = 0; j < 4; j++) {
        this.playerNames[i].push("");
      }
    }
  }

  onSliderChange(): void {
    this.width = "";
    this.width = this.width = this.width + (100 / this.numberOfTeams) + '%';
    this.teamNames = Array(this.numberOfTeams).fill("");
    this.fillPlayers(this.numberOfTeams);
  }

  submitTeams(): void {
    if (this.checkTeams()) {
      for (let i = 0; i < this.teamNames.length; i++) {
        this.teams.push(new Team(-1, this.teamNames[i], 0));
        this.players.push([]);
        this.playerNames[i] = this.playerNames[i].filter(element => { return element !== "" });
        for (let j = 0; j < this.playerNames[i].length; j++) {
          this.players[i].push(new Player(-1, this.playerNames[i][j], -1));
        }
      }
      this.game = !this.game;
    }
  }

  checkTeams(): boolean {
    var actualTeams = this.teamNames.filter(element => { return element !== "" });
    if (actualTeams.length !== this.numberOfTeams) {
      this.message = "Missing a team name!";
      return false;
    } else {
      for (let i = 0; i < this.playerNames.length; i++) {
        var actualPlayers = this.playerNames[i].filter(element => { return element !== "" });
        if (actualPlayers.length < 1) {
          this.message = "Teams need at least one player!";
          return false;
        }
      }
    }
    return true;
  }

  gameToPlay!: GameUI;
  chooseGame(game: GameUI): void {
    this.game = true;
    this.gameToPlay = game;
    this.savedGames = this.noGames;
  }

  trackBy(index: any, item: any) {
    return index;
  }
}
