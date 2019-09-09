import {Component} from '@angular/core';
import {Instance} from '../../../model/instance';
import {InstanceResource} from '../../../resource/instance.service';
import {DateFormatPipe} from '../../util/pipe/date.pipe';
import {navigateModal} from '../../../util/routing.util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss']
})
export class VisitorsComponent {

  constructor(private instanceResource: InstanceResource, private router: Router) {
  }

  getInstances(): Instance[] {
    return this.instanceResource.getAll(false);
  }

  openInstanceOverview(instance) {
    navigateModal(['overview-evening', instance.id], this.router);
  }


}
