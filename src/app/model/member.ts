import {Identifiable} from './identifiable/identifiable';

export enum MemberType {
  REGULAR,
  MANAGEMENT
}

export namespace MemberType {
  export function getOther(type: MemberType): MemberType {
    return type === MemberType.REGULAR ? MemberType.MANAGEMENT : MemberType.REGULAR;
  }
}

export function getSafeMemberType(value: string): MemberType {
  if (value === undefined)
    return undefined;
  if (value.toUpperCase() === 'REGULAR')
    return MemberType.REGULAR;
  if (value.toUpperCase() === 'MANAGEMENT')
    return MemberType.MANAGEMENT;
  return undefined;
}

export enum PaymentStatus {
  PAID = 0,
  NOT_OBLIGATED = 1,
  LATE = 2,
}

export class Member extends Identifiable<Member> {

  get visits(): number {
    return this._visits;
  }

  get age(): number {
    return this._age;
  }

  get type(): MemberType {
    // noinspection TypeScriptValidateTypes
    return this._type;
  }
  set type(type: MemberType) {
    this._type = type;
  }

  get paidContribution(): boolean {
    return this._paidContribution;
  }
  set paidContribution(paid: boolean) {
    this._paidContribution = paid;
  }

  get town(): string {
    return this._town;
  }

  get phone(): string {
    return this._phone;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  get address(): string {
    return this._address;
  }

  get notes(): string {
    return this._notes;
  }

  get email(): string {
    return this._email;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  get lastName(): string {
    return this._lastName;
  }

  get firstName(): string {
    return this._firstName;
  }

  get archived(): boolean {
    return this._archived;
  }
  set archived(archived: boolean) {
    this._archived = archived;
  }

  get paymentStatus(): PaymentStatus {
    if (this.paidContribution) {
      return PaymentStatus.PAID;
    } else if (this.visits >= 3) {
      return PaymentStatus.LATE;
    } else {
      return PaymentStatus.NOT_OBLIGATED;
    }
  }

  get birth() {
    return this._dateOfBirth;
  }

  constructor(firstName: string, lastName: string, dateOfBirth: Date, email: string, notes: string, address: string,
              postalCode: string, town: string, phone: string, paidContribution: boolean, type: MemberType, visits: number,
              archived: boolean = false) {
    super();
    this._firstName = firstName;
    this._lastName = lastName;
    this._dateOfBirth = dateOfBirth;
    this._email = email;
    this._notes = notes;
    this._address = address;
    this._postalCode = postalCode;
    this._town = town;
    this._phone = phone;
    this._paidContribution = paidContribution;
    this._type = type;
    this._age = Math.trunc(((new Date()).getTime() - this.dateOfBirth.getTime()) / 1000 / 60 / 60 / 24 / 7 / 52);
    this._visits = visits;
    this._archived = archived;
  }

  private _firstName: string;
  private _lastName: string;
  private _dateOfBirth: Date;
  private _age: number;

  private _email: string;
  private _notes: string;
  private _address: string;
  private _postalCode: string;
  private _town: string;
  private _phone: string;

  private _paidContribution: boolean;
  private _type: MemberType;
  private _visits: number;
  private _archived: boolean;

  getFullName(): string {
    return this._firstName + ' ' + this._lastName;
  }

  compareTo(other: Member): number {
    let compare: number;
    compare = this.getFullName().localeCompare(other.getFullName());
    if (compare !== 0) {
      return compare;
    }
    compare = (this.age - other.age) / Math.abs(this.age - other.age);
    if (compare !== 0) {
      return compare;
    }
    compare = (this.paymentStatus - other.paymentStatus) / Math.abs(this.paymentStatus - other.paymentStatus);
    if (compare !== 0) {
      return compare;
    }
    return super.compareTo(other);
  }

}
