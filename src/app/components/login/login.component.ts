import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any;
  loginCredentials = { email: '', password: ''};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    const instance: LoginComponent = this;
    this.http.post('http://127.0.0.1:8081/login', this.loginCredentials).subscribe(
      function(response) {
        this.data = response;
        console.log('login successfull:' + this.data.user_id  );
        localStorage.setItem('user_id', this.data.user_id);
        localStorage.setItem('jwt', this.data.token);
        console.log('jwt:' + this.data.token );
        instance.router.navigateByUrl('find-lcs');
      },
      function(error) {
          console.log(error);
      }
    );
  }
}
