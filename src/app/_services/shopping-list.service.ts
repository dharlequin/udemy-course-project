import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredientsEmitter = new Subject<Ingredient[]>();
  editting = new Subject<number>();

  constructor(private http: HttpClient) { }

  public saveIngredients() {
    return this.http.put('https://udemy-http-project-3f72d.firebaseio.com/ingredients.json', this.ingredients);
  }

  public fetchIngredients() {
    this.http.get<Ingredient[]>('https://udemy-http-project-3f72d.firebaseio.com/ingredients.json').subscribe(response => {
      this.ingredients = response;
      this.updateList();
    });
  }

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  public addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.updateList();
  }

  public saveIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.updateList();
  }

  public deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.updateList();
  }

  private updateList() {
    this.ingredientsEmitter.next(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.updateList();
  }
}
