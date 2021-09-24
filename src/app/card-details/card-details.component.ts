import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/assets/interfaces/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
})
export class CardDetailsComponent implements OnInit {
  @Input() recipe?: Recipe;
  timeFormatted?: string;
  backgroundColor: string = this.recipeService.getRandomBackgroundColor();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.timeFormatted = this.recipeService.convertTime(this.recipe?.time);
  }

  updateFavorite(event: any, id: number, recipe: Recipe): void {
    // this.recipeService.favoriteRecipe(recipe, id).subscribe((res) => {
    //   console.log(res);
    // });

    event.target.classList.toggle('favorite_btn');
  }
}
