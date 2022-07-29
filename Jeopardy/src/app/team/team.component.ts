import { Component, OnInit } from '@angular/core';
import { Player } from '../models/Player';
import { Team } from '../models/Team';

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
  savedGames: boolean = false;

  width: string = "";

  message: string = "";

  constructor() {
    this.teamNames = Array(this.numberOfTeams).fill("");
    this.fillPlayers(2);
  }

  ngOnInit(): void {
    // find saved games HERE
    this.width = this.width = this.width + (100 / this.numberOfTeams) + '%';
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

  trackBy(index: any, item: any) {
    return index;
  }
}
