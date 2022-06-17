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

  opacity: string = "20%";
  width: string = "";

  constructor(private api: HttpService) { }

  ngOnInit(): void {
    this.width = this.width + 100 / 3 + "%";
    this.api.getSortedTeams().subscribe(res => {
      if (res) {
        this.teams = res;
        this.opacity = "100%";
      }
    })
  }

}
