import { Identifiable } from '../model/identifiable/identifiable';
import { Comparator } from '../model/comparator/comparator';
import { Observable } from 'rxjs';

export abstract class Persistence<T extends Identifiable<T>> {

  protected objects: Map<number, T> = new Map();
  unitName: string;

  constructor(unitName: string) {
    this.unitName = unitName;
  }

  /*
   * These methods are to be overridden by an implementing class
   */

  /**
   * Saves a new object into the cache. Assumes the object does not have an ID yet!
   */
  abstract create(obj: T, after?: () => any);

  /**
   * Find an object based on the id
   */
  abstract find(id: number): Observable<T>;

  /**
   * Remove an object based on the id
   */
  abstract delete(id: T);

  /**
   * Returns a copy of all objects sorted according to the specified comparator
   */
  getSorted(comp: Comparator<T>, ascending: boolean = true): T[] {
    return this.getAll().sort((o1, o2) => {
      const result = comp === undefined ? o1.compareTo(o2) : comp.compare(o1, o2);
      return ascending ? result : -result;
    });
  }

  /**
   * Returns an array of all registered objects
   */
  getAll(ascending: boolean = true): T[] {
    return Array.from(this.objects.values())
      .sort((o1, o2) => {
        return ascending ? o1.compareTo(o2) : -o1.compareTo(o2);
      });
  }

  /**
   * Executes a given function for every registered object
   */
  forEach(each: (obj: T) => any) {
    this.getAll().forEach(each);
  }

  protected cache(obj: T) {
    if (obj.id === undefined)
      throw new Error(`Cannot cache object without id in registry ${this.unitName}!`);
    this.objects.set(obj.id, obj);
  }

  protected findInCache(id: number): T | undefined {
    return this.objects.get(id);
  }

  protected isCached(id: number) {
    return this.objects.has(id);
  }

  protected removeCache(id: number) {
    this.objects.delete(id);
  }

}
