import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  errorMessage?: string;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // client-side error
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          this.errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        // window.alert(this.errorMessage);
        console.error(this.errorMessage);

        return throwError(this.errorMessage);
      })
    );
  }
}
