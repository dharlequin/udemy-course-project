import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from 'src/app/_services/recipes.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  private id: number;
  public recipe: Recipe;
  public editMode = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = +data['id'];
      this.editMode = data['id'] != null;
      this.initForm();
    });
  }

  private initForm(): void {
    let recipeIngredients = new FormArray([]);

    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'imagePath': new FormControl('', Validators.required),
    });

    if (this.editMode) {
      this.recipe = this.recipesService.getRecipe(this.id);
      console.log(this.recipe);
      this.form.patchValue(this.recipe);
      if (this.recipe.ingredients) {
        for (let ingredient of this.recipe.ingredients) {
          recipeIngredients.push(this.createNewArrayItem(ingredient));
        }
      }
    }
    this.form.addControl('ingredients', recipeIngredients);
  }

  public onSubmit() {
    const newRecipe: Recipe = this.form.getRawValue();
    console.log(newRecipe);
    if (this.editMode) {
      this.recipesService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipesService.createNewRecipe(newRecipe);
    }
    this.return();
  }

  public cancelChanges() {
    this.return();
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  public addIngredient(): void {
    this.ingredients.push(this.createNewArrayItem(null));
  }

  public removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  private createNewArrayItem(ingredient: Ingredient): FormGroup {
    return new FormGroup({
      'name': new FormControl(ingredient ? ingredient.name : '', Validators.required),
      'amount': new FormControl(ingredient ? ingredient.amount : '', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  private return() {
    if (this.editMode) {
      this.router.navigate(['/recipes', this.id]);
    } else {
      this.router.navigate(['/recipes']);
    }
  }
}
