import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Team } from '../../models/Team';
import { Player } from '../../models/Player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  team!: Team;
  members!: Player[];

  constructor(private api: HttpService, public modalRef: MdbModalRef<PlayersComponent>) { }

  ngOnInit(): void {
    this.api.getMemebers(this.team.team_id).subscribe(res => {
      this.members = res;
    });
  }

  close(): void {
    this.modalRef.close("100%");
  }

}
