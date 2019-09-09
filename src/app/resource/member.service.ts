import {getSafeMemberType, Member, MemberType, MemberType as MType} from '../model/member';
import {Injectable} from '@angular/core';
import {Persistence} from './persistence.interface';
import {RequestParamBuilder, RestService} from './rest.service';
import {parseDate} from '../util/date.util';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberResource extends Persistence<Member> {

  constructor(private rest: RestService) {
    super('Member Unit');
    this.loadPaged(0);
  }

  loadPaged(page, success?: (result: Member[]) => void) {
    this.rest.get<object[]>('member', new RequestParamBuilder().set('page', page)).subscribe(
      data => {
        const members = data.map(mbr => {
          const member = new Member(mbr['firstname'], mbr['lastname'], parseDate(mbr['birth']), mbr['email'], mbr['notes'], mbr['address'],
            mbr['postalCode'], mbr['town'], mbr['phone'], mbr['paidContribution'], getSafeMemberType(mbr['type']), mbr['visits'], mbr['archived']);
          member.id = mbr['memberId'];
          return member;
        });
        members.forEach(member => this.cache(member));
        if (success) {
          success(members);
        }
      }
    );
  }

  create(obj: Member, after?: () => any) {
    this.rest.post('member', {
      firstname: obj.firstName,
      lastname: obj.lastName,
      birth: {
        year: obj.birth.getFullYear(),
        month: obj.birth.getMonth() + 1,
        day: obj.birth.getDate()
      },
      email: obj.email,
      notes: obj.notes,
      address: obj.address,
      town: obj.town,
      postalCode: obj.postalCode.replace(' ', '').substr(0, 6),
      phone: obj.phone,
      type: MemberType[obj.type]
    }).subscribe(
      data => {
        obj.id = data['memberId'];
        this.cache(obj);
        if (after !== undefined)
          after();
      },
      error => console.log(`Failed persisting object ${obj.id} in registry ${this.unitName} to database!\nError:${JSON.stringify(error)}`)
    );
  }

  find(id: number): Observable<Member> {
    if (this.isCached(id))
      return new Observable(subscriber => subscriber.next(this.findInCache(id)));
    return new Observable(subscriber => {
      this.rest.get(`member/${id}`).subscribe(
        mbr => {
          const member = new Member(mbr['firstname'], mbr['lastname'], parseDate(mbr['birth']), mbr['email'], mbr['notes'], mbr['address'],
            mbr['postalCode'], mbr['town'], mbr['phone'], mbr['paidContribution'], getSafeMemberType(mbr['type']), mbr['visits'], mbr['archived']);
          member.id = mbr['memberId'];
          this.cache(member);
          subscriber.next(member);
        },
        error => subscriber.error(error)
      );
    });
  }

  delete(member: Member) {
    this.rest.delete(`member/${member.id}`).subscribe(() => member.archived = !member.archived);
  }

  payContribution(selected: Member) {
    this.rest.put('season', {
      id: selected.id
    }).subscribe(() => selected.paidContribution = true);
  }

  save(member: Member, field: string, value: any) {
    console.log('Changing ' + member);
    this.rest.put(`member/${member.id}`, {
      field: field,
      value: field === 'phone' ? +value : value
    }).subscribe(() => Reflect.set(member, '_' + field, value));
  }

  promote(member: Member) {
    const stringVal = MType[MType.getOther(member.type)];
    this.rest.put(`member/${member.id}`, {
      field: 'type',
      value: stringVal
    }).subscribe(() => member.type = MType[stringVal]);
  }
}
