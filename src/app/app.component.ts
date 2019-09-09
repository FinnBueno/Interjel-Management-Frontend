import {Component, HostListener, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  homo: boolean;

  private buffer = '';

  constructor(private router: Router) {
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.code !== undefined && event.code.indexOf('Key') !== 0) {
      if (event.code.toLowerCase() === 'backspace') {
        if (this.buffer.length > 0) {
          this.buffer = this.buffer.substring(0, this.buffer.length - 1);
        }
      }
      this.verifyHomo();
      return;
    }
    this.buffer += event.key;
    if (this.buffer.length > 4) {
      this.buffer = this.buffer.substring(this.buffer.length - 4);
    }
    this.verifyHomo();
  }

  private verifyHomo() {
    this.homo = this.buffer.toLowerCase() === 'homo';
  }

  logout() {
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('interjelToken') !== null;
  }
}
