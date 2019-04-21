import { ShoppingListService } from './../../_services/shopping-list.service';
import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  ingredient: Ingredient = new Ingredient;
  selectedIndex: number;
  subscription: Subscription;
  editting = false;
  @ViewChild('form') slForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.editting.subscribe(index => {
      this.selectedIndex = index;
      const selectedIngredient = this.shoppingListService.getIngredient(index);
      this.ingredient = new Ingredient(selectedIngredient.name, selectedIngredient.amount);
      this.editting = true;
    });
  }

  public onSubmit() {
    if (this.editting) {
      this.shoppingListService.saveIngredient(this.selectedIndex, this.ingredient);
    } else {
      this.shoppingListService.addIngredient(this.ingredient);
    }
    this.clearForm();
  }

  public deleteIngredient() {
    this.shoppingListService.deleteIngredient(this.selectedIndex);
    this.clearForm();
  }

  public clearForm() {
    this.ingredient = new Ingredient;
    this.slForm.reset();
    this.editting = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
