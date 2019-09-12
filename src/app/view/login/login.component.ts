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
    this.rest.post('auth', {
      email: this.email,
      password: this.password
    }).subscribe(
      (token) => {
        localStorage.setItem('interjelToken', token['token']);
        localStorage.setItem('root', token['root']);
        this.router.navigate(['/dashboard']);
      },
      () => {
        this.errorMessage = 'Email of wachtwoord is fout.';
        this.loading = false;
      });
  }

}
