/**
 * Used to compare 2 objects of the same type with one another
 */
export interface Comparator<T> {

  compare(o1: T, o2: T): number;

}

/**
 * Used to make a class comparable to another class (can be itself)
 */
export interface Comparable<T> {

  compareTo(other: T): number;

}
