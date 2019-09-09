import {Member} from './member';
import {Identifiable} from './identifiable/identifiable';

export class Instance extends Identifiable<Instance> {

  private _date: Date;
  get date(): Date {
    return this._date;
  }
  private _endDate: Date;
  get endDate(): Date {
    return this._endDate;
  }
  set endDate(endDate: Date) {
    this._endDate = endDate;
  }
  private _notes: string;
  get notes(): string {
    return this._notes;
  }
  private _visitors: Set<Member>;

  constructor(notes?: string, startDate: Date = new Date(Date.now()), endDate?: Date, visitors: Set<Member> = new Set()) {
    super();
    this._date = startDate;
    this._endDate = endDate;
    this._notes = notes;
    this._visitors = visitors;
  }

  getVisitors(): Member[] {
    return Array.from(this._visitors);
  }

  isOngoing(): boolean {
    return Date.now() >= this.date.getTime() && Date.now() <= (this.endDate === undefined ? Date.now() + 1 : this.endDate.getTime());
  }

  hasEnded(): boolean {
    return this.endDate !== undefined;
  }

  compareTo(other: Instance): number {
    const result = this.date.getTime() - other.date.getTime();
    if (result !== 0)
      return result;
    return super.compareTo(other);
  }

  addVisitor(member: Member) {
    this._visitors.add(member);
  }

  removeVisitor(member: Member) {
    this._visitors.delete(member);
  }

}
