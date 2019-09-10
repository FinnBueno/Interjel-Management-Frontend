import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../../resource/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loading: boolean;
  errorMessage: string;

  constructor(private router: Router, private rest: RestService) {
  }

  ngOnInit() {
    this.errorMessage = undefined;
    localStorage.removeItem('interjelToken');
  }

  login() {
    this.loading = true;
    console.log('Login 1');
    this.rest.post('auth', {
      email: this.email,
      password: this.password
    }).subscribe(
      (token) => {
        console.log('Login 2');
        localStorage.setItem('interjelToken', token['token']);
        console.log('Login 3', token['token']);
        localStorage.setItem('root', token['root']);
        console.log('Login 4', token['root']);
        this.router.navigate(['/dashboard']);
        console.log('Login 5', token['root']);
      },
      () => {
        this.errorMessage = 'Email of wachtwoord is fout.';
        this.loading = false;
      });
  }

}
