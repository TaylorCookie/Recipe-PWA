import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/assets/interfaces/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  cards: Recipe[] = [];
  loadingCards: any[] = Array(12).fill(null);

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.cards = recipes;
    });
  }
}
