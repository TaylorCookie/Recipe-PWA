import { Component } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NewRecipe } from 'src/assets/interfaces/newRecipe';

import { FileUploadService } from '../file-upload.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.css'],
})
export class AddRecipeFormComponent {
  newRecipe?: NewRecipe;
  imageToUpload?: File;
  shortLink: string = '';
  loading: boolean = false;

  recipeForm = this.fb.group({
    title: [''],
    serves: [''],
    time: [''],
    primaryTag: [''],
    favorite: [false],
    imageSrc: [''],

    tags: this.fb.array([this.fb.control('')]),
    ingredients: this.fb.array([this.fb.control('')]),
    instructions: this.fb.array([this.fb.control('')]),
    notes: this.fb.array([this.fb.control('')]),
  });

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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

  // onFileSelected(event: any) {
  //   console.log(event);
  //   this.imageToUpload = event.target.files[0];
  //   console.log(this.imageToUpload);
  // }

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

  checkEmptyImage(): string {
    if (this.recipeForm.get('imageSrc')?.value.trim()) {
      return this.recipeForm.get('imageSrc')?.value;
    }

    return '../../assets/images/placeholder.png';
  }

  imageUpload() {
    ///////////////////////////////////////////////////////
    // PLACEHOLDER FOR IMAGE UPLOAD////////////////////////
    ///////////////////////////////////////////////////////
    // if (this.imageToUpload) {
    //   //actually upload the image
    //   console.log('Uploading');
    //   this.loading = !this.loading;
    //   console.log(this.imageToUpload);
    //   this.fileUploadService
    //     .upload(this.imageToUpload)
    //     .subscribe((event: any) => {
    //       if (typeof event === 'object') {
    //         // Short link via api response
    //         this.shortLink = event.link;
    //         this.loading = false;
    //         console.log(this.shortLink);
    //       }
    //     });
    // }
  }

  cancelHander() {
    this.router.navigate([`/`]);
  }

  formSubmit() {
    //format the different submissions
    const cleanedIngredients = this.sanitize(
      this.recipeForm.get('ingredients')?.value,
      true
    );
    const cleanedInstructions = this.sanitize(
      this.recipeForm.get('instructions')?.value,
      false
    );
    const cleanedNotes = this.sanitize(
      this.recipeForm.get('notes')?.value,
      false
    );
    const cleanedTags = [
      ...this.sanitize([this.recipeForm.get('primaryTag')?.value], true),
      ...this.sanitize(this.recipeForm.get('tags')?.value, true),
    ];

    //set the recipe to be sent
    this.newRecipe = {
      title: this.recipeForm.get('title')?.value,
      serves: <number>this.recipeForm.get('serves')?.value,
      time: <number>this.recipeForm.get('time')?.value,
      primaryTag: this.capitalize(this.recipeForm.get('primaryTag')?.value),
      tags: cleanedTags,
      imageSrc: this.checkEmptyImage(), //call to check if image src is empty
      favorite: false,
      instructions: cleanedInstructions,
      ingredients: cleanedIngredients,
      notes: cleanedNotes,
    };

    //request to add the recipe
    this.recipeService.addRecipe(this.newRecipe).subscribe((data) => {
      console.log(data);

      if (
        window.confirm(
          'Recipe Created Successfully! \n\nClick "OK" to view the recipe you just created! \nClick "Cancel" to stay on this page and create another recipe.'
        )
      ) {
        //route back to display this recipe
        this.router.navigate([`/recipe/${data.id}`]);
      } else {
        //reload page
        location.reload();
      }
    });
  }
}
