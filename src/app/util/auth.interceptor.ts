import {HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpHandler} from '@angular/common/http';
import {HttpEvent} from '@angular/common/http';
import {HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get token from storage
    const token = localStorage.getItem('interjelToken');
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(newRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!(err.error instanceof ErrorEvent)) {
          if (err.status === 401) {
            this.router.navigate(['/']);
            return null;
          }
        }
        return throwError(err);
      })
    );
  }

}
