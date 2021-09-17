import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/assets/interfaces/recipe';
import { RECIPES } from 'src/assets/mock-recipes';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  cards: Recipe[] = [];

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.cards = RECIPES;
    }, 1000);
  }
}