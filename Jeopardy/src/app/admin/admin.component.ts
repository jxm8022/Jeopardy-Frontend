import { Component, OnInit } from '@angular/core';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  username: string = "";
  password: string = "";

  login(): void {
    var hash = sha256(this.password);
    localStorage.setItem("adminActive", "true");
  }

}
