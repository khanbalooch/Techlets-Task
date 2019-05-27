import { LcsService } from './../../services/lcs.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-find-lcs',
  templateUrl: './find-lcs.component.html',
  styleUrls: ['./find-lcs.component.css']
})
export class FindLcsComponent implements OnInit {

  list: number[] = [];
  previousRecord: Observable<any>;
  // [
  //   {
  //     lcs: 'test1'
  //   },
  //   {
  //     lcs: 'test2'
  //   }
  // ];
  prerec =  'Note: The Only Work remaining is to show the fetched data here(using *ngFor). Data is fetched from Mongodb and shown in browser console';
  number1: any;
  number2: any;
  strings = {string1: '', string2: '', lcs: '', user: localStorage.getItem('user_id'), };
  data: any;
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwt') })
  };

  constructor(private http: HttpClient, private router: Router, private lcsService: LcsService) {}
  ngOnInit() {
    this.previousRecord = this.lcsService.getAllLCS();
    // .subscribe(
    //   data =>  {
    //     this.previousRecord = data;
    //     console.log(this.previousRecord);
    //   },
    //   error => console.log(error)
    // );


    for (let i = 10; i < 101; i++) { // Initialize the array from 10-100
      this.list.push(i);
    }


  }
  randomString(strlen: number) {

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < strlen; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      result += chars.substring(rnum, rnum + 1);
    }
    return result;
  }
  setString1() {
    this.strings.string1 = this.randomString(this.number1);
    console.log('string 1:' + this.strings.string1);
  }
  setString2() {
    this.strings.string2 = this.randomString(this.number2);
    console.log('string 2:' + this.strings.string2);
  }
  findLCS() {
    const instance: FindLcsComponent = this;
    this.http.post('http://127.0.0.1:8081/findlcs', this.strings).subscribe(
      function(response) {
          instance.data = response;
          instance.strings.lcs = instance.data.lcs;
          console.log('lcs: ' + instance.strings.lcs);
          instance.saveLcs();
      },
      function(error) {
        console.log(error);
      }
    );
  }

  saveLcs() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwt') })
    };
    console.log('https Ops' + httpOptions);
      this.http.post('http://127.0.0.1:8081/savelcs', this.strings, httpOptions ).subscribe(
        function(response) {
          console.log(response);
         },
        function(error) {
          console.log(error);
        }
      );
  }
  // =====================================================================
  doLogout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }


}
