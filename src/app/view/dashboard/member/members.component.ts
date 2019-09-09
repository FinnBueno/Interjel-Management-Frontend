import {Component} from '@angular/core';
import {MemberResource} from '../../../resource/member.service';
import {Member} from '../../../model/member';
import {Comparator} from '../../../model/comparator/comparator';
import {MemberNameComparator, MemberAgeComparator, MemberPaymentStatusComparator} from '../../../model/comparator/member-comparator';
import {navigateModal} from '../../../util/routing.util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {

  searchTerm = '';
  selected: Member;
  private comparatorMap: Map<String, Comparator<Member>>;
  private ascending: boolean;
  private comparator: Comparator<Member>;
  private page: number;

  constructor(private memberResource: MemberResource, private router: Router) {
    this.comparatorMap = new Map();
    this.generateComparators();
    this.page = 1;
  }

  private generateComparators() {
    this.comparatorMap.set('name', new MemberNameComparator());
    this.comparatorMap.set('age', new MemberAgeComparator());
    this.comparatorMap.set('payment', new MemberPaymentStatusComparator());
  }

  sort(term: string, ascending: boolean) {
    this.ascending = ascending;
    this.comparator = this.comparatorMap.get(term);
  }

  getMembers(): Member[] {
    return this.memberResource.getSorted(this.comparator, this.ascending);
  }

  openMemberOverview(member) {
    navigateModal(['overview-member', member.id], this.router);
  }

  openNewMemberInput() {
    navigateModal(['create-member'], this.router);
  }

  loadMoreMembers() {
    this.memberResource.loadPaged(this.page, (result) => {
      if (result.length > 0)
        this.page++;
    });
  }
}
