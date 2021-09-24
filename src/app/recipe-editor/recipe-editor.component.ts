import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from 'src/assets/interfaces/recipe';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css'],
})
export class RecipeEditorComponent implements OnInit {
  recipe?: Recipe;
  recipeForm?: any;
  currentIngredients: string[] = [];
  currentInstructions: string[] = [];
  currentNotes: string[] = [];
  currentTags: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private recipeService: RecipeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.recipeService.getRecipeByID(id).subscribe((recipe: Recipe) => {
      this.recipe = recipe;

      this.recipeForm = this.fb.group({
        title: [this.recipe.title],
        serves: [this.recipe.serves],
        time: [this.recipe.time],
        primaryTag: [this.recipe.primaryTag],
        favorite: [this.recipe.favorite],
        imageSrc: [this.imageHandler()],

        tags: this.fb.array([this.fb.control('')]),
        ingredients: this.fb.array([this.fb.control('')]),
        instructions: this.fb.array([this.fb.control('')]),
        notes: this.fb.array([this.fb.control('')]),
      });

      this.currentIngredients = this.recipe.ingredients;
      this.currentInstructions = this.recipe.instructions;
      this.currentNotes = this.recipe.notes;
      this.currentTags = this.recipe.tags;
    });
  }

  get tags() {
    return this.recipeForm.get('tags') as FormArray;
  }
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }
  get notes() {
    return this.recipeForm.get('notes') as FormArray;
  }

  addTags(event: any) {
    event.preventDefault();
    this.tags.push(this.fb.control(''));
  }
  addIngredients(event: any) {
    event.preventDefault();
    this.ingredients.push(this.fb.control(''));
  }
  addInstructions(event: any) {
    event.preventDefault();
    this.instructions.push(this.fb.control(''));
  }
  addNotes(event: any) {
    event.preventDefault();
    this.notes.push(this.fb.control(''));
  }

  imageHandler() {
    if (this.recipe?.imageSrc === '../assets/images/placeholder.png') {
      return '';
    }

    return this.recipe?.imageSrc;
  }

  removeIngredient(i: number) {
    //cast to HTMLInputElement for access to value
    const el = <HTMLInputElement>document.getElementById(`ing-${i}`);

    //guard clause for funny business happening
    if (!el) {
      console.log('No element by that id exists');
      return;
    }

    //hide
    el!.style.display = 'none';

    //filter out the removed ingredient from final list to be sent
    this.currentIngredients = this.currentIngredients.filter((ing) => {
      return ing !== el!.value;
    });
  }

  getFinalIngredients(type: string): string[] {
    const cleanedIngredients = this.sanitize(this.recipeForm.get(type)?.value);

    const nodeList = Array.from(document.querySelectorAll(`.${type}List`));
    const editedIngredients = nodeList.map((node) => {
      const element = <HTMLInputElement>node.childNodes[1];
      return element.value;
    });

    return [...this.sanitize(editedIngredients), ...cleanedIngredients];
  }

  sanitize(input: string[]): string[] {
    const cleanedArr = input
      .filter((s: string) => {
        return s.length > 0;
      })
      .map((s: string) => {
        return s.toLowerCase();
      });

    return cleanedArr;
  }

  handleSubmit() {
    const finalIngredients = this.getFinalIngredients('ingredients');
    console.log(finalIngredients);
  }
}
