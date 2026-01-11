import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  private apiUrl = 'http://localhost:8080/api/menu';

  constructor(private http: HttpClient) {}

  // getMenus() {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // addMenu(menu: any) {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });

  //   return this.http.post(this.apiUrl, menu, { headers });
  // }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl, this.getHeaders());
  }

  create(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, menu, this.getHeaders());
  }

  update(id: number, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${id}`, menu, this.getHeaders());
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
