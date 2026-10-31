import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { BeverageService } from '../../service/beverage.service';
import { Card } from '../../component/card/card';
import type { BeverageResponse } from '../../model/beverage.model';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-beverage',
  imports: [Card, ReactiveFormsModule],
  templateUrl: './beverage.html',
  styleUrl: './beverage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Beverage {
  private readonly service = inject(BeverageService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly beverages = signal<BeverageResponse[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly searchControl = new FormControl('', { nonNullable: true });

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        startWith(this.searchControl.value),
        map((query) => query.trim()),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((query) => {
          this.loading.set(true);
          this.error.set(null);

          const request = query
            ? this.service.searchByName(query)
            : this.service.getAll();

          return request.pipe(
            catchError((error: unknown) => {
              this.error.set(this.getErrorMessage(error));
              return of([]);
            }),
            finalize(() => this.loading.set(false)),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((beverages) => this.beverages.set(beverages));
  }

  protected describe(beverage: BeverageResponse): string {
    const details = [
      beverage.description,
      beverage.price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }),
      beverage.alcoholic ? 'Alcolica' : 'Analcolica',
    ];

    return details.filter(Boolean).join(' · ');
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return `Impossibile caricare le bevande (errore ${error.status}).`;
    }

    return 'Si è verificato un errore durante il caricamento delle bevande.';
  }
}
