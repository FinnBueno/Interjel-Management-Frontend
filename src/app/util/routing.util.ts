import {Router} from '@angular/router';

export function navigateModal(route: any | (string|number)[], router: Router) {
  router.navigate(['/dashboard', {
    outlets: {
      'modal': assureArray(route)
    }
  }]);
}

function assureArray(obj: any) {
  if (!(obj instanceof Array))
    obj = [obj];
  return obj;
}

export function navigateWidget(route: string | (string|number)[], router: Router) {
  router.navigate(['/dashboard', {
    outlets: {
      'widget': assureArray(route)
    }
  }]);
}
