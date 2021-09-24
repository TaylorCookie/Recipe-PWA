import { Component } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
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
    title: ['', Validators.required],
    serves: ['', Validators.required],
    time: ['', Validators.required],
    primaryTag: ['', Validators.required],
    favorite: [false],
    imageSrc: [''],

    tags: this.fb.array([this.fb.control('')], Validators.required),
    ingredients: this.fb.array([this.fb.control('')], Validators.required),
    instructions: this.fb.array([this.fb.control('')], Validators.required),
    notes: this.fb.array([this.fb.control('')], Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private recipeService: RecipeService
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

  onFileSelected(event: any) {
    console.log(event);
    this.imageToUpload = event.target.files[0];
    console.log(this.imageToUpload);
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

  checkEmptyImage(): string {
    if (this.recipeForm.get('imageSrc')?.value) {
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

  formSubmit() {
    //format the different submissions
    const cleanedIngredients = this.sanitize(
      this.recipeForm.get('ingredients')?.value
    );
    const cleanedInstructions = this.sanitize(
      this.recipeForm.get('instructions')?.value
    );
    const cleanedNotes = this.sanitize(this.recipeForm.get('notes')?.value);
    const cleanedTags = [
      this.recipeForm.get('primaryTag')?.value,
      ...this.sanitize(this.recipeForm.get('tags')?.value),
    ];

    //set the recipe to be sent
    this.newRecipe = {
      title: this.recipeForm.get('title')?.value,
      serves: <number>this.recipeForm.get('serves')?.value,
      time: <number>this.recipeForm.get('time')?.value,
      primaryTag: this.recipeForm.get('primaryTag')?.value,
      tags: cleanedTags,
      imageSrc: this.checkEmptyImage(), //call to check if image src is empty
      favorite: false,
      instructions: cleanedInstructions,
      ingredients: cleanedIngredients,
      notes: cleanedNotes,
    };

    console.log(this.newRecipe);

    //request to add the recipe
    this.recipeService.addRecipe(this.newRecipe).subscribe((data) => {
      console.log(data);
    });
  }
}
