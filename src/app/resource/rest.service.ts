import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public static readonly BASE_URL = environment.apiUrl; //'http://192.168.0.111:9000/interjel/';

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Creates a GET request to the REST-API
   * @param {string} path The path on the REST-API to request to
   * @param {RequestParamBuilder} args The request parameters.
   * @returns {Observable<T>} The result of the request
   */
  get<T>(path: string, args?: RequestParamBuilder): Observable<T> {
    const argsString = args === undefined ? '' : args.format();
    return new Observable(subscriber => {
      this.http.get<T>(RestService.BASE_URL + path + argsString).subscribe(
        data => subscriber.next(data),
        (error: HttpErrorResponse) => {
          if (error.status === 401)
            this.router.navigate(['/']);
          else
            subscriber.error(error);
        },
        () => subscriber.complete()
      );
    });
  }

  post(path: string, body: any): Observable<Object> {
    return this.http.post(RestService.BASE_URL + path, body);
  }

  put(path: string, body: any): Observable<Object> {
    return this.http.put(RestService.BASE_URL + path, body);
  }

  delete(path: string, args?: RequestParamBuilder): Observable<Object> {
    const argsString = args === undefined ? '' : args.format();
    return this.http.delete(RestService.BASE_URL + path + argsString);
  }

}

export class RequestParamBuilder {

  private args: Map<string, string>;

  constructor() {
    this.args = new Map();
  }

  set(key: string, value: string | number): RequestParamBuilder {
    this.args.set(key, String(value));
    return this;
  }

  format() {
    const stringArgs = [];
    this.args.forEach((value, key) => stringArgs.push(`${encodeURI(key)}=${encodeURI(value)}`));
    return `?${stringArgs.join('&')}`;
  }
}
