import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToDo } from '../models/todo.model';
import { map, tap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  private BASE_URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {

  }

  setAPIUrl(url: string) {
    this.BASE_URL = url || this.BASE_URL;
  }

  getFormDigest() {

    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json;odata=verbose'
    });

    return this.httpClient.post<any>(`${this.BASE_URL}/_api/contextinfo`, {}, { headers })
      .pipe(map(data => data.d.GetContextWebInformation.FormDigestValue))
      .toPromise();
  }

  getToDos() {
    return this.httpClient.get<any>(`${this.BASE_URL}/_api/web/lists/getbytitle('To Do')/items?$select=Id,Title,Status`).pipe(
      map(response => response.value as ToDo[])
    ).toPromise();
  }

  async addToDo(toDo: ToDo) {

    const input = {
      __metadata: { type: 'SP.Data.To_x0020_DoListItem' },
      Title: toDo.Title
    };

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;odata=verbose',
      Accept: 'application/json;odata=verbose',
      'X-RequestDigest': await this.getFormDigest()
    });

    return this.httpClient.post<any>(`${this.BASE_URL}/_api/web/lists/getbytitle('To Do')/items`, input, { headers }).pipe(
      map(p => p.d ? ({ Id: p.d.Id, Title: p.d.Title }) : null),
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    ).toPromise();
  }

  async updateToDo(todo: ToDo) {

    const { Title } = todo;
    const input = {
      __metadata: { type: 'SP.Data.To_x0020_DoListItem' },
      Title
    };

    const headers: HttpHeaders = new HttpHeaders({
      'X-HTTP-Method': 'MERGE',
      'IF-MATCH': '*',
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': await this.getFormDigest()
    });

    return this.httpClient.post<any>(`${this.BASE_URL}/_api/web/lists/getbytitle('To Do')/items(${todo.Id})`, input, { headers }).pipe(
      tap(response => console.log('Update Response => ', response))
    ).toPromise();
  }

  async deleteToDo(todo: ToDo) {

    const headers: HttpHeaders = new HttpHeaders({
      'X-HTTP-Method': 'DELETE',
      'IF-MATCH': '*',
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': await this.getFormDigest()
    });

    return this.httpClient.post<any>(`${this.BASE_URL}/_api/web/lists/getbytitle('To Do')/items(${todo.Id})`, {}, { headers }).pipe(
      tap(response => console.log('Delete Response => ', response))
    ).toPromise();
  }


}
