import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgOptimizedImage],
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly image = input('');
  readonly imageAlt = input('');
  readonly title = input.required<string>();
  readonly description = input('');
}
