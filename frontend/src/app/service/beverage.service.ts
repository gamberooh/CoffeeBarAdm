import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

import type { BeverageRequest, BeverageResponse } from '../model/beverage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeverageService {
  
  private readonly http = inject(HttpClient);
  private readonly API_URL = `/api/beverage`;
  
  getAll(): Observable<BeverageResponse[]> {
    return this.http.get<BeverageResponse[]>(this.API_URL);
  }

  getById(id: string): Observable<BeverageResponse> {
    return this.http.get<BeverageResponse>(`${this.API_URL}/${id}`);
  }

  getByName(name: string): Observable<BeverageResponse> {
    return this.http.get<BeverageResponse>(`${this.API_URL}/by-name/${name}`)
  }

  searchByName(name: string): Observable<BeverageResponse[]> {
    return this.http.get<BeverageResponse[]>(`${this.API_URL}/search`, {
      params: { q: name },
    });
  }

  create(payload: BeverageRequest): Observable<BeverageResponse> {
    return this.http.post<BeverageResponse>(this.API_URL, payload);
  }

  updateById(id: string, payload: BeverageRequest): Observable<BeverageResponse> {
    return this.http.put<BeverageResponse>(`${this.API_URL}/${id}`, payload);
  }

  deleteById(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.API_URL}/${id}`);  
  }

}
