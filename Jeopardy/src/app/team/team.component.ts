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
import { GameService } from '../services/game.service';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  adminActive: boolean = false;

  newGameToPlay: GameUI = new GameUI(new Game(0, 0, 0), [new Team(0, "", 0)], [[new Player(0, "", 0)]], [new SubCategory(0, "", 0)], [new QA(new Question(0, "", 0), new Answer(0, "", 0))], [new Boardstate(0, 0, 0, false, 0, 0)]);

  numberOfTeams: number = 2;
  numberOfPlayers: number = 4;

  teamNames: string[] = [];
  playerNames: string[][] = [];

  teams: Team[] = [];
  players: Player[][] = [];
  existingTeams: Team[] = [];
  existingPlayers: Player[] = [];
  existingPlayersForTeam: Player[][] = [];

  game: boolean = false;
  newGame: boolean = true;
  savedGames!: GameUI[];
  noGames!: GameUI[];

  width: string = "";

  message: string = "";
  errorMessage: string = "";

  constructor(private teamService: TeamService, private playerService: PlayerService, private gameService: GameService) {
    this.teamNames = Array(this.numberOfTeams).fill("");
    this.existingPlayersForTeam = Array(this.numberOfTeams).fill([]);
    this.fillPlayers(this.numberOfTeams, this.numberOfPlayers);
  }

  ngOnInit(): void {
    // find saved games HERE
    this.width = this.width = this.width + (100 / this.numberOfTeams) + '%';

    if (sessionStorage.getItem("adminActive") === "true") {
      this.adminActive = true;
    }

    this.teamService.getSortedTeams().subscribe(res => {
      if (res) {
        this.existingTeams = res;
      } else {
        this.errorMessage = "No teams!";
      }
      this.playerService.getPlayers().subscribe({
        'next': (res) => {
          if (res.status === 200) {
            this.existingPlayers = res.body;
          }
          if (res.status === 204) {
            this.errorMessage = "No players!";
          }
          this.gameService.getSavedGames().subscribe({
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

  getColumnId(index: number): string {
    return `playerOptions-${index}`;
  }

  filterPlayers(team_name: string, index: number): void {
    let teamId = 0;
    this.existingTeams.forEach(element => {
      if (element.team_name === team_name) teamId = element.team_id;
    });
    this.existingPlayersForTeam[index] = this.existingPlayers.filter(element => { return element.team_id === teamId });
  }

  fillPlayers(numTeams: number, numPlayers: number): void {
    this.playerNames = [];
    for (let i = 0; i < numTeams; i++) {
      this.playerNames.push([]);
      for (let j = 0; j < numPlayers; j++) {
        this.playerNames[i].push("");
      }
    }
  }

  onTeamChange(): void {
    this.width = "";
    this.width = this.width = this.width + (100 / this.numberOfTeams) + '%';
    this.teamNames = Array(this.numberOfTeams).fill("");
    this.fillPlayers(this.numberOfTeams, this.numberOfPlayers);
  }

  onPlayerChange(): void {
    this.fillPlayers(this.numberOfTeams, this.numberOfPlayers);
  }

  submitTeams(): void {
    this.errorMessage = "";
    this.message = "";
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
    let actualTeams = this.teamNames.filter(element => { return element !== "" });
    // check for new teams having new people (new teams need new players and cannot have existing players)
    let checkPlayers = true;
    if (this.numberOfTeams > 1) {
      for (let i = 0; i < actualTeams.length; i++) {
        for (let j = 0; j < this.existingTeams.length; j++) {
          if (actualTeams[i] === this.existingTeams[j].team_name) {
            checkPlayers = false;
          }
        }
        if (checkPlayers) {
          for (let j = 0; j < this.playerNames[i].length; j++) {
            for (let k = 0; k < this.existingPlayers.length; k++) {
              if (this.playerNames[i][j] === this.existingPlayers[k].player_name) {
                this.message = "New teams cannot have existing players!";
                return false;
              }
            }
          }
        }
        checkPlayers = true;
      }
    }
    // check for existing teams with new people (existing teams cannot add new players)
    if (this.numberOfTeams > 1) {
      let checkForNewPlayers = false;
      if (this.numberOfTeams > 1) {
        for (let i = 0; i < actualTeams.length; i++) {
          for (let j = 0; j < this.existingTeams.length; j++) {
            if (actualTeams[i] === this.existingTeams[j].team_name) {
              checkForNewPlayers = true;
            }
          }
          if (checkForNewPlayers) {
            let playerExists = false;
            let actualPlayers = this.playerNames[i].filter(element => { return element !== "" });
            for (let j = 0; j < actualPlayers.length; j++) {
              for (let k = 0; k < this.existingPlayers.length; k++) {
                if (this.playerNames[i][j] === this.existingPlayers[k].player_name) {
                  playerExists = true;
                }
              }
              if (!playerExists) {
                this.message = "Existing teams cannot have new players!";
                return false;
              }
              playerExists = false;
            }
          }
          checkForNewPlayers = false;
        }
      }
    }
    // checking for empty input and existing information
    if (this.numberOfTeams > 1) {
      for (let i = 0; i < actualTeams.length; i++) {
        for (let j = 0; j < actualTeams.length; j++) {
          if (actualTeams[i] === actualTeams[j] && i !== j) {
            this.message = "Team name already taken!";
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
          for (let j = 0; j < actualPlayers.length; j++) {
            // check if same name is used in same team
            for (let k = 0; k < actualPlayers.length; k++) {
              if (actualPlayers[j] === actualPlayers[k] && j !== k) {
                this.message = "Player name already exists!";
                return false;
              }
            }
            // check if same name is used in other teams
            for (let k = 0; k < this.playerNames.length; k++) {
              let actualPlayers2 = this.playerNames[k].filter(element => { return element !== "" });
              for (let l = 0; l < actualPlayers2.length; l++) {
                if (actualPlayers[j] === actualPlayers2[l] && (i !== k)) {
                  this.message = "Player name already taken!";
                  return false;
                }
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
