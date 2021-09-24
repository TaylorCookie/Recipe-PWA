import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from 'src/assets/interfaces/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-display-recipe',
  templateUrl: './display-recipe.component.html',
  styleUrls: ['./display-recipe.component.css'],
})
export class DisplayRecipeComponent implements OnInit {
  recipe?: Recipe;
  timeFormatted?: string;
  backgroundColor: string = this.recipeService.getRandomBackgroundColor();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.recipeService.getRecipeByID(id).subscribe((recipe: Recipe) => {
      this.recipe = recipe;
      this.timeFormatted = this.recipeService.convertTime(recipe.time);
    });
  }

  updateFavorite(event: any, id: number, recipe: Recipe): void {
    // this.recipeService.favoriteRecipe(recipe, id).subscribe((res) => {
    //   console.log(res);
    // });

    event.target.classList.toggle('favorite_btn');
  }
}
