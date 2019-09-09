import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InstanceResource} from '../../../../resource/instance.service';
import {Instance} from '../../../../model/instance';
import {Member} from '../../../../model/member';
import {MemberResource} from '../../../../resource/member.service';
import $ from '../../../../../../node_modules/jquery/dist/jquery.js';

@Component({
  selector: 'app-overview-evening',
  templateUrl: './overview-evening.component.html',
  styleUrls: ['./overview-evening.component.scss']
})
export class OverviewEveningComponent implements OnInit {

  selected: Instance;

  constructor(private instances: InstanceResource, private members: MemberResource, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.instances.find(+params['id'], false).subscribe(mmbr => {
        this.selected = mmbr;
        setTimeout(() => {
          const height = 66 * Math.max(this.getVisitors().length, this.getNonVisitors().length);
          $('#memberRow').css('height', height);
          $('#visitorRow').css('height', height);
        });
      });
    });
  }

  getVisitors(): Member[] {
    return this.selected.getVisitors();
  }

  getNonVisitors(): Member[] {
    const all = this.members.getAll().filter(visitor => !visitor.archived);
    this.getVisitors().forEach(member => {
      const index = all.indexOf(member, 0);
      if (index > -1)
        all.splice(index, 1);
    });
    return all;
  }

  drag(event) {
    event.dataTransfer.setData('member', event.target.id);
  }

  drop(event) {
    event.preventDefault();
    if (this.selected.endDate !== undefined)
      return;
    const targetId = +event.dataTransfer.getData('member');
    this.members.find(targetId).subscribe(
      member => {
        let visitorAmount = this.getVisitors().length;
        let nonVisitorAmount = this.getNonVisitors().length;
        if (this.getVisitors().indexOf(member) > -1) {
          this.instances.removeVisitor(this.selected, member);
          nonVisitorAmount++;
          visitorAmount--;
        } else {
          this.instances.addVisitor(this.selected, member);
          nonVisitorAmount--;
          visitorAmount++;
        }
        const unit = $('.member-row').first().outerHeight(true);
        const amount = Math.max(visitorAmount, nonVisitorAmount);
        $('#memberRow').css('height', `${unit * amount}`);
        $('#visitorRow').css('height', `${unit * amount}`);
      }
    );
  }

  allowDrop(event) {
    event.preventDefault();
  }

  toggleEvening() {
    this.instances.toggleInstance(this.selected);
  }
}
