import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../models/Player';
import { Team } from '../models/Team';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  @Input()
  teams: Team[] = [];

  @Input()
  players: Player[][] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
