import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToDo } from '../models/todo.model';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
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

  private getItemTypeForListName(name) {
    return 'SP.Data.' + name.charAt(0).toUpperCase() + name.split(' ').join('').slice(1) + 'ListItem';
  }

  getToDos() {
    return this.httpClient.get<any>(`${this.BASE_URL}_api/web/lists/getbytitle('To Do')/items?$select=Id,Title,Status`).pipe(
      map(response => response.value as ToDo[])
    );
  }

  addToDo(toDo: ToDo): Observable<ToDo> {
    return this.httpClient.post<any>(`${this.BASE_URL}_api/web/lists/getbytitle('To Do')/items`, toDo).pipe(
      map(p => ({ Id: p.Id, Title: p.Title })),
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  updateToDo(todo: ToDo) {

    const { Title } = todo;
    const input = {
      __metadata : {type: 'SP.Data.To_x0020_DoListItem'},
      Title
    };


    const headers: HttpHeaders =  new HttpHeaders({
        'X-HTTP-Method': 'MERGE',
        'IF-MATCH': '*',
        Accept: 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose'
    });

    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(`${this.BASE_URL}_api/web/lists/getbytitle('To Do')/items(${todo.Id})`, input, {headers}).pipe(
        tap(response => console.log('Update Response => ', response))
      );
  }

  deleteToDo(todo: ToDo) {

    const headers: HttpHeaders =  new HttpHeaders({
      'X-HTTP-Method': 'DELETE',
      'IF-MATCH': '*',
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose'
    });

    return this.httpClient.post<any>(`${this.BASE_URL}_api/web/lists/getbytitle('To Do')/items(${todo.Id})`, {}, {headers}).pipe(
      tap(response => console.log('Delete Response => ', response))
    );
  }


}
