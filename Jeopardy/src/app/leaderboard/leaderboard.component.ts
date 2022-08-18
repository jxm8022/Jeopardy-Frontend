import { Component, OnInit } from '@angular/core';
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { HttpService } from '../service/http.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PlayersComponent } from '../players/players.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  teams: Team[] = [];
  players: Player[][] = [];

  opacity: string = "100%";
  navOpacity: string = "25%";
  width: string = "";

  modalRef: MdbModalRef<PlayersComponent> | null = null;

  constructor(private api: HttpService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.width = this.width + 100 / 3 + "%";
    this.api.getSortedTeams().subscribe(res => {
      if (res) {
        this.teams = res;
        this.navOpacity = "100%";
      }
    });
  }

  showPlayers(team: Team): void {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(PlayersComponent, {
      modalClass: 'modal-dialog-centered',
      data: { team }
    });
    this.modalRef.onClose.subscribe((message: any) => {
      this.opacity = message;
    });
  }
}
