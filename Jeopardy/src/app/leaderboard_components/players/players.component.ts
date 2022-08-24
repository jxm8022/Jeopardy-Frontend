import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Team } from '../../models/Team';
import { Player } from '../../models/Player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  team!: Team;
  members!: Player[];

  constructor(private playerService: PlayerService, public modalRef: MdbModalRef<PlayersComponent>) { }

  ngOnInit(): void {
    this.playerService.getMemebers(this.team.team_id).subscribe(res => {
      this.members = res;
    });
  }

  close(): void {
    this.modalRef.close("100%");
  }

}
