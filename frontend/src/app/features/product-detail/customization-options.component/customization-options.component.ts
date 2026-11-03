import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-customization-options',
  imports: [],
  templateUrl: './customization-options.component.html',
  styleUrl: './customization-options.component.css',
})
export class CustomizationOptionsComponent {
  readonly selectedOptions = input<Record<string, string>>({});
  readonly optionChanged = output<{group: string, option: string}>();
}
