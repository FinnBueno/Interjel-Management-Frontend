import {Pipe, PipeTransform} from '@angular/core';
import {Member} from '../../../model/member';

@Pipe({
  name: 'memberFilter'
})
export class MemberFilter implements PipeTransform {
  transform(members: Member[], match: string): any {
    if (match === undefined || match.length === 0) {
      return members;
    }
    match = match.toLowerCase();
    return members.filter(member => {
      if (member.firstName.toLowerCase().indexOf(match) >= 0
        || member.lastName.toLowerCase().indexOf(match) >= 0
        || member.getFullName().toLowerCase().indexOf(match) >= 0
        || member.getFullName().trim().length === 0) {
        return true;
      }
      if (member.email.toLowerCase().indexOf(match) >= 0 || member.email.length === 0) {
        return true;
      }
      if (member.age.toString().indexOf(match) >= 0) {
        return true;
      }
      if (member.address.toLowerCase().indexOf(match) >= 0 || member.postalCode.toLowerCase().indexOf(match) >= 0) {
        return true;
      }
      for (const number of member.phone) {
        if (number.indexOf(match) >= 0) {
          return true;
        }
      }

      return false;
    });
  }

}
