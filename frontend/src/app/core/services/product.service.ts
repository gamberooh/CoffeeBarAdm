import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

import type { ProductResponse, ProductRequest } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  private readonly http = inject(HttpClient);
  private readonly API_URL = `/api/product`;
  
  getAll(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.API_URL);
  }

  getById(id: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.API_URL}/${id}`);
  }

  getByName(name: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.API_URL}/by-name/${name}`)
  }

  searchByName(name: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.API_URL}/search`, {
      params: { q: name },
    });
  }

  create(payload: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.API_URL, payload);
  }

  updateById(id: string, payload: ProductRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.API_URL}/${id}`, payload);
  }

  deleteById(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.API_URL}/${id}`);  
  }

}
