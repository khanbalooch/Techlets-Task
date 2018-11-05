import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  companyName = 'Techlets';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {

    const user = { email: 'test@gmail.com', password: 'test' };
    this.http.post('http://127.0.0.1:8081/addUser', user).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log('error');
    });

  }
}
