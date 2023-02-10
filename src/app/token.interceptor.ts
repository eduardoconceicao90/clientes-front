import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenString = localStorage.getItem('access_token');

    const url = request.url;

    if(tokenString && !url.endsWith('/oauth/token')) {
      const token = JSON.parse(tokenString || '{}')
      const jwt = token.access_token;
      const cloneReq =
                  request.clone({ setHeaders : { Authorization: 'Bearer ' + jwt } })
      return next.handle(cloneReq);
    } else {
      return next.handle(request);
    }
  }
}

export const TokenInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
]
