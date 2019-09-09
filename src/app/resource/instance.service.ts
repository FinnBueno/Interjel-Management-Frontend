import {Instance} from '../model/instance';
import {Persistence} from './persistence.interface';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RequestParamBuilder, RestService} from './rest.service';
import {parseDate} from '../util/date.util';
import {Member} from '../model/member';
import {MemberResource} from './member.service';

@Injectable({
  providedIn: 'root',
})
export class InstanceResource extends Persistence<Instance> {

  constructor(private rest: RestService, private members: MemberResource) {
    super('Instance Unit');
    this.loadPaged(0);
  }

  loadPaged(page: number) {
    this.rest.get<object[]>('instance', new RequestParamBuilder().set('page', page)).subscribe(
      data => {
        data.forEach(obj => {
          const instance = new Instance(obj['notes'], parseDate(obj['startDate']), parseDate(obj['endDate']), this.parseVisitors(obj['visitors']));
          instance.id = obj['instanceId'];
          this.cache(instance);
        });
      }
    );
  }

  parseVisitors(visitors: object[]): Set<Member> {
    // TODO?
    return null;
  }

  create(obj: Instance, after?: () => any) {
    this.rest.post('instance', {
      startDate: {
        date: {
          year: obj.date.getFullYear(),
          month: obj.date.getMonth() + 1,
          day: obj.date.getDate()
        },
        time: {
          hour: obj.date.getHours(),
          minute: obj.date.getMinutes(),
          second: obj.date.getSeconds()
        }
      },
      notes: obj.notes
    }).subscribe(
      data => {
        obj.id = data['instanceId'];
        this.cache(obj);
        if (after !== undefined)
          after();
      },
      error => console.log(`Failed persisting object ${obj.id} in registry ${this.unitName} to database!\nError:${error}`)
    );
  }

  find(id: number, cacheAllowed: boolean = true): Observable<Instance> {
    if (this.isCached(id) && cacheAllowed)
      return new Observable(subscriber => subscriber.next(this.findInCache(id)));
    return new Observable(subscriber => {
      this.rest.get(`instance/${id}`).subscribe(
        data => {
          const evening = new Instance(data['notes'], parseDate(data['startDate']));
          if (data.hasOwnProperty('endDate'))
            evening.endDate = parseDate(data['endDate']);
          data['visitors'].forEach(dat => this.members.find(dat['memberId']).subscribe(mmbr => evening.addVisitor(mmbr)));
          evening.id = id;
          this.cache(evening);
          subscriber.next(evening);
        },
        error => subscriber.error(error),
        () => subscriber.complete()
      );
    });
  }

  delete(instance: Instance) {
    this.rest.delete('instance', new RequestParamBuilder().set('id', instance.id)).subscribe(() => this.removeCache(instance.id));
  }

  addVisitor(evening: Instance, member: Member) {
    this.rest.post(`instance/${evening.id}/${member.id}`, {}).subscribe(() => evening.addVisitor(member));
  }

  removeVisitor(evening: Instance, member: Member) {
    this.rest.delete(`instance/${evening.id}/${member.id}`).subscribe(() => evening.removeVisitor(member));
  }

  toggleInstance(instance: Instance) {
    this.rest.put(`instance/${instance.id}`, {}).subscribe(data => instance.endDate = parseDate(data));
  }
}
