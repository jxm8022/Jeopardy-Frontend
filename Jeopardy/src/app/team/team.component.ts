import { Component, OnInit } from '@angular/core';
import { Answer } from '../models/Answer';
import { Boardstate } from '../models/Boardstate';
import { Game } from '../models/Game';
import { GameUI } from '../models/GameUI';
import { Player } from '../models/Player';
import { QA } from '../models/QA';
import { Question } from '../models/Question';
import { SubCategory } from '../models/SubCategory';
import { Team } from '../models/Team';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  newGameToPlay: GameUI = new GameUI(new Game(0, 0, 0), [new Team(0, "", 0)], [[new Player(0, "", 0)]], [new SubCategory(0, "", 0)], [new QA(new Question(0, "", 0), new Answer(0, "", 0))], [new Boardstate(0, 0, 0, false, 0, 0)]);

  numberOfTeams: number = 2;

  teamNames: string[] = [];
  playerNames: string[][] = [];

  teams: Team[] = [];
  players: Player[][] = [];
  existingTeams: Team[] = [];
  existingPlayers: Player[] = [];

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

    this.api.getSortedTeams().subscribe(res => {
      if (res) {
        this.existingTeams = res;
      } else {
        this.errorMessage = "No teams!";
      }
      this.api.getPlayers().subscribe({
        'next': (res) => {
          if (res.status === 200) {
            this.existingPlayers = res.body;
          }
          if (res.status === 204) {
            this.errorMessage = "No players!";
          }
          this.api.getSavedGames().subscribe({
            'next': (res) => {
              if (res.status === 200) {
                this.newGame = false;
                this.savedGames = res.body;
              }
              if (res.status === 204) {
                this.errorMessage = "No saved games!";
              }
            },
            'error': (err) => {
              this.errorMessage = "An error occurred. Contact the game creator!";
            }
          });
        },
        'error': (err) => {
          this.errorMessage = "An error occurred. Contact the game creator!";
        }
      });
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
    this.errorMessage = "";
    if (this.numberOfTeams > 0) {
      if (this.checkTeams()) {
        for (let i = 0; i < this.teamNames.length; i++) {
          this.teams.push(new Team(-1, this.teamNames[i], 0));
          this.players.push([]);
          this.playerNames[i] = this.playerNames[i].filter(element => { return element !== "" });
          for (let j = 0; j < this.playerNames[i].length; j++) {
            this.players[i].push(new Player(-1, this.playerNames[i][j], -1));
          }
        }

        // add to new game to play GameUI
        this.newGameToPlay.teams = this.teams;
        this.newGameToPlay.players = this.players;

        this.game = !this.game;
      }
    } else {
      this.newGameToPlay.teams[0].team_name = "solo";
      this.game = !this.game;
    }
  }

  checkTeams(): boolean {
    // checking for empty input and existing information
    let actualTeams = this.teamNames.filter(element => { return element !== "" });
    if (this.numberOfTeams > 1) {
      for (let i = 0; i < this.existingTeams.length; i++) {
        for (let j = 0; j < actualTeams.length; j++) {
          if (this.existingTeams[i].team_name === actualTeams[j]) {
            this.message = "Team name already exists!";
            return false;
          }
        }
      }
    }
    if (actualTeams.length !== this.numberOfTeams) {
      this.message = "Missing a team name!";
      return false;
    } else {
      for (let i = 0; i < this.playerNames.length; i++) {
        let actualPlayers = this.playerNames[i].filter(element => { return element !== "" });
        if (this.numberOfTeams > 1) {
          for (let j = 0; j < this.existingPlayers.length; j++) {
            for (let k = 0; k < actualPlayers.length; k++) {
              if (this.existingPlayers[j].player_name === actualPlayers[k]) {
                this.message = "Player name already exists!";
                return false;
              }
            }
          }
        }
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

  createNewGame(): void {
    this.newGame = true;
    this.savedGames = this.noGames;
  }

  trackBy(index: any, item: any) {
    return index;
  }
}
