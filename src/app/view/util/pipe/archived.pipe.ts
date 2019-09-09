import {Pipe, PipeTransform} from '@angular/core';
import {Member} from '../../../model/member';

@Pipe({
  name: 'archived'
})
export class ArchivedPipe implements PipeTransform {
  transform(members: Member[], shouldBeArchived: boolean): any {
    return members.filter(member => shouldBeArchived ? member.archived : !member.archived);
  }

}
