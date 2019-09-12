import {Component, Injectable} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Page} from '../../model/page';
import {navigateWidget} from '../../util/routing.util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  pages = [];

  private _header: string;
  get header(): string {
    return this._header;
  }

  set header(header: string) {
    this._header = header;
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.pages = [
      new Page('member', 'address-book', 'Leden'),
      new Page('visitors', 'users', 'Bezoekers'),
      // new Page('events', 'calendar', 'Evenementen'),
      new Page('admin', 'desktop', 'Admin', true)
    ];
    if (router.url.includes('(')) {
      const targetPage = /\(\w+:(\w+)\)$/.exec(router.url)[1];
      const index = this.pages.findIndex(page => page.name === targetPage);
      this.navigate(this.pages[index]);
    } else {
      this.navigate(this.pages[1]);
    }
  }

  navigate(page: Page) {
    navigateWidget(page.name, this.router);
    this.header = page.niceName;
  }

}
