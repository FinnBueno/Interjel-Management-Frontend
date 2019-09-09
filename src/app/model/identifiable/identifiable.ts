import {Comparable} from '../comparator/comparator';

export abstract class Identifiable<T extends Identifiable<T>> implements Comparable<T> {

  constructor() {

  }

  /*constructor(id: number) {
    this._id = id;
  }*/

  private _id: number;
  get id() {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  compareTo(other: T): number {
    return this._id - other._id;
  }

}
