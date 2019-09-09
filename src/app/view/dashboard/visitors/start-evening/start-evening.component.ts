import {Component, OnInit} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {InstanceResource} from '../../../../resource/instance.service';
import {Instance} from '../../../../model/instance';

@Component({
  selector: 'app-start-evening',
  templateUrl: './start-evening.component.html',
  styleUrls: ['./start-evening.component.scss']
})
export class StartEveningComponent {

  notes = '';

  constructor(private instanceService: InstanceResource) {}

  startEvening() {
    const now = new Date(Date.now());
    let found = false;
    this.instanceService.forEach(evening => {
      if (found)
        return;
      if (evening.date.getFullYear() === now.getFullYear() && evening.date.getMonth() === now.getMonth() && evening.date.getDate() === now.getDate()) {
        found = true;
      }
    });
    if (found) {
      window.alert('Er is al een avond gestart vandaag.');
    } else {
      this.instanceService.create(new Instance(this.notes));
    }
  }

}
