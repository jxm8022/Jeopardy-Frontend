import { Component, Input, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryComponent } from '../category/category.component';
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

  categories: string[] = ["a", "b", "c", "d", "e"];
  questions: number[] = [1, 2, 3, 4, 5, 6];
  questionCost: number[] = [100, 200, 300, 400, 500];

  opacity: string = '100%';
  modalRef: MdbModalRef<CategoryComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.displayCategorySelector();
  }

  displayCategorySelector(): void {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(CategoryComponent, {
      modalClass: 'modal-dialog-centered'
    })
    this.modalRef.onClose.subscribe((message: any) => {
      this.categories = message;
      this.opacity = "100%";
    })
  }

  flipCard(question: number, category: number): void {
    console.log(category, question);
  }

}
