import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LcsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwt') })
  };
  constructor(private http: HttpClient) { }

  getAllLCS(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8081/getlcs/' + localStorage.getItem('user_id'), this.httpOptions);
  }
}
