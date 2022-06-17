import { Component, OnInit } from '@angular/core';
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  teams: Team[] = [];
  players: Player[][] = [];

  constructor(private api: HttpService) { }

  ngOnInit(): void {
    this.api.getSortedTeams().subscribe(res => {
      this.teams = res;
      console.log(res);
    })
  }

}
