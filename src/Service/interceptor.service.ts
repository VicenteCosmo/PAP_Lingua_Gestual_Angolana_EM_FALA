import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { MatLoadingService } from './mat-loading.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor( public interceptor : MatLoadingService ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.interceptor.matLoading.next(true)
    console.log('initialized')
    return next.handle(req).pipe(
      finalize(()=>{
        setTimeout(()=>{
        this.interceptor.matLoading.next(false)
        console.log('intercepter')
        }, 5000)
        console.log('finalized')
      })
    )
  }
}
