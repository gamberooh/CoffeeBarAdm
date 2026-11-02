import { Component, input, output } from '@angular/core';
import type { CategoryFilter, CategoryId } from '../../../core/models/product.model';

@Component({
  selector: 'app-filter-bar',
  imports: [],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css',
})
export class FilterBarComponent {
  readonly categories = input.required<CategoryFilter[]>();
  readonly activeCategory = input<CategoryId>('all');

  readonly searchChange = output<string>();
  readonly categoryChange = output<CategoryId>();
  // readonly nonAlcoohlicToggle = output<boolean>();

  onSearch(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchChange.emit(val);
  }
}
