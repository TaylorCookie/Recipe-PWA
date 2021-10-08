import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/assets/interfaces/recipe';
import { RecipeService } from '../recipe.service';
import { FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css'],
})
export class RecipeEditorComponent implements OnInit {
  recipe?: Recipe;
  favorite: boolean = false;
  recipeForm?: any;
  helpClicked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router
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

        tags: this.fb.array([]),
        ingredients: this.fb.array([]),
        instructions: this.fb.array([]),
        notes: this.fb.array([]),
      });

      //fill arrayforms with elements from current recipe
      this.recipe.ingredients!.forEach((item) => {
        this.ingredients.push(new FormControl(item));
      });
      this.recipe.instructions!.forEach((item) => {
        this.instructions.push(new FormControl(item));
      });
      this.recipe.notes!.forEach((item) => {
        this.notes.push(new FormControl(item));
      });
      this.recipe.tags!.forEach((item, i) => {
        //ignore first item as it is the primary tag
        if (i === 0) {
          return;
        }

        this.tags.push(new FormControl(item));
      });

      //set the favorite so it can be sent at the end
      this.favorite = this.recipe.favorite;
    });
  }

  get title() {
    return this.recipeForm.get('title') as string;
  }
  get primaryTag() {
    return this.recipeForm.get('primaryTag') as string;
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

  updateFavorite(event: any, id: number, recipe: Recipe): void {
    event.preventDefault();
    this.favorite = !this.favorite;
    event.target.classList.toggle('favorite_btn');
  }

  deleteRecipe(event: any, id: number, recipe: Recipe) {
    event.preventDefault();

    const res = window
      .prompt(
        `If you are sure you want to delete this recipe, type "${recipe.title}" below.`
      )
      ?.toLowerCase()
      .trim();

    if (res === recipe.title.toLowerCase().trim()) {
      this.recipeService
        .deleteRecipe(this.recipe!.id)
        .subscribe((recipe: Recipe) => {
          window.alert('Recipe has been deleted!');

          this.router.navigate(['/']);
        });
    }
  }

  helpHover(className: string) {
    //guard clause helps users who click on tooltip to have it remain on and uninterupted by mouseovers
    if (this.helpClicked) {
      return;
    }

    document.querySelector(`.${className}`)?.classList.toggle('hidden');
  }

  helpClick(className: string) {
    this.helpClicked = !this.helpClicked;

    //if true, show all tooltips on page
    if (this.helpClicked) {
      document.querySelectorAll('.tooltip')?.forEach((el) => {
        el.classList.remove('hidden');
      });
    } else {
      document.querySelectorAll('.tooltip')?.forEach((el) => {
        el.classList.add('hidden');
      });

      //have to remove it on the one that was clicked
      document.querySelector(`.${className}`)?.classList.remove('hidden');
    }
  }

  imageHandler() {
    //check if image is default, hide if true
    if (this.recipe?.imageSrc === '../../assets/images/placeholder.png') {
      return '';
    }

    return this.recipe?.imageSrc;
  }

  checkEmptyImage(): string {
    if (this.recipeForm.get('imageSrc')?.value.trim()) {
      return this.recipeForm.get('imageSrc')?.value;
    }

    return '../../assets/images/placeholder.png';
  }

  removeIngredient(i: number) {
    //guard clause to prevent accidently deleting
    const res = window.confirm('Are you sure you want to delete?');
    if (!res) return;

    //cast to HTMLInputElement for access to value
    const el = <HTMLInputElement>(
      document.getElementById(`ing-${i}`)?.closest('.ingredientsList')
    );

    //guard clause for funny business happening
    if (!el) {
      console.log('No element by that id exists');
      return;
    }

    el!.style.display = 'none';

    //remove the element from the list
    this.ingredients.removeAt(i);
  }

  removeInstruction(i: number) {
    //guard clause to prevent accidently deleting
    const res = window.confirm('Are you sure you want to delete?');
    if (!res) return;

    //cast to HTMLInputElement for access to value
    const el = <HTMLInputElement>(
      document.getElementById(`ins-${i}`)?.closest('.instructionsList')
    );

    //guard clause for funny business happening
    if (!el) {
      console.log('No element by that id exists');
      return;
    }

    el!.style.display = 'none';

    //remove the element from the list
    this.instructions.removeAt(i);
  }

  removeNote(i: number) {
    //guard clause to prevent accidently deleting
    const res = window.confirm('Are you sure you want to delete?');
    if (!res) return;

    //cast to HTMLInputElement for access to value
    const el = <HTMLInputElement>(
      document.getElementById(`note-${i}`)?.closest('.notesList')
    );

    //guard clause for funny business happening
    if (!el) {
      console.log('No element by that id exists');
      return;
    }

    el!.style.display = 'none';

    //remove the element from the list
    this.notes.removeAt(i);
  }

  removeTag(i: number) {
    //guard clause to prevent accidently deleting
    const res = window.confirm('Are you sure you want to delete?');
    if (!res) return;

    //cast to HTMLInputElement for access to value
    const el = <HTMLInputElement>(
      document.getElementById(`tag-${i}`)?.closest('.tagsList')
    );

    //guard clause for funny business happening
    if (!el) {
      console.log('No element by that id exists');
      return;
    }

    el!.style.display = 'none';

    //remove the element from the list
    this.tags.removeAt(i);
  }

  sanitize(input: string[], withCaps: boolean): string[] {
    let cleanedArr;

    if (!withCaps) {
      cleanedArr = input.filter((s: string) => {
        return s.length > 0;
      });
    } else {
      cleanedArr = input
        .filter((s: string) => {
          return s.length > 0;
        })
        .map((s: string) => {
          return this.capitalize(s);
        });
    }

    return cleanedArr;
  }

  capitalize(input: string): string {
    let separateWords = input.toLowerCase().split(' ');
    let capsWords = separateWords.map((word) => {
      return word.charAt(0).toUpperCase() + word.substring(1);
    });

    return capsWords.join(' ');
  }

  handleSubmit() {
    const finalIngredients = this.sanitize(
      this.recipeForm.get('ingredients')?.value,
      true
    );
    const finalInstructions = this.sanitize(
      this.recipeForm.get('instructions')?.value,
      false
    );
    const finalNotes = this.sanitize(
      this.recipeForm.get('notes')?.value,
      false
    );
    //add primary tag to front, and sanitize it. Add rest of tags to the end
    const finalTags = [
      ...this.sanitize([this.recipeForm.get('primaryTag')?.value], true),
      ...this.sanitize(this.recipeForm.get('tags')?.value, true),
    ];

    //set the recipe to be sent
    const updatedRecipe = {
      title: this.recipeForm.get('title')?.value,
      serves: <number>this.recipeForm.get('serves')?.value,
      time: <number>this.recipeForm.get('time')?.value,
      primaryTag: this.capitalize(this.recipeForm.get('primaryTag')?.value),
      tags: finalTags,
      imageSrc: this.checkEmptyImage(), //call to check if image src is empty
      favorite: this.favorite,
      instructions: finalInstructions,
      ingredients: finalIngredients,
      notes: finalNotes,
    };

    // request to add the recipe
    this.recipeService
      .updateRecipe(updatedRecipe, this.recipe!.id)
      .subscribe((data) => {
        window.alert('Recipe has been updated!');

        //route back to display this recipe
        this.router.navigate([`/recipe/${this.recipe!.id}`]);
      });
  }
}
