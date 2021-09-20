import { Component } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Recipe } from 'src/assets/interfaces/recipe';

import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.css'],
})
export class AddRecipeFormComponent {
  newRecipe?: Recipe;
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
  });

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
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

  onFileSelected(event: any) {
    console.log(event);
    this.imageToUpload = event.target.files[0];
    console.log(this.imageToUpload);
  }

  structureIngredients(): string[] {
    const ingArr = this.recipeForm
      .get('ingredients')
      ?.value.map((ing: any, i: number) => {
        if (ing == '') {
          return '';
        }

        const quantity = <HTMLInputElement>(
          document.getElementById(`ingredient-quantity-${i}`)
        );
        const measurement = <HTMLInputElement>(
          document.getElementById(`ingredient-measurement-${i}`)
        );

        return `${quantity.value} ${measurement.value} ${ing}`.toLowerCase();
      });

    const cleanedIngs = ingArr.filter((ing: string) => {
      return ing.length > 0;
    });

    return cleanedIngs;
  }

  sanitize(input: string[]): string[] {
    const cleanedArr = input.filter((s: string) => {
      return s.length > 0;
    });

    return cleanedArr;
  }

  validateSubmit() {
    this.formSubmit();
  }

  formSubmit() {
    const ingStructured = this.structureIngredients();
    const cleanedInstructions = this.sanitize(
      this.recipeForm.get('instructions')?.value
    );
    const cleanedTags = [
      this.recipeForm.get('primaryTag')?.value,
      ...this.sanitize(this.recipeForm.get('tags')?.value),
    ];

    this.newRecipe = {
      id: 1,
      title: this.recipeForm.get('title')?.value,
      serves: <number>this.recipeForm.get('serves')?.value,
      time: <number>this.recipeForm.get('serves')?.value,
      primaryTag: this.recipeForm.get('primaryTag')?.value,
      tags: cleanedTags,
      imageSrc: this.recipeForm.get('imageSrc')?.value,
      favorite: false,
      instructions: cleanedInstructions,
      ingredients: ingStructured,
      notes: [],
    };

    if (this.imageToUpload) {
      //actually upload the image
      console.log('Uploading');

      this.loading = !this.loading;
      console.log(this.imageToUpload);
      this.fileUploadService
        .upload(this.imageToUpload)
        .subscribe((event: any) => {
          if (typeof event === 'object') {
            // Short link via api response
            this.shortLink = event.link;

            this.loading = false;

            console.log(this.shortLink);
          }
        });
    }

    //ADD A POST HERE LATER//

    console.log(this.newRecipe);
  }
}
