import {Pipe, PipeTransform} from '@angular/core';
import {Page} from '../../../model/page';
import {Router} from '@angular/router';

@Pipe({
  name: 'pageFilter'
})
export class PageFilter implements PipeTransform {

  constructor(private router: Router) {}

  transform(pages: Page[], args?: any): any {
    const root = localStorage.getItem('root');
    if (root === undefined) {
      this.router.navigate(['/']);
      return pages;
    }
    if (!root) {
      return pages.filter(page => !page.adminOnly);
    } else {
      return pages;
    }
  }

}
