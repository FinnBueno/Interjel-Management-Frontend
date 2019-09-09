import {Comparator} from './comparator';
import {Member} from '../member';

export class MemberNameComparator implements Comparator<Member> {

  compare(o1: Member, o2: Member): number {
    return o1.getFullName().localeCompare(o2.getFullName());
  }

}

export class MemberPaymentStatusComparator implements Comparator<Member> {

  compare(o1: Member, o2: Member): number {
    return o1.paymentStatus - o2.paymentStatus;
  }

}

export class MemberAgeComparator implements Comparator<Member> {

  compare(o1: Member, o2: Member): number {
    return o1.age - o2.age;
  }

}
