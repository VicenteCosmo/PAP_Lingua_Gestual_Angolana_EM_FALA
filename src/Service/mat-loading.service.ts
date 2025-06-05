import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatLoadingService {

  public matLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor() { }
}
