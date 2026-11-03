import { Component, input } from '@angular/core';
import type { Ingredient, Allergen} from '../../../core/models/product.model';
@Component({
  selector: 'app-ingredient-list',
  imports: [],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css',
})
export class IngredientListComponent {
  readonly ingredients = input.required<Ingredient[]>();
  readonly allergens = input.required<Allergen[]>();
}
