import {Component, Input, OnInit} from '@angular/core';
import {Member, MemberType} from '../../../../model/member';
import {MemberResource} from '../../../../resource/member.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-member-overview',
  templateUrl: './member-overview.component.html',
  styleUrls: ['./member-overview.component.scss']
})
export class MemberOverviewComponent implements OnInit {

  selected: Member;
  changed = false;

  constructor(private members: MemberResource, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.members.find(+params['id']).subscribe(mmbr => {
        this.selected = mmbr;
      });
    });
  }

  /**
   * Registers the current member has paid their contribution
   */
  payContribution() {
    this.members.payContribution(this.selected);
  }

  save(event: Event) {
    const target = <Element>event.target;
    const field = target.getAttribute('field');
    const value = target['value'];
    console.log(field, value);
    this.members.save(this.selected, field, value);
  }

  createAccount() {
    window.alert('Deze functie is nog niet geimplementeerd.');
  }

  promote() {
    if (window.confirm(`Weet u zeker dat u dit lid een ${this.selected.type === MemberType.MANAGEMENT ? 'normaal' : 'bestuurs'} lid wilt maken?`)) {
      this.members.promote(this.selected);
    }
  }

  archive() {
    if (window.confirm(`Weet u zeker dat u dit lid wilt ${this.selected.archived ? 'herstellen' : 'archiveren'}?`)) {
      this.members.delete(this.selected);
    }
  }
}
