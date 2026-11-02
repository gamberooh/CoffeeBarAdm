import { Component, input, output, signal } from '@angular/core';
import { CategoryFilter, CategoryId } from '../../../core/models/product.model';

@Component({
  selector: 'app-filter-bar.component',
  imports: [],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css',
})
export class FilterBarComponent {
  readonly categories = input.required<CategoryFilter[]>();
  readonly activeCategories = input<CategoryId>('all');

  readonly searchChange = output<string>();
  readonly categoryChange = output<CategoryId>();
  readonly nonAlcoohlicToggle = output<boolean>();

  onSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchChange.emit(val);
  }
}
